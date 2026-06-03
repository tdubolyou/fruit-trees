import { writeFile, mkdir } from 'node:fs/promises';
import { SPECIES_TO_CATEGORY } from '../src/lib/categories';

/**
 * ETL script for Fruit Trees of Toronto.
 *
 * Downloads the City of Toronto's full street tree inventory (~689k rows),
 * filters it down to the fruit- and nut-bearing species defined in
 * src/lib/categories.ts, and writes two static files consumed by the app:
 *
 *   static/data/trees.geojson  – GeoJSON FeatureCollection of matching trees
 *   static/data/meta.json      – summary metadata (count, bounding box, timestamp)
 *
 * The source CSV is the "Street Tree Data (4326)" resource from Toronto Open Data:
 * https://open.toronto.ca/dataset/street-tree-data/
 *
 * Run with: npm run etl
 */

// ─── Source URL ──────────────────────────────────────────────────────────────
// Direct download link for the WGS84 (EPSG:4326) version of the street tree CSV.
// The dataset is updated periodically by Toronto Urban Forestry staff.
// If the City changes the resource ID, this URL will need updating.
const CSV_URL =
	'https://ckan0.cf.opendata.inter.prod-toronto.ca/dataset/6ac4569e-fd37-4cbc-ac63-db3624c5f6a2/resource/b65cd31d-fabc-4222-83ef-8ddd11295d2b/download/street-tree-data-4326.csv';

// ─── CSV Parser ──────────────────────────────────────────────────────────────
// Hand-rolled RFC 4180 parser. The City's CSV includes quoted fields with commas
// inside them (e.g. geometry column contains JSON), so we can't simply split on
// commas. Handles escaped quotes ("") and quoted fields correctly.
function parseCSVLine(line: string): string[] {
	const fields: string[] = [];
	let current = '';
	let inQuotes = false;

	for (let i = 0; i < line.length; i++) {
		const ch = line[i];
		if (inQuotes) {
			if (ch === '"') {
				if (i + 1 < line.length && line[i + 1] === '"') {
					current += '"';
					i++;
				} else {
					inQuotes = false;
				}
			} else {
				current += ch;
			}
		} else if (ch === '"') {
			inQuotes = true;
		} else if (ch === ',') {
			fields.push(current);
			current = '';
		} else {
			current += ch;
		}
	}
	fields.push(current);
	return fields;
}

// ─── Output Feature Shape ────────────────────────────────────────────────────
// Each tree becomes a GeoJSON Point feature with these properties:
//   id        – the City's unique row ID
//   species   – common name as it appears in the City dataset (e.g. "Cherry, choke")
//   botanical – Latin binomial from the City dataset (e.g. "Prunus virginiana")
//   category  – our grouping key matching categories.ts (e.g. "cherry")
//   dbh       – diameter at breast height in cm; 0 when the City has no measurement
//   address   – street address composed from ADDRESS + STREETNAME columns
interface Feature {
	type: 'Feature';
	geometry: { type: 'Point'; coordinates: [number, number] };
	properties: {
		id: number;
		species: string;
		botanical: string;
		category: string;
		dbh: number;
		address: string;
	};
}

async function main() {
	// ─── 1. Fetch the raw CSV ────────────────────────────────────────────────
	// Downloads the full ~100 MB CSV into memory. The City serves it as a single
	// file with no pagination. A BOM (byte-order mark) is sometimes present at
	// the start and must be stripped before parsing.
	console.log('Fetching street tree CSV from City of Toronto...');
	const response = await fetch(CSV_URL);
	if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

	let text = await response.text();
	if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

	// ─── 2. Parse headers and resolve column indices ─────────────────────────
	// Column names and order can change between dataset revisions. We look up
	// each column by name rather than hardcoding indices so the script fails
	// loudly if the schema changes.
	const lines = text.split('\n');
	const headerLine = lines[0];
	const headers = parseCSVLine(headerLine).map((h) => h.trim());

	const colIndex = (name: string) => {
		const idx = headers.indexOf(name);
		if (idx === -1) throw new Error(`Column "${name}" not found. Headers: ${headers.join(', ')}`);
		return idx;
	};

	const iId = colIndex('_id');
	const iCommonName = colIndex('COMMON_NAME');
	const iDbh = colIndex('DBH_TRUNK');
	const iAddress = colIndex('ADDRESS');
	const iStreet = colIndex('STREETNAME');
	const iBotanical = colIndex('BOTANICAL_NAME');
	const iGeometry = colIndex('geometry');

	// ─── 3. Filter and transform rows into GeoJSON features ──────────────────
	// Iterates every row (~689k), keeping only those whose COMMON_NAME matches
	// a species in our SPECIES_TO_CATEGORY map (defined in categories.ts).
	// Non-matching rows (ornamental trees, shade trees, etc.) are silently skipped.
	//
	// Geometry is stored as a JSON string in the CSV (a GeoJSON Point). We parse
	// it, extract [lon, lat], and round to 6 decimal places (~11 cm precision)
	// to reduce file size. Rows with unparseable or non-finite coordinates are
	// counted as skipped.
	const features: Feature[] = [];
	let skipped = 0;

	for (let i = 1; i < lines.length; i++) {
		const line = lines[i].trim();
		if (!line) continue;

		const fields = parseCSVLine(line);
		const commonName = fields[iCommonName];
		const cat = SPECIES_TO_CATEGORY.get(commonName);
		if (!cat) continue;

		let lon: number, lat: number;
		try {
			const geomStr = fields[iGeometry];
			const geom = JSON.parse(geomStr);
			const coords = geom.coordinates[0];
			lon = Math.round(coords[0] * 1e6) / 1e6;
			lat = Math.round(coords[1] * 1e6) / 1e6;
		} catch {
			skipped++;
			continue;
		}

		if (!Number.isFinite(lon) || !Number.isFinite(lat)) {
			skipped++;
			continue;
		}

		const address = [fields[iAddress], fields[iStreet]].filter(Boolean).join(' ');

		features.push({
			type: 'Feature',
			geometry: { type: 'Point', coordinates: [lon, lat] },
			properties: {
				id: Number(fields[iId]) || i,
				species: commonName,
				botanical: fields[iBotanical] || '',
				category: cat.id,
				dbh: Number(fields[iDbh]) || 0,
				address
			}
		});
	}

	// ─── 4. Log summary statistics ───────────────────────────────────────────
	// Prints total row count, matched fruit tree count, and a per-category
	// breakdown sorted by count. Useful for spotting data drift between runs.
	console.log(`Processed ${lines.length - 1} rows`);
	console.log(`Found ${features.length} fruit trees (skipped ${skipped} with bad geometry)`);

	const categoryCounts: Record<string, number> = {};
	for (const f of features) {
		categoryCounts[f.properties.category] = (categoryCounts[f.properties.category] || 0) + 1;
	}
	for (const [cat, count] of Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])) {
		console.log(`  ${cat}: ${count}`);
	}

	// ─── 5. Write output files ───────────────────────────────────────────────
	// trees.geojson: Minified GeoJSON FeatureCollection. Consumed by the app at
	//   runtime via fetch() in trees.svelte.ts. Typically 6-12 MB depending on
	//   how many species are included.
	//
	// meta.json: Small metadata file with the timestamp of this ETL run, total
	//   feature count, and the bounding box [west, south, east, north] of all
	//   features. Used by the app for display and could be used for cache-busting.
	const fc = { type: 'FeatureCollection' as const, features };

	const lons = features.map((f) => f.geometry.coordinates[0]);
	const lats = features.map((f) => f.geometry.coordinates[1]);
	const meta = {
		lastUpdated: new Date().toISOString(),
		count: features.length,
		bounds: [Math.min(...lons), Math.min(...lats), Math.max(...lons), Math.max(...lats)]
	};

	await mkdir('static/data', { recursive: true });
	await writeFile('static/data/trees.geojson', JSON.stringify(fc));
	await writeFile('static/data/meta.json', JSON.stringify(meta, null, 2));

	console.log(`\nWrote static/data/trees.geojson (${(JSON.stringify(fc).length / 1024 / 1024).toFixed(1)} MB)`);
	console.log(`Wrote static/data/meta.json`);
	console.log('Done.');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});

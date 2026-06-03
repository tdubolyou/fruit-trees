import type { FeatureCollection, Point } from 'geojson';

export interface FruitTreeProperties {
	id: number;
	species: string;
	botanical: string;
	category: string;
	dbh: number;
	address: string;
}

export type FruitTreeFeatureCollection = FeatureCollection<Point, FruitTreeProperties>;

export interface SpeciesGuide {
	commonName: string;
	scientificName: string;
	category: string;
	description: string;
	identification: {
		leaves: string;
		bark: string;
		flowers: string;
		fruit: string;
	};
	ripening: string;
	foraging: {
		bestTime: string;
		storage: string;
		uses: string;
		safety: string;
	};
	ecologicalValue: string;
}

export interface TreeMeta {
	lastUpdated: string;
	count: number;
	bounds: [number, number, number, number];
}

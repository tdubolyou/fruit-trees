<script lang="ts">
	import { CATEGORIES } from '$lib/categories';

	const MONTH_ABBR = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];
	const MONTH_FULL = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	// Toronto daylight hours (15th of each month) from fruittrees-tokens.json.
	const DAYLIGHT = [9.15, 10.3, 11.85, 13.5, 14.9, 15.55, 15.3, 14.15, 12.65, 11.1, 9.7, 8.9];

	// Only months in which at least one fruit tree actually ripens.
	const RIPE_MONTHS = [...new Set(CATEGORIES.flatMap((c) => c.ripeningMonths))].sort(
		(a, b) => a - b
	);
	const MIN = RIPE_MONTHS[0];
	const MAX = RIPE_MONTHS[RIPE_MONTHS.length - 1];

	const W = 280;
	const H = 78;
	const PAD_TOP = 8;
	const BASE = 60; // x-axis baseline within the svg

	let {
		value,
		onchange
	}: {
		value: number | null;
		onchange: (month: number | null) => void;
	} = $props();

	let selected = $derived(value ?? MIN);

	function onInput(ev: Event) {
		onchange(Number((ev.target as HTMLInputElement).value));
	}

	const xOf = (m: number) => ((m - MIN) / (MAX - MIN)) * W;

	const shown = RIPE_MONTHS.map((m) => DAYLIGHT[m - 1]);
	const dMin = Math.min(...shown);
	const dMax = Math.max(...shown);
	const yOf = (h: number) => PAD_TOP + (1 - (h - dMin) / (dMax - dMin || 1)) * (BASE - PAD_TOP - 4);

	const points = RIPE_MONTHS.map((m) => [xOf(m), yOf(DAYLIGHT[m - 1])] as [number, number]);

	// Smooth Catmull-Rom curve, closed down to the baseline → filled area.
	const fillPath = (() => {
		let d = `M ${points[0][0]} ${points[0][1]}`;
		for (let i = 0; i < points.length - 1; i++) {
			const p0 = points[i - 1] ?? points[i];
			const p1 = points[i];
			const p2 = points[i + 1];
			const p3 = points[i + 2] ?? p2;
			const c1x = p1[0] + (p2[0] - p0[0]) / 6;
			const c1y = p1[1] + (p2[1] - p0[1]) / 6;
			const c2x = p2[0] - (p3[0] - p1[0]) / 6;
			const c2y = p2[1] - (p3[1] - p1[1]) / 6;
			d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
		}
		d += ` L ${W} ${BASE} L 0 ${BASE} Z`;
		return d;
	})();
</script>

<div class="month-slider">
	<div class="chart">
		<div class="left">
			<div class="plot">
				<svg class="art" viewBox="0 0 {W} {H}" preserveAspectRatio="none" aria-hidden="true">
					<defs>
						<!-- gaps at each month let the card background show through as grid lines -->
						<mask id="grid-mask">
							<rect x="0" y="0" width={W} height={BASE} fill="white" />
							{#each points as [px]}
								<line x1={px} y1="0" x2={px} y2={BASE} stroke="black" stroke-width="2.2" />
							{/each}
						</mask>
					</defs>
					<!-- filled area under the daylight curve, segmented by the mask -->
					<path d={fillPath} class="fill" mask="url(#grid-mask)" />
					<!-- yellow dots at each monthly peak -->
					{#each points as [px, py]}
						<circle cx={px} cy={py} r="2.5" class="dot" />
					{/each}
				</svg>

				<!-- single knob, vertically centred on the x-axis baseline -->
				<div class="thumb-strip">
					<input
						class="thumb"
						type="range"
						min={MIN}
						max={MAX}
						step="1"
						value={selected}
						oninput={onInput}
						aria-label="Ripening month: {MONTH_FULL[selected - 1]}"
						aria-valuetext={MONTH_FULL[selected - 1]}
					/>
				</div>
			</div>

			<div class="months" aria-hidden="true">
				{#each RIPE_MONTHS as m}
					<span>{MONTH_ABBR[m - 1]}</span>
				{/each}
			</div>
		</div>

		<!-- daylight axis labels, off to the side of the graphic -->
		<div class="hrs" aria-hidden="true">
			<span>10 Hrs</span>
			<span>0 Hrs</span>
		</div>
	</div>
</div>

<style>
	.month-slider {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.chart {
		display: flex;
		align-items: flex-start;
		gap: var(--space-2);
	}

	.left {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.plot {
		position: relative;
		width: 100%;
		height: 78px;
	}

	.art {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
	}

	.fill {
		fill: color-mix(in srgb, var(--color-text-primary) 11%, transparent);
	}

	.dot {
		fill: #e6c84a;
	}

	.hrs {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* span only the curve area, down to the x-axis */
		height: calc(60 / 78 * 78px);
		font-family: var(--font-mono);
		font-size: 9px;
		color: var(--color-text-tertiary);
		white-space: nowrap;
		padding-top: 2px;
	}

	/* knob strip centred on the baseline (BASE / H of the plot height) */
	.thumb-strip {
		position: absolute;
		left: 0;
		right: 0;
		top: calc(60 / 78 * 100%);
		transform: translateY(-50%);
		height: 16px;
	}

	.thumb {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		margin: 0;
		background: transparent;
		-webkit-appearance: none;
		appearance: none;
		pointer-events: none;
	}

	.thumb::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 16px;
		height: 16px;
		border-radius: var(--radius-full);
		background: var(--color-text-primary);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
		cursor: ew-resize;
		pointer-events: auto;
		transition: transform var(--duration-instant) var(--ease-out);
	}
	.thumb::-webkit-slider-thumb:hover {
		transform: scale(1.12);
	}
	.thumb::-moz-range-thumb {
		width: 16px;
		height: 16px;
		border: none;
		border-radius: var(--radius-full);
		background: var(--color-text-primary);
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
		cursor: ew-resize;
		pointer-events: auto;
	}
	.thumb::-moz-range-track {
		background: transparent;
	}

	.months {
		display: flex;
		justify-content: space-between;
		font-family: var(--font-mono);
		font-size: 10px;
		color: var(--color-text-tertiary);
	}
</style>

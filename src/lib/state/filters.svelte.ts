import { CATEGORIES } from '$lib/categories';
import type { ExpressionSpecification } from 'maplibre-gl';

const MONTH_NAMES = [
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

class FilterState {
	activeCategories = $state<Set<string>>(new Set(CATEGORIES.map((c) => c.id)));
	/** Single selected ripening month (1-based), or null for all year. */
	selectedMonth = $state<number | null>(null);

	get hasActiveFilters(): boolean {
		return this.activeCategories.size < CATEGORIES.length || this.selectedMonth !== null;
	}

	get selectedMonthName(): string {
		return this.selectedMonth ? MONTH_NAMES[this.selectedMonth - 1] : 'All year';
	}

	/** Category ids that ripen in the selected month. */
	private categoriesInMonth(): string[] {
		return CATEGORIES.filter((c) => c.ripeningMonths.includes(this.selectedMonth!)).map(
			(c) => c.id
		);
	}

	/**
	 * Returns a MapLibre filter expression for the tree layer.
	 * Applied directly on the GPU — no JS-level filtering.
	 */
	get mapFilter(): ExpressionSpecification | undefined {
		const allActive = this.activeCategories.size === CATEGORIES.length;
		const noMonth = this.selectedMonth === null;

		if (allActive && noMonth) return undefined;

		const parts: ExpressionSpecification[] = [];

		if (!allActive) {
			parts.push([
				'in',
				['get', 'category'],
				['literal', [...this.activeCategories]]
			] as ExpressionSpecification);
		}

		if (!noMonth) {
			parts.push([
				'in',
				['get', 'category'],
				['literal', this.categoriesInMonth()]
			] as ExpressionSpecification);
		}

		return parts.length === 1 ? parts[0] : (['all', ...parts] as ExpressionSpecification);
	}

	toggleCategory(id: string) {
		const next = new Set(this.activeCategories);
		if (next.has(id)) {
			next.delete(id);
		} else {
			next.add(id);
		}
		this.activeCategories = next;
	}

	disableAllCategories() {
		this.activeCategories = new Set();
	}

	enableAllCategories() {
		this.activeCategories = new Set(CATEGORIES.map((c) => c.id));
	}

	resetAll() {
		this.activeCategories = new Set(CATEGORIES.map((c) => c.id));
		this.selectedMonth = null;
	}
}

export const filterState = new FilterState();

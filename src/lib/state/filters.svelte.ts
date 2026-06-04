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

	/** Category ids that ripen in the given month. */
	private categoriesInMonth(month: number): string[] {
		return CATEGORIES.filter((c) => c.ripeningMonths.includes(month)).map((c) => c.id);
	}

	/**
	 * Returns a MapLibre filter expression for the tree layer.
	 * Visibility is driven entirely by `activeCategories` (the month slider and
	 * the All On/Off buttons all resolve to a set of active categories), so the
	 * filter is a single category membership test.
	 */
	get mapFilter(): ExpressionSpecification | undefined {
		if (this.activeCategories.size === CATEGORIES.length) return undefined;
		return [
			'in',
			['get', 'category'],
			['literal', [...this.activeCategories]]
		] as ExpressionSpecification;
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

	/** Pick a ripening month: shows the species ripening then, overriding any
	 *  current selection (including "all off"). */
	selectMonth(month: number) {
		this.selectedMonth = month;
		this.activeCategories = new Set(this.categoriesInMonth(month));
	}

	/** Clear the month filter and show all species again. */
	clearMonth() {
		this.selectedMonth = null;
		this.activeCategories = new Set(CATEGORIES.map((c) => c.id));
	}

	disableAllCategories() {
		this.activeCategories = new Set();
		this.selectedMonth = null;
	}

	/** All On also clears the ripening-month filter. */
	enableAllCategories() {
		this.activeCategories = new Set(CATEGORIES.map((c) => c.id));
		this.selectedMonth = null;
	}

	resetAll() {
		this.activeCategories = new Set(CATEGORIES.map((c) => c.id));
		this.selectedMonth = null;
	}
}

export const filterState = new FilterState();

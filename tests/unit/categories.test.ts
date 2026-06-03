import { describe, it, expect } from 'vitest';
import { CATEGORIES, SPECIES_TO_CATEGORY } from '../../src/lib/categories';

describe('CATEGORIES', () => {
	it('has exactly 8 categories', () => {
		expect(CATEGORIES).toHaveLength(8);
	});

	it('all categories have required fields', () => {
		for (const cat of CATEGORIES) {
			expect(cat.id).toBeTruthy();
			expect(cat.label).toBeTruthy();
			expect(cat.color).toMatch(/^#[0-9a-f]{6}$/i);
			expect(cat.species.length).toBeGreaterThan(0);
			expect(cat.ripeningMonths.length).toBeGreaterThan(0);
			expect(cat.ripeningMonths.every((m) => m >= 1 && m <= 12)).toBe(true);
		}
	});

	it('all category ids are unique', () => {
		const ids = CATEGORIES.map((c) => c.id);
		expect(new Set(ids).size).toBe(ids.length);
	});

	it('all category colors are unique', () => {
		const colors = CATEGORIES.map((c) => c.color);
		expect(new Set(colors).size).toBe(colors.length);
	});
});

describe('SPECIES_TO_CATEGORY', () => {
	it('maps every species to a category', () => {
		for (const cat of CATEGORIES) {
			for (const species of cat.species) {
				expect(SPECIES_TO_CATEGORY.get(species)).toBe(cat);
			}
		}
	});

	it('returns undefined for unknown species', () => {
		expect(SPECIES_TO_CATEGORY.get('Unknown Tree')).toBeUndefined();
	});
});

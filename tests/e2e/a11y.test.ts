import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
	test('species index has no a11y violations', async ({ page }) => {
		await page.goto('/species/');
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});

	test('species detail has no a11y violations', async ({ page }) => {
		await page.goto('/species/apple/');
		const results = await new AxeBuilder({ page }).analyze();
		expect(results.violations).toEqual([]);
	});

	test('skip link is present', async ({ page }) => {
		await page.goto('/species/');
		const skipLink = page.locator('a.skip-link');
		await expect(skipLink).toHaveAttribute('href', '#main-content');
	});

	test('main content landmark exists', async ({ page }) => {
		await page.goto('/');
		const main = page.locator('main#main-content');
		await expect(main).toBeAttached();
	});

	test('navigation has aria-label', async ({ page }) => {
		await page.goto('/');
		const nav = page.locator('nav[aria-label="Main navigation"]');
		await expect(nav).toBeAttached();
	});
});

import { test, expect } from '@playwright/test';

test.describe('Species index page', () => {
	test('shows all 8 species cards', async ({ page }) => {
		await page.goto('/species/');
		const cards = page.locator('a[href^="/species/"]');
		await expect(cards).toHaveCount(8);
	});

	test('has correct page title', async ({ page }) => {
		await page.goto('/species/');
		await expect(page).toHaveTitle(/Species Guide/);
	});
});

test.describe('Species detail page', () => {
	test('loads apple species guide', async ({ page }) => {
		await page.goto('/species/apple/');
		await expect(page.locator('h1')).toContainText('Apple');
		await expect(page).toHaveTitle(/Apple/);
	});

	test('has identification section', async ({ page }) => {
		await page.goto('/species/cherry/');
		await expect(page.locator('text=Identification')).toBeVisible();
		await expect(page.locator('text=Leaves')).toBeVisible();
	});

	test('has foraging section', async ({ page }) => {
		await page.goto('/species/peach/');
		await expect(page.locator('text=Foraging Guide')).toBeVisible();
	});

	test('has back navigation', async ({ page }) => {
		await page.goto('/species/pear/');
		await expect(page.locator('a[href="/species/"]')).toBeVisible();
		await expect(page.locator('a[href="/"]')).toBeVisible();
	});

	test('returns 404 for invalid category', async ({ page }) => {
		const response = await page.goto('/species/banana/');
		expect(response?.status()).toBe(404);
	});
});

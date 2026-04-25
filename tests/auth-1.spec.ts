import { test, expect } from '@playwright/test';

test.beforeEach('setup', async ({ page }) => {
    await page.goto('https://bondaracademy.com/login');
    await expect(page).toHaveURL('https://bondaracademy.com/login');
});

test('auth-1', async ({ page }) => {
    await page.getByRole('link', { name: 'Blog' }).click();
    await expect(page).toHaveURL('https://bondaracademy.com/blog');
    console.log("blog page title", await page.title());
});
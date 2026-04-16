//Author: Jalapathi
import { test, expect } from '@playwright/test';

test('Login and verify product presence', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // 2. Enter username and password
    await page.locator('#username').fill("rahulshettyacademy");

    await page.locator('#password').fill("Learning@830$3mK2");

    // 3. Select the terms checkbox
    await page.locator('#terms').check();

    // 4. Click on the Sign In button
    await page.locator('#signInBtn').click();

    // 5. Wait until the page navigates to the shop page
    // Using a more robust wait: wait for URL or for a specific element on the shop page
    await page.waitForURL("**/angularpractice/shop");

    // 6. Verify if 'iphone X' product is present on the page
    const productTitle = page.locator('.card-title a', { hasText: 'iphone X' });
    await expect(productTitle).toBeVisible();

    console.log("Navigation to shop page successful and 'iphone X' product is verified.");
});

//Author: Jalapathi
import { test, expect, chromium } from '@playwright/test';

test('Frames test', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page).toHaveTitle('Practice Page');
    await page.pause();
});     

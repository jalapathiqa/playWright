//Author: Jalapathi
import { test, expect, chromium, Page } from '@playwright/test';

test.skip('ScreenShot', async ({ page }: { page: Page }) => {
    // const browser = await chromium.launch({ headless: false });
    // const context = await browser.newContext();
    // const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page).toHaveTitle('Practice Page');
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({ path: "screenshot1.png" });
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.locator("#displayed-text").screenshot({ path: "screenshot2.png" });
});

test.skip('Visual Testing', async ({ page }: { page: Page }) => {
    await page.goto('https://google.com/');
    expect(await page.screenshot()).toMatchSnapshot('landing.png')
})

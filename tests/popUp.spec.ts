import { test, expect, chromium } from '@playwright/test';

test('PopUp test', async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page).toHaveTitle('Practice Page');
    await page.locator("#confirmbtn").click();
    // await page.waitForTimeout(9000);
    // await page.keyboard.press('Enter');
    // await page.waitForTimeout(9000);
    // await page.pause();
    page.on("dialog", async (dialog) => {
        console.log(dialog.message());
        // await dialog.accept();
        await dialog.dismiss();
    });

await page.locator('#mousehover').hover();





});
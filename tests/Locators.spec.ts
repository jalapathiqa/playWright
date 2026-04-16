//Author: Jalapathi
import { test, expect } from '@playwright/test';
import { chromium, Page, Browser, BrowserContext, Locator } from '@playwright/test';

test('@Web Locators Validation', async () => {

    const browser: Browser = await chromium.launch({ headless: false });
    const context: BrowserContext = await browser.newContext();
    const page: Page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/locatorspractice/");
    const userName: Locator = page.locator("#inputUsername");
    const password: Locator = page.locator("[name*='inputPassword']");
    const sign = page.getByRole('button', { name: 'Sign In' });

    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK20");
    await sign.click();
    const errorMsg = await page.locator("[style*='block']").textContent();
    console.log(errorMsg);

    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");

    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("");
    await password.fill("Learning@830$3mK2");
    await sign.click();

    console.log(await page.locator(".card-body a").textContent());

    console.log(await page.locator(".card-body a").first().textContent());
    console.log(await page.locator(".card-body a").nth(0).textContent());
    console.log(await page.locator(".card-body a").nth(1).textContent()); //last
    await browser.close();
});

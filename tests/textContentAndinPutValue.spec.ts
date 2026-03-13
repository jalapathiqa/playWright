import { test, expect, Browser, Page, BrowserContext, chromium } from '@playwright/test'

test('windoes test', async () => {

    const context: BrowserContext = await chromium.launchPersistentContext('', { headless: false })
    const page: Page = await context.newPage();

    page.goto("https://rahulshettyacademy.com/loginpagePractise/")
    await page.waitForLoadState('domcontentloaded');
    // console.log(await page.title()); 
    const [newpage] = await Promise.all([
        context.waitForEvent('page'),
        page.locator("[href*='documents-request'] ").click()
    ])

    console.log(await newpage.title());
    await newpage.locator("//a[contains(text(),'Home')]").first().click();
    console.log(await newpage.title());

    await new Promise(f => setTimeout(f, 5000));

    console.log(await page.getByRole('textbox', { name: 'Username:' }).textContent());

    await page.getByRole('textbox', { name: 'Username:' }).fill('rahul');
    console.log(await page.getByRole('textbox', { name: 'Username:' }).inputValue());

    await page.getByRole('textbox', { name: 'Password:' }).fill('admin');
    await page.getByRole('button', { name: 'Sign In' }).click();

})  
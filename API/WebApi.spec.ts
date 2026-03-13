import { test, expect, request, Page, Browser } from '@playwright/test';
const BASE_URL = 'https://rahulshettyacademy.com/client/#/auth/login';
const USERNAME = 'jpr23456@gmail.com';
const PASSWORD = 'Jpr23456';
let webContext;

test.beforeAll(async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(BASE_URL);
    await page.locator('#userEmail').fill(USERNAME);
    await page.locator('#userPassword').fill(PASSWORD);

    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    await context.storageState({ path: 'state.json' });
    webContext = await browser.newContext({ storageState: 'state.json' });


})

test('Client App login', async ({ browser }) => {
    // const context = await browser.newContext({ storageState: 'state.json' });
    // const page = await context.newPage();
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/");
    await page.waitForSelector('.card', { timeout: 30000 });
    await page.waitForTimeout(2000); // allow all cards to render
    const allProducts = page.locator('.card');
    const productCount = await allProducts.count();

    for (let i = 0; i < productCount; i++) {
        const name = await allProducts.nth(i).locator('.card-body').textContent();
        console.log(`  Item ${i + 1}: ${name?.trim()}`);
    }

    await page.getByRole('button', { name: 'Add To Cart' }).first().click();
    await page.getByRole('button', { name: 'Cart 1' }).click();

    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByPlaceholder('Select Country').pressSequentially('ind');
    await page.locator('.ta-results').waitFor({ state: 'visible' });

    const contry = await page.locator('.ta-results button').allTextContents();
    console.log(contry);

    for (const country of contry) {
        if (country.includes('India')) {
            console.log("Found India");
            await page.locator('.ta-results').filter({ hasText: ' India' }).click();
            break;
        }
    }

    await page.waitForTimeout(25000);
})

test('test 2', async () => {
    console.log("test 2");
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/");
    await page.waitForSelector('.card', { timeout: 30000 });
    await page.waitForTimeout(2000); // allow all cards to render
    const allProducts = page.locator('.card');
    const productCount = await allProducts.count();
})


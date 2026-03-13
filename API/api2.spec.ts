// make API calls and grab response and validate it

import { test, expect, request } from '@playwright/test';
const loginPayload = { userEmail: "jkala1@gmail.com", userPassword: "Jkala@1234" };
let token: string;

test.beforeAll(async () => {

    const apiContext = await request.newContext();
    const response = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", { data: loginPayload });
    expect(response.ok()).toBeTruthy();
    console.log(response.status());
    console.log(await response.body());
    token = await response.json();
    console.log(token);

});

test("@API Login API returns a valid token", async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value)
    }, token)

    await page.goto("https://rahulshettyacademy.com/client/");
    const allProducts = page.locator('.card-body');
    const productCount = await allProducts.count();
    console.log(`\n✅ Total items found on the page: ${productCount}\n`);

    // Print all product names
    for (let i = 0; i < productCount; i++) {
        const name = await allProducts.nth(i).locator('.card-body').textContent();
        // const name1 = await allProducts.nth(i).locator("//button[contains(text(), 'Add To Cart')]").click;
        // break;
        console.log(`  Item ${i + 1}: ${name?.trim()}`);
    }

    // await page.waitForTimeout(25000);

    await page.getByRole('button', { name: 'Add To Cart' }).first().click();
    // await page.waitForTimeout(25000);

    // await page.locator("//button[contains(text(),'Cart')]").click();
    // await page.locator("[routerlink*='cart']").click();
    await page.getByRole('button', { name: 'Cart 1' }).click();
    // await page.waitForTimeout(25000);

    await page.getByRole('button', { name: 'Checkout' }).click();
    // await page.waitForTimeout(25000);

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


});

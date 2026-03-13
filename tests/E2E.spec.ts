import { test, expect, Browser, Page, BrowserContext, chromium } from '@playwright/test'

test('E2E test', async () => {

    const context: BrowserContext = await chromium.launchPersistentContext('', { headless: false })
    const page: Page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    await page.waitForLoadState('domcontentloaded');
    console.log(await page.title());
    await page.getByText('Register here', { exact: true }).click();
    await page.waitForLoadState('domcontentloaded');
    console.log(await page.title());
    //register
    await page.locator('#firstName').fill('abcd');
    await page.locator('#lastName').fill('09876');
    const userName = page.locator('#userEmail')
    userName.fill('jprd0098765@gmail.com');
    await page.locator('#userMobile').fill('1234567891');
    await page.locator("//span[contains(text(),'Male')]").check();
    const password = page.locator('#userPassword')
    password.fill('Jpk1234567891');
    await page.locator('#confirmPassword').fill('Jpk1234567891');
    await page.locator("//input[@type='checkbox']").check();
    await page.locator('#login').click();

    const title = await page.title();
    console.log(title);
    expect(title).toBe(title);
    const un = await page.locator('#userEmail').inputValue();
    console.log(un);
    const pw = await page.locator('#userPassword').inputValue();
    console.log(pw);
    const success = await page.locator("//h1[contains(text(),'Account Created Successfully')]");
    // expect(success).toBeVisible();
    console.log(await success.textContent());
    await page.locator("//button[contains(text(),'Login')]").click();
    await page.waitForLoadState('domcontentloaded');
    console.log(await page.title());
    await userName.fill(un);
    await password.fill(pw);
    await page.locator("#login").click();
    await page.waitForLoadState('domcontentloaded');
    console.log(await page.title());




})      
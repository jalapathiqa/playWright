//Author: Jalapathi
import { test, expect } from '@playwright/test';
import { POManager } from '../pageObjects/POManager';

test("Verify iphone X presence on Shop page after login", async ({ page }) => {
    const poManager = new POManager(page);
    const loginPagePractise = poManager.getLoginPagePractise();
    const shopPage = poManager.getShopPage();

    // 1. Navigate to login page
    await loginPagePractise.goTo();

    // 2. Login with credentials and check terms
    await loginPagePractise.login("rahulshettyacademy", "Learning@830$3mK2");

    // 3. Wait until page is navigated to shop page
    await page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop");

    // 4. Verify iphone X product is present
    const titles = await shopPage.getProductTitles();
    console.log("Product titles found: ", titles);
    
    const isIphoneXPresent = titles.includes("iphone X");
    expect(isIphoneXPresent).toBeTruthy();
});

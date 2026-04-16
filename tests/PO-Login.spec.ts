//Author: Jalapathi
import { test, expect } from '@playwright/test';
import { POManager } from '../pageObjects/POManager';
import testData from '../Utils/TestData.json';
for (const data of testData)
    {
    test(`Login with Page Object Model - ${data.username.split('@')[0]} - ${data.productName}`, async ({ page }) => 
        {
        const poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goto("https://rahulshettyacademy.com/client");
        await loginPage.login(data.username, data.password);
        await expect(page).toHaveTitle("Let's Shop");
        await page.pause();
        console.log(await page.title());
    })
}

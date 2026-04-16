//Author: Jalapathi
import{test, expect, firefox}from'@playwright/test';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';

test('Basic UI validation', async()=>{

    const browser:Browser = await firefox.launch({headless:false});
    const context:BrowserContext = await browser.newContext();
    const page:Page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/#/auth/register');

    // register
    const userName = page.locator('#firstName');
    const lastName = page.locator('#lastName');
    const email = page.locator('//input[@id="userEmail"]');
    const userMobile = page.locator('//input[@id="userMobile"]');
    const genderM = page.locator('//span[contains(text(),"Male")]');
    const genderF = page.locator('//span[contains(text(),"Female")]');
    const password = page.locator('//input[@id="userPassword"]');
    const confirmPassword = page.locator('//input[@id="confirmPassword"]');
    const required = page.locator('//div[contains(text(),"I am 18 year or Older")]');
    const registerBtn = page.locator('//button[@id="login"]');
    const successMsg = page.getByText('Account Created Successfully', { exact: true });

    const pageTitle = await page.title();
    console.log(pageTitle);
    await expect(page).toHaveTitle("Let's Shop");

    // expect(userName).toBeEditable;
    // userName.fill('Jp2');
    // lastName.fill('Singh');
    // email.fill('jp1@gmail.com');
    // userMobile.fill('9876543210');
    // genderM.click();
    // password.fill('Password@1234');
    // confirmPassword.fill('Password@1234');
    // required.click();
    // registerBtn.click();
    // // await expect(successMsg).toBeVisible();
    // console.log(await successMsg.textContent());













    // login

    // get the first product title
    



})

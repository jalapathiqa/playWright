//Author: Jalapathi
import{test, expect, firefox}from'@playwright/test';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';

test('Basic UI validation', async()=>{

    const browser:Browser = await firefox.launch({headless:false});
    const context:BrowserContext = await browser.newContext();
    const page:Page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client');

    const pageTitle = await page.title();
    console.log(pageTitle);

    await page.locator('#userEmail').fill('jkala@gmail.com');
    await page.locator('#userPassword').fill('Student@1234');
    await page.locator('//input[@id="login"]').click();
       await expect(page).toHaveTitle("Let's Shop");
    
    // Dynamic Wait:
    
    //  await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').last().waitFor();

    const products = page.locator('.card-body b');

    console.log(await products.allTextContents());
for(let i=0;i<await products.count(); i++){

    if(await products.nth(i).textContent() == 'iphone 13 pro'){
        console.log('iphone 13 pro found');
        break;
    }

}

})

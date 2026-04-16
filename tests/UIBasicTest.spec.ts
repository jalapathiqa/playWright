//Author: Jalapathi
import{test, expect}from'@playwright/test';
import { chromium, Page, Browser, BrowserContext } from '@playwright/test';
test('Basic UI validation', async()=>{
const browser:Browser = await chromium.launch({headless:true});
const context:BrowserContext = await browser.newContext();
const page:Page = await context.newPage();
await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
const userName = page.locator('#username');
const password = page.locator('#password');
const login = page.locator('#signInBtn');
await userName.fill("rahulshettyacademy");
await password.fill("Learning@830$3mK20");
await login.click();
console.log(await page.locator("[style*='block']").textContent());
await userName.fill("");
await userName.fill("rahulshettyacademy");
await password.fill("");
await password.fill("Learning@830$3mK2");
await login.click(); 
await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop');
await expect(page).toHaveTitle('ProtoCommerce');
const products = page.locator('.card-body a');
const productCount = await products.count();


 // console.log(`Total products: ${productCount}`); 
 // for(let i=0; i<productCount; i++){ 
 // const productName = await products.nth(i).locator('h4 a').textContent(); 
 // if(productName?.includes('iphone')){ 
 // await products.nth(i).locator('button').click(); 
 // } 
 const iphone= await products.first().textContent(); 
 console.log(iphone); 
 await expect(iphone).toMatch('iphone'); 
 const iphone2= await products.nth(-1).textContent(); 
 console.log(iphone2); 
 await expect(iphone2).toMatch('Blackberry');
 console.log(await products.count());
console.log(await products.allTextContents());
});


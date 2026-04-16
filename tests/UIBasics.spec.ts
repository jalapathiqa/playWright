//Author: Jalapathi
import{test, expect} from '@playwright/test';

test('Browser context', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
})

test('page', async({page})=>{

    await page.goto("https://google.com/");
    const title = await page.title();
    console.log(title);
    expect(title).toBe("Google");
})

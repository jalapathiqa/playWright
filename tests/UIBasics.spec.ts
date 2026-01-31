import{test, expect} from '@playwright/test';

test('Browser context', async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
})

test('page', async({page})=>{

    await page.goto("https://google.com/");
})
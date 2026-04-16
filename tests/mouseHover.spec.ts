//Author: Jalapathi
import{test,expect, Browser, BrowserContext, Page} from '@playwright/test';  
import{chromium, ChromiumBrowserContext, webkit, firefox} from '@playwright/test';
// import {log} from 'console';

test('mouse hover test', async()=>{

    const browser:Browser = await chromium.launch({headless:false, channel:'chrome'});
    const browserContext:BrowserContext = await browser.newContext();
    const page:Page = await browserContext.newPage();

    await page.goto('https://www.bigbasket.com/');
    await page.getByRole('button', {name: 'Shop by'}).click();
    await page.getByText('Shop by', {exact: true}).click();
    await page.getByText('Fashion').first().hover();

    await page.waitForTimeout(5000);
})

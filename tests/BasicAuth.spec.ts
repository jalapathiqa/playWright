import{test,expect, Browser, Page, BrowserContext} from '@playwright/test'
import{webkit, chromium, firefox} from '@playwright/test'

test('basicAuth', async()=>{
// const browser:BrowserContext = await chromium.launchPersistentContext('',{headless:false, channel:'chrome'})
const browser:BrowserContext = await firefox.launchPersistentContext('',{headless:false})

// const browserContext:BrowserContext = await browser.newContext();

const pages=browser.pages(); //2 - 0-1
const page=pages[0];
// const page:Page = await browser.newPage();

// await page.goto('https://the-internet.herokuapp.com/basic_auth')

await page.goto('https://admin:admin@the-internet.herokuapp.com/basic_auth')

console.log(await page.title())
await expect(page.locator('div.example p')).toHaveText('Congratulations! You must have the proper credentials.')

await expect(page).toHaveURL('https://the-internet.herokuapp.com/basic_auth')
await expect(page).toHaveTitle('The Internet');
// await browser.close();

await new Promise(f=>setTimeout(f,5000));

// await new promise(()=>{})

})
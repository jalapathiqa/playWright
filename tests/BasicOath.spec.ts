import{test,expect, Browser, Page, BrowserContext} from '@playwright/test'
import{webkit, chromium, firefox} from '@playwright/test'

test('basicAuth', async()=>{
const browser:Browser = await chromium.launch({headless:false, channel:'chrome'})
const browserContext:BrowserContext = await browser.newContext();
const page:Page = await browserContext.newPage();

await page.goto('https://the-internet.herokuapp.com/basic_auth')


})
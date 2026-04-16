//Author: Jalapathi
import{test,expect} from '@playwright/test'
import { chromium, Page, Browser, BrowserContext } from '@playwright/test'

test('UI Basics',async()=>{


const browser:Browser = await chromium.launch({headless:false});
const context:BrowserContext = await browser.newContext();
const page:Page = await context.newPage();

page.goto('')

} )

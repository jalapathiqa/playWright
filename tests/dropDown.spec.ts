//Author: Jalapathi
import{test,expect, Browser, BrowserContext, Page, Locator, chromium} from '@playwright/test';
// import { chromium } from '@playwright/test';
test('drop down test', async()=>{
const browser:Browser = await chromium.launch({headless:false, channel:'chrome'});
// const browser:BrowserContext = await chromium.launchPersistentContext('',{viewport:{width:1280,height:720}});
const page:Page = await browser.newPage();await page.goto("https://www.magupdate.co.uk/magazine-subscription/phrr");

const dropDown = 'select#Contact_CountryCode';
// const dropDown:Locator = await page.locator('#Contact_CountryCode:visible');
// await page.locator(dropDown).isVisible();
// await page.selectOption(dropDown,{value:'AG'});
// await page.waitForTimeout(5000);
// await page.selectOption(dropDown,{label:'American Samoa'})
// await page.waitForTimeout(5000);
// await page.selectOption(dropDown,{index:6})
// await page.waitForTimeout(15000);
const allDropDowns = await page.$$(dropDown+' > option')
console.log(allDropDowns.length);
for(const e of allDropDowns){
// console.log(await e.textContent());
const contries = await e.textContent()
console.log(contries);
if(contries=='India'){
await page.selectOption(dropDown,{label:'India'})
   }
 }
await page.waitForTimeout(10000);
await browser.close();


})

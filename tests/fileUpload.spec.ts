import{test,expect, Browser, BrowserContext, Page, Locator, chromium} from '@playwright/test'; 
     import{ChromiumBrowserContext, webkit, firefox} from '@playwright/test';
import * as path from 'path';
test('file upload test', async()=>{ 
   const browser:Browser = await chromium.launch({headless:false, channel:'chrome'}); 
      const browserContext:BrowserContext = await browser.newContext();  
   const page:Page = await browserContext.newPage();   
 await page.goto('https://the-internet.herokuapp.com/upload'); 
   await page.waitForTimeout(3000);
    //SINGLE FILE    
await page.locator('input[name="file"]').setInputFiles("C:/Users/jkala10/Downloads/empty.docx");    
await page.waitForTimeout(5000);

    //MULTIPLE FILES  	
  await page.locator('input[name="file"]').setInputFiles([ 
   path.join('C:/Users/jkala10/Downloads/empty.docx'),    
	path.join('C:/Users/jkala10/Downloads/empty.docx')]);
	    await page.waitForTimeout(5000);

    //de-select files   
 await page.locator('input[name="file"]').setInputFiles([]);  
   await page.waitForTimeout(5000);   
 await browser.close();



 });
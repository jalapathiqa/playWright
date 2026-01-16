import{test, expect, Locator, Browser, Page, BrowserContext} from "@playwright/test"
import{webkit, chromium, firefox} from 'playwright';

test('browser context',async()=>{

    const browser:Browser = await chromium.launch({headless:false, channel:'chrome'});
    
    //browserContext1:
   const browserContext1:BrowserContext= await browser.newContext();
   const page1:Page = await browserContext1.newPage();

    //browserContext2:
    const browserContext2:BrowserContext = await browser.newContext();
    const page2:Page = await browserContext2.newPage();


    //browser1:
    await page1.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    const emailId1 = await page1.getByRole('textbox', {name:'E-mail Address'});
    const password1 = await page1.getByRole('textbox', {name:'Password'});
    const submit1 = await page1.getByRole('button',{name:'Login', exact:true});
    
    await emailId1.fill('pwtest@opencart.com');
    await password1.fill("playwright@123");
    await submit1.click();

    //browser2:
    await page1.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login");
    const emailId2 = await page2.getByRole('textbox',{name:'E-mail Address'});
    const password2 = await page2.getByRole('textbox', {name:'Password'});
    const submit2 = await page2.getByRole('button', {name:'login',exact:true});

    await emailId2.fill('userpw@pw.com')
    await password2.fill('Test@123');
    await submit2.click();

    await browserContext1.close();
    await browserContext2.close();
    await browser.close();
    await new Promise(() => {}); // prevent your script from exiting immediately


    })




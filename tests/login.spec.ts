import{test,expect, Browser, Page} from '@playwright/test'
import{webkit, chromium, firefox} from 'playwright';

test('login test', async()=>{
   const browser:Browser= await chromium.launch({headless:false});
   const page:Page = await browser.newPage();

await page.goto("https://naveenautomationlabs.com/opencart/index.php?route=account/login")
// await page.locator('//input[@name='email']').fill('
const emailId = await page.getByRole('textbox',{name:'E-Mail Address'})
const password = await page.getByRole('textbox',{name:'Password'})
const submit = await page.getByRole('button',{name:'Login'})
emailId.fill('pwtest@opencart.com');
    password.fill('playwright@123');
    submit.click();

    const title = await page.title();
    console.log("Home page title", title);
    await page.screenshot({path:'homepage.png'});
    expect(title).toBe('Account Login');
    browser.close();




})

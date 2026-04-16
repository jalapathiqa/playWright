//Author: Jalapathi
import{test,expect,Browser,Page,Locator, chromium} from'@playwright/test';
test('dropdown test', async()=>{

    const browser:Browser = await chromium.launch({headless:false, channel:'chrome'});

    const page:Page = await browser.newPage();

    await page.goto("https://www.magupdate.co.uk/magazine-subscription/phrr");

    const drop1:Locator = page.locator('#Contact_CountryCode');
    
    await drop1.isVisible();    
    await drop1.selectOption({value:'AS'})
    await page.waitForTimeout(5000);    
    await drop1.selectOption({label:'India'})
    await page.waitForTimeout(5000);

    // const allDropDowns = await page.$$(dropDown+' > option')
    
    const dropAll = await page.$$(drop1+'>option');
    console.log(dropAll.length);

    for(const e of dropAll){
        console.log( await e.textContent());
        if(await e.textContent()=='Angola'){
            await drop1.selectOption({label:'Angola'})
            await page.waitForTimeout(5000);
        }

    }

})


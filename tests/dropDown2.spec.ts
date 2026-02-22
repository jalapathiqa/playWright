import{test, expect} from'@playwright/test';
test('dropdown test', async({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();  
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    await page.locator('#username').fill("rahulshettyacademy");   
 await page.locator('#password').fill("Learning@830$3mK20");

    // await page.locator('#signInBtn').click(); 
// await page.selectOption('select.form-control',{value:'Teacher'});
// await drop1.selectOption("Teacher");
// await page.pause();
const drop1 = await page.locator('select.form-control')
console.log(await drop1.count());
const dropAll = await page.$$('select.form-control > option');
console.log(dropAll.length);
for(const e of dropAll){
    console.log(await e.textContent()); 
   if(await e.textContent()=='Consultant'){    
 
     await drop1.selectOption({label:'Consultant'})  
       await page.waitForTimeout(5000);   
 }
}





})
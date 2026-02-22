import{test, expect} from'@playwright/test';
test('Radio button test', async({browser})=>{
const context = await browser.newContext();
const page = await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await page.locator('#username').fill("rahulshettyacademy");
await page.locator('#password').fill("Learning@830$3mK20");
// await page.getByRole('radio').last().click();
const userRadio = await page.locator('span:has-text("User")')
await userRadio.click();
await page.locator('#okayBtn').click();
await expect(userRadio).toBeChecked();
await page.waitForTimeout(9000);
await page.locator('span:has-text("Admin")').click();
await expect( await page.locator('span:has-text("User")').isChecked()).toBeFalsy();
await page.waitForTimeout(9000);

})
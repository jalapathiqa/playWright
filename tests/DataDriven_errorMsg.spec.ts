import { test, expect, chromium } from '@playwright/test';

[
   { email: "abc@gmail.com", password: "123456", isErrorDisplayed: true },
   { email: "abcd@gmail.com", password: "1234567", isErrorDisplayed: false },
   { email: "abcde@gmail.com", password: "12345678", isErrorDisplayed: false }
].forEach(({ email, password, isErrorDisplayed }) => {
   test(`Error Message Validation test ${email}`, async () => {
      const browser = await chromium.launch({ headless: false });
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto('https://bondaracademy.com/login');
      await page.getByLabel('Email').fill(email);
      await page.getByLabel('Password').fill(password);
      await page.getByText('Login', { exact: true }).click();
      const errormsg = page.getByText('Invalid email or password')
      await expect(errormsg).toContainText('Invalid email or password');
      if (isErrorDisplayed) {
         console.log("error 1", await errormsg.textContent());
      } else {
         console.log("error message not displayed");
      }
   });
});

/*
test('Error Message Validation - 2', async () => {
   const browser = await chromium.launch({ headless: false });
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://bondaracademy.com/login');
   await page.getByLabel('Email').fill('abcd@gmail.com');
   await page.getByLabel('Password').fill('1234567');
   await page.getByText('Login', { exact: true }).click();
   const errormsg = page.getByText('Invalid email or password')
   await expect(errormsg).toContainText('Invalid email or password');
   console.log("error 2", await errormsg.textContent());
});

test('Error Message Validation - 3', async () => {
   const browser = await chromium.launch({ headless: false });
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://bondaracademy.com/login');
   await page.getByLabel('Email').fill('abcde@gmail.com');
   await page.getByLabel('Password').fill('12345678');
   await page.getByText('Login', { exact: true }).click();
   const errormsg = page.getByText('Invalid email or password')
   await expect(errormsg).toContainText('Invalid email or password');
   console.log("error 3", await errormsg.textContent());
});
*/
import { test, expect, chromium } from '@playwright/test';
import * as XLSX from 'xlsx';
import path from 'path';

const testDataFilePath = path.join(__dirname, '../TestData/TestData.xlsx');


test('Data driven test', async () => {

   const workbook = XLSX.readFile(testDataFilePath);
   // const sheetName = workbook.SheetNames[0];
   const worksheet = workbook.Sheets['Sheet1'];
   interface UserData {
      email: string;
      password: string;
   }

   const data = XLSX.utils.sheet_to_json(worksheet) as UserData[];

   // console.log("TestData: ", data);

   const browser = await chromium.launch({ headless: false });
   const context = await browser.newContext();
   const page = await context.newPage();
   await page.goto('https://bondaracademy.com/login');
   await page.getByLabel('Email').fill(`${data[2].email}`);
   await page.getByLabel('Password').fill(`${data[2].password}`);
   await page.getByText('Login', { exact: true }).click();
   const errormsg = page.getByText('Invalid email or password')
   await expect(errormsg).toContainText('Invalid Email and password');


});



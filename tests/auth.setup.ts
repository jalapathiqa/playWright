import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authentication', async ({ page }) => {
    await page.goto('https://bondaracademy.com/login');
    await page.getByLabel('Email').fill('jpreddy911@gmail.com');
    await page.getByLabel('Password').fill('Selenium@1423');
    await page.getByText('Login', { exact: true }).click();
    await expect(page).toHaveURL('https://bondaracademy.com/dashboard');
    await page.context().storageState({ path: authFile });
});
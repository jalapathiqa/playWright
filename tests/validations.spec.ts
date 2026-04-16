//Author: Jalapathi
import { test, expect } from '@playwright/test';
test.describe.configure({mode: 'parallel'});
test('Validation test1', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page).toHaveTitle('Practice Page');
    await page.goto('https://google.com');
    await expect(page).toHaveTitle('Google');
    await page.goBack();
    await expect(page).toHaveTitle('Practice Page');
    await page.goForward();
    await expect(page).toHaveTitle('Google');
    await page.reload();
    await expect(page).toHaveTitle('Google');
    await page.goBack();
    await expect(page).toHaveTitle('Practice Page');
});

test('Validation test2', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page).toHaveTitle('Practice Page');
    await page.goto('https://google.com');
    await expect(page).toHaveTitle('Google');
    await page.goBack();
    await expect(page).toHaveTitle('Practice Page');
    await page.goForward();
    await expect(page).toHaveTitle('Google');
    await page.reload();
    await expect(page).toHaveTitle('Google');
    await page.goBack();
    await expect(page).toHaveTitle('Practice Page');
});

test('Validation test3', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page).toHaveTitle('Practice Page');
    await page.goto('https://google.com');
    await expect(page).toHaveTitle('Google');
    await page.goBack();
    await expect(page).toHaveTitle('Practice Page');
    await page.goForward();
    await expect(page).toHaveTitle('Google');
    await page.reload();
    await expect(page).toHaveTitle('Google');
    await page.goBack();
    await expect(page).toHaveTitle('Practice Page');
});

test('Validation test4', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page).toHaveTitle('Practice Page');
    await page.goto('https://google.com');
    await expect(page).toHaveTitle('Google');
    await page.goBack();
    await expect(page).toHaveTitle('Practice Page');
    await page.goForward();
    await expect(page).toHaveTitle('Google');
    await page.reload();
    await expect(page).toHaveTitle('Google');
    await page.goBack();
    await expect(page).toHaveTitle('Practice Page');
});

test('Validation test5', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    await expect(page).toHaveTitle('Practice Page');
    await page.goto('https://google.com');
    await expect(page).toHaveTitle('Google');
    await page.goBack();
    await expect(page).toHaveTitle('Practice Page');
    await page.goForward();
    await expect(page).toHaveTitle('Google');
    await page.reload();
    await expect(page).toHaveTitle('Google');
    await page.goBack();
    await expect(page).toHaveTitle('Practice Page');
});

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://conduit.bondaracademy.com/');
  await page.getByRole('link', { name: 'Sign in' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('testgen@test.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('test12345678');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: '  New Article' }).click();
  await page.getByRole('textbox', { name: 'Article Title' }).fill('test');
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).fill('test descirption');
  await page.getByRole('textbox', { name: 'What\'s this article about?' }).press('Tab');
  await page.getByRole('textbox', { name: 'Write your article (in' }).fill('test body');
  await page.getByRole('button', { name: 'Publish Article' }).click();
  await page.getByRole('textbox', { name: 'Article Title' }).fill('test121');
  await page.getByRole('button', { name: 'Publish Article' }).click();
  await page.getByRole('button', { name: ' Delete Article' }).first().click();
});
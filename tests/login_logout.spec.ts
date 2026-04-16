//Author: Jalapathi
import { test, expect } from '@playwright/test';
import path from 'path';

const BASE_URL = 'https://rahulshettyacademy.com/client/#/auth/login';
const USERNAME = 'jpr23456@gmail.com';
const PASSWORD = 'Jpr23456';

test('Login, Count Items, Add First Item to Cart, Logout', async ({ page }) => {

    await page.goto(BASE_URL);
    await page.waitForLoadState('domcontentloaded');

    await page.locator('#userEmail').fill(USERNAME);
    await page.locator('#userPassword').fill(PASSWORD);

    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');

    await page.waitForSelector('.card', { timeout: 30000 });
    await page.waitForTimeout(2000); // allow all cards to render
    const allProducts = page.locator('.card');
    const productCount = await allProducts.count();

    for (let i = 0; i < productCount; i++) {
        const name = await allProducts.nth(i).locator('.card-body').textContent();
        console.log(`  Item ${i + 1}: ${name?.trim()}`);
    }

    await page.getByRole('button', { name: 'Add To Cart' }).first().click();
    await page.getByRole('button', { name: 'Cart 1' }).click();

    await page.getByRole('button', { name: 'Checkout' }).click();

    await page.getByPlaceholder('Select Country').pressSequentially('ind');
    await page.locator('.ta-results').waitFor({ state: 'visible' });

    const contry = await page.locator('.ta-results button').allTextContents();
    console.log(contry);

    for (const country of contry) {
        if (country.includes('India')) {
            console.log("Found India");
            await page.locator('.ta-results').filter({ hasText: ' India' }).click();
            break;
        }
    }

    await page.waitForTimeout(25000);


    /*
    
    // Print all product names
        for (let i = 0; i < productCount; i++) {
            const name = await allProducts.nth(i).locator('.card-title').textContent();
            console.log(`  Item ${i + 1}: ${name?.trim()}`);
        }
    
        // Screenshot scrolled to show all items
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.screenshot({ path: `${SCREENSHOTS_DIR}/05_all_items_scrolled.png`, fullPage: true });
        console.log('Screenshot 5: Scrolled to show all items');
        await page.evaluate(() => window.scrollTo(0, 0));
    
        // ─── Step 6: Get First Item Name ──────────────────────────────────────────
        const firstProductName = await allProducts.nth(0).locator('.card-title').textContent();
        console.log(`\n Adding first item to cart: "${firstProductName?.trim()}"`);
    
        // ─── Step 7: Add First Item to Cart ───────────────────────────────────────
        const addToCartBtn = allProducts.nth(0).locator('button:has-text("Add To Cart")');
        await addToCartBtn.click();
        await page.waitForTimeout(2000); // wait for cart update
        // await page.screenshot({ path: `${SCREENSHOTS_DIR}/06_item_added_to_cart.png`, fullPage: true });
        console.log('Screenshot 6: First item added to cart');
    
        // ─── Step 8: Verify Cart Count Updated ────────────────────────────────────
        const cartCount = page.locator("[routerlink='/dashboard/cart']");
        const cartText = await cartCount.textContent();
        console.log(`\n Cart indicator: ${cartText?.trim()}`);
        // await page.screenshot({ path: `${SCREENSHOTS_DIR}/07_cart_updated.png`, fullPage: true });
        console.log('Screenshot 7: Cart count updated');
    
        // ─── Step 9: Open User Menu / Logout ──────────────────────────────────────
        // Click user profile icon (top right)
        const userIcon = page.locator("button[routerlink='/dashboard/myaccount']").or(
            page.locator(".fa-user")
        ).or(
            page.locator("i.fa-user")
        ).first();
    
        await userIcon.click();
        await page.waitForTimeout(1000);
        // await page.screenshot({ path: `${SCREENSHOTS_DIR}/08_user_menu_open.png`, fullPage: true });
        console.log('Screenshot 8: User menu opened');
    
        // ─── Step 10: Click Logout ────────────────────────────────────────────────
        await page.getByText('Logout').click();
        await page.waitForLoadState('networkidle');
        //  await page.screenshot({ path: `${SCREENSHOTS_DIR}/09_after_logout.png`, fullPage: true });
        console.log('Screenshot 9: After logout');
    
        // ─── Assertions ───────────────────────────────────────────────────────────
        expect(productCount).toBeGreaterThan(0);
        // After logout, should be back on login page
        await expect(page.locator('#userEmail')).toBeVisible({ timeout: 10000 });
        console.log('\n Test Complete! Successfully logged out and redirected to login page.');
        console.log(`\n Summary:\n  - Total items found: ${productCount}\n  - First item added to cart: "${firstProductName?.trim()}"\n  - Logout: Successful`);
    
    
    */

});


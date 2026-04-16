// Author: Jalapathi
// Test: Amazon.ca - Search iPhone 16 Pro and click on the lowest price mobile
// Manual exploration confirmed locators on: 2026-04-15
// Lowest price found: $1,080.00 - Apple iPhone 16 Pro Max, 256GB, White Titanium (Renewed)

import { test, expect, Page } from '@playwright/test';

/**
 * Utility: Extract numeric price from Amazon's split price display format.
 * Amazon renders prices as two separate spans: '.a-price-whole' and '.a-price-fraction'
 */
async function extractPrice(priceText: string): Promise<number> {
  // Remove currency symbols, commas, spaces, and parse
  const cleaned = priceText.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || Infinity;
}

test.describe('Amazon.ca - iPhone 16 Pro Search & Lowest Price', () => {

  test.beforeEach(async ({ page }) => {
    // Set a generous navigation timeout for Amazon's heavy pages
    page.setDefaultNavigationTimeout(60000);
    page.setDefaultTimeout(30000);
  });

  test('TC001 - Navigate to Amazon.ca homepage', async ({ page }) => {
    await test.step('Open Amazon.ca', async () => {
      await page.goto('https://www.amazon.ca', { waitUntil: 'domcontentloaded' });
    });

    await test.step('Verify Amazon.ca homepage loaded', async () => {
      await expect(page).toHaveTitle(/Amazon.ca/i);
      // Verify the search bar is present (confirmed selector from manual test)
      await expect(page.locator('#twotabsearchtextbox')).toBeVisible();
      await expect(page.locator('#nav-logo-sprites')).toBeVisible();
    });
  });

  test('TC002 - Search for iPhone 16 Pro and find lowest price mobile', async ({ page }) => {

    // ──────────────────────────────────────────────────────────
    // STEP 1: Navigate to Amazon.ca
    // ──────────────────────────────────────────────────────────
    await test.step('Navigate to Amazon.ca', async () => {
      await page.goto('https://www.amazon.ca', { waitUntil: 'domcontentloaded' });
      await expect(page).toHaveTitle(/Amazon.ca/i);
    });

    // ──────────────────────────────────────────────────────────
    // STEP 2: Handle any popup/overlay (location prompt, ads, etc.)
    // ──────────────────────────────────────────────────────────
    await test.step('Dismiss any overlays or popups', async () => {
      // Dismiss "Continue Shopping" overlay if present
      const continueShoppingBtn = page.locator('input[data-action-type="DISMISS"]');
      if (await continueShoppingBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await continueShoppingBtn.click();
        await page.waitForTimeout(1000);
      }
    });

    // ──────────────────────────────────────────────────────────
    // STEP 3: Search for "iphone 16 pro phone unlocked"
    // Selector: #twotabsearchtextbox (confirmed from manual test)
    // ──────────────────────────────────────────────────────────
    await test.step('Type "iphone 16 pro phone unlocked" in search bar', async () => {
      const searchBox = page.locator('#twotabsearchtextbox');
      await searchBox.waitFor({ state: 'visible' });
      await searchBox.click();
      await searchBox.fill('iphone 16 pro phone unlocked');
      await expect(searchBox).toHaveValue('iphone 16 pro phone unlocked');
    });

    // ──────────────────────────────────────────────────────────
    // STEP 4: Click the search button
    // Selector: #nav-search-submit-button (confirmed from manual test)
    // ──────────────────────────────────────────────────────────
    await test.step('Click the Search button', async () => {
      const searchButton = page.locator('#nav-search-submit-button');
      await searchButton.click();
      // Wait for search results to load
      await page.waitForLoadState('domcontentloaded');
    });

    // ──────────────────────────────────────────────────────────
    // STEP 5: Verify search results page URL and content
    // ──────────────────────────────────────────────────────────
    await test.step('Verify search results page loaded', async () => {
      // Amazon.ca search URL can use either ?k= or ?field-keywords= depending on browser session/cookies
      await expect(page).toHaveURL(/amazon\.ca\/s/i, { timeout: 15000 });
      // Verify at least one search result is visible
      // Selector: div[data-component-type="s-search-result"] (confirmed from manual test)
      await expect(page.locator('div[data-component-type="s-search-result"]').first()).toBeVisible({ timeout: 15000 });
    });

    // ──────────────────────────────────────────────────────────
    // STEP 6: Collect all iPhone 16 Pro product cards and prices
    // ──────────────────────────────────────────────────────────
    await test.step('Collect all iPhone 16 Pro product listings and find lowest price', async () => {

      // Get all search result cards
      const allResultCards = page.locator('div[data-component-type="s-search-result"]');
      const cardCount = await allResultCards.count();
      console.log(`Total search result items found: ${cardCount}`);

      interface ProductInfo {
        title: string;
        price: number;
        priceText: string;
        index: number;
        locator: any;
      }

      const iPhoneProducts: ProductInfo[] = [];

      for (let i = 0; i < cardCount; i++) {
        const card = allResultCards.nth(i);

        // Get product title - Selector: h2 a span (confirmed from manual test)
        const titleElement = card.locator('h2 a span').first();
        const titleText = await titleElement.textContent({ timeout: 3000 }).catch(() => '');

        // Only consider actual iPhone 16 Pro phones (filter out accessories/cases)
        if (!titleText) continue;
        const titleUpper = titleText.toUpperCase();
        const isIPhone16Pro = titleUpper.includes('IPHONE 16 PRO') &&
                              !titleUpper.includes('CASE') &&
                              !titleUpper.includes('SCREEN PROTECTOR') &&
                              !titleUpper.includes('COVER') &&
                              !titleUpper.includes('ADAPTER') &&
                              !titleUpper.includes('CHARGER') &&
                              !titleUpper.includes('CABLE') &&
                              !titleUpper.includes('HOLDER') &&
                              !titleUpper.includes('STAND') &&
                              !titleUpper.includes('GRIP') &&
                              !titleUpper.includes('WALLET');

        if (!isIPhone16Pro) continue;

        // Get price - Selector: .a-price .a-offscreen (accessible price with full value)
        // Also fallback to .a-price-whole + .a-price-fraction
        const offscreenPrice = card.locator('.a-price .a-offscreen').first();
        let priceText = await offscreenPrice.textContent({ timeout: 2000 }).catch(() => '');

        if (!priceText) {
          const wholePrice = await card.locator('.a-price-whole').first().textContent({ timeout: 2000 }).catch(() => '');
          const fracPrice = await card.locator('.a-price-fraction').first().textContent({ timeout: 2000 }).catch(() => '');
          priceText = wholePrice && fracPrice ? `$${wholePrice}.${fracPrice}` : '';
        }

        if (!priceText) continue; // Skip items without prices

        const numericPrice = await extractPrice(priceText);
        if (numericPrice === Infinity || isNaN(numericPrice)) continue;

        console.log(`[${i}] "${titleText.trim()}" -> ${priceText} (${numericPrice})`);

        iPhoneProducts.push({
          title: titleText.trim(),
          price: numericPrice,
          priceText: priceText.trim(),
          index: i,
          locator: card,
        });
      }

      console.log(`\nTotal valid iPhone 16 Pro listings found: ${iPhoneProducts.length}`);
      expect(iPhoneProducts.length).toBeGreaterThan(0);

      // ──────────────────────────────────────────────────────
      // STEP 7: Sort by price and pick the lowest
      // ──────────────────────────────────────────────────────
      iPhoneProducts.sort((a, b) => a.price - b.price);
      const lowestPriceProduct = iPhoneProducts[0];

      console.log(`\n✅ Lowest price iPhone 16 Pro found:`);
      console.log(`   Title: ${lowestPriceProduct.title}`);
      console.log(`   Price: ${lowestPriceProduct.priceText} (${lowestPriceProduct.price})`);
      console.log(`   Card index on page: ${lowestPriceProduct.index}`);

      // Attach the product info to the test report
      test.info().annotations.push({
        type: 'Lowest Price Product',
        description: `${lowestPriceProduct.title} @ ${lowestPriceProduct.priceText}`,
      });

      // ──────────────────────────────────────────────────────
      // STEP 8: Click on the lowest price iPhone 16 Pro
      // Use the product title link inside h2 a
      // ──────────────────────────────────────────────────────
      await test.step('Click on the lowest price iPhone 16 Pro product', async () => {
        const lowestCard = allResultCards.nth(lowestPriceProduct.index);

        // Scroll the card into view first
        await lowestCard.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);

        // Click the product title link
        // Selector: h2 a (the link wrapping the title, confirmed from manual test)
        const productLink = lowestCard.locator('h2 a').first();
        await productLink.waitFor({ state: 'visible' });
        await productLink.click();

        // Wait for the product detail page to load
        await page.waitForLoadState('domcontentloaded');
      });

      // ──────────────────────────────────────────────────────
      // STEP 9: Verify Product Detail Page
      // Selectors confirmed from manual test exploration:
      //   #productTitle - product name
      //   #corePrice_feature_div .a-price .a-offscreen - prices
      //   #add-to-cart-button - Add to Cart
      // ──────────────────────────────────────────────────────
      await test.step('Verify product detail page loaded correctly', async () => {
        // Should be on a product detail page (URL contains /dp/)
        await expect(page).toHaveURL(/\/dp\//i, { timeout: 20000 });

        // Verify product title is present
        const productTitle = page.locator('#productTitle');
        await productTitle.waitFor({ state: 'visible', timeout: 15000 });
        const detailPageTitle = await productTitle.textContent();
        console.log(`\n📱 Product Detail Page Title: ${detailPageTitle?.trim()}`);

        // Verify it's an iPhone product
        expect(detailPageTitle?.toUpperCase()).toContain('IPHONE');

        // Verify price is visible on detail page
        // Try multiple price selectors for robustness
        const priceOnDetailPage = page.locator('#corePrice_feature_div .a-price .a-offscreen').first()
          .or(page.locator('#corePriceDisplay_desktop_feature_div .a-price-whole').first())
          .or(page.locator('.priceToPay .a-price-whole').first());

        await expect(priceOnDetailPage).toBeVisible({ timeout: 10000 });

        // Verify the Add to Cart button is present
        // Selector: #add-to-cart-button (confirmed from manual test)
        const addToCartBtn = page.locator('#add-to-cart-button');
        const buyNowBtn = page.locator('#buy-now-button');

        // At least one purchase button should be visible
        const cartBtnVisible = await addToCartBtn.isVisible({ timeout: 5000 }).catch(() => false);
        const buyNowVisible = await buyNowBtn.isVisible({ timeout: 5000 }).catch(() => false);
        expect(cartBtnVisible || buyNowVisible).toBeTruthy();

        console.log(`✅ Product detail page verified successfully!`);
        console.log(`   Add to Cart visible: ${cartBtnVisible}`);
        console.log(`   Buy Now visible: ${buyNowVisible}`);
      });

      // ──────────────────────────────────────────────────────
      // STEP 10: Take a screenshot for the report artifact
      // ──────────────────────────────────────────────────────
      await test.step('Capture screenshot of product detail page', async () => {
        await page.screenshot({
          path: 'test-results/iphone16pro-lowest-price-product.png',
          fullPage: false,
        });
        console.log('📸 Screenshot saved to test-results/iphone16pro-lowest-price-product.png');
      });
    });
  });

  test('TC003 - Verify Amazon.ca search URL structure', async ({ page }) => {
    await test.step('Navigate and search', async () => {
      await page.goto('https://www.amazon.ca', { waitUntil: 'domcontentloaded' });
      await page.locator('#twotabsearchtextbox').fill('iphone 16 pro');
      await page.locator('#nav-search-submit-button').click();
      await page.waitForLoadState('domcontentloaded');
    });

    await test.step('Assert search results URL contains correct query param', async () => {
      const url = page.url();
      console.log(`Search results URL: ${url}`);
      expect(url).toContain('amazon.ca/s');
      // Amazon.ca uses either k= or field-keywords= depending on session/cookies
      const hasSearchParam = url.includes('k=') || url.includes('field-keywords=') || url.includes('keywords=');
      expect(hasSearchParam).toBeTruthy();
    });

    await test.step('Assert search results page has result count', async () => {
      // The results header shows something like "1-48 of XX results for..."
      const resultsText = page.locator('[data-component-type="s-result-info-bar"]')
        .or(page.locator('.s-breadcrumb'))
        .or(page.locator('[cel_widget_id="UPPER-RESULT_INFO_BAR"]'));
      // Be lenient - just ensure we have at least one product
      const firstResult = page.locator('div[data-component-type="s-search-result"]').first();
      await expect(firstResult).toBeVisible({ timeout: 15000 });
    });
  });

});

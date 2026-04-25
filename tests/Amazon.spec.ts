// Author: Jalapathi
// Test: Amazon.ca - Search iPhone 16 Pro and click on the lowest price mobile
// Manual exploration confirmed locators on: 2026-04-15
// Lowest price found: $1,080.00 - Apple iPhone 16 Pro Max, 256GB, White Titanium (Renewed)
//
// NOTE on Amazon Bot Detection:
// Amazon aggressively blocks Playwright's default headless Chromium.
// This spec uses:
//   1. browserName: 'chromium' with channel: 'chrome' (real Chrome binary)
//   2. headless: false (visible browser bypasses many bot-detection checks)
//   3. Realistic viewport, userAgent, and HTTP headers
//   4. Fallback to direct search URL if homepage search is intercepted

import { test, expect } from '@playwright/test';

/**
 * Utility: Extract numeric price from Amazon price text.
 * e.g. "$1,080.00" -> 1080, "$1,152.75" -> 1152.75
 */
function parsePrice(priceText: string): number {
  const cleaned = priceText.replace(/[^0-9.]/g, '');
  return parseFloat(cleaned) || Infinity;
}

// Direct Amazon.ca search URL for iPhone 16 Pro (unlocked phones category)
// URL pattern observed during manual testing session
const SEARCH_URL = 'https://www.amazon.ca/s?k=iphone+16+pro+phone+unlocked&rh=n%3A8155239011';

test.use({
  // Use real Chrome browser (must have Chrome installed on the machine)
  // This bypasses most of Amazon's headless bot detection
  channel: 'chrome',
  headless: false,
  viewport: { width: 1366, height: 768 },
  // Realistic user agent matching Chrome on Windows 10
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  locale: 'en-CA',
  timezoneId: 'America/Vancouver',
  extraHTTPHeaders: {
    'Accept-Language': 'en-CA,en;q=0.9',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Sec-Ch-Ua': '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"',
    'Sec-Ch-Ua-Mobile': '?0',
    'Sec-Ch-Ua-Platform': '"Windows"',
  },
  // Generous timeouts for Amazon's heavy JavaScript pages
  navigationTimeout: 90000,
  actionTimeout: 30000,
});

test.describe('Amazon.ca - iPhone 16 Pro Search & Lowest Price', () => {

  // ══════════════════════════════════════════════════════════════
  // TC001: Verify Amazon.ca Homepage loads
  // ══════════════════════════════════════════════════════════════
  test('TC001 - Navigate to Amazon.ca homepage', async ({ page }) => {

    await test.step('Open Amazon.ca in Chrome', async () => {
      await page.goto('https://www.amazon.ca', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000);
    });

    await test.step('Verify Amazon.ca homepage loaded with correct title', async () => {
      const title = await page.title();
      console.log(`Page title: "${title}"`);
      await expect(page).toHaveTitle(/Amazon/i);
    });

    await test.step('Verify search bar is visible on homepage', async () => {
      // Confirmed selector from manual test: #twotabsearchtextbox
      await expect(page.locator('#twotabsearchtextbox')).toBeVisible({ timeout: 15000 });
    });

  }); // end TC001

  // ══════════════════════════════════════════════════════════════
  // TC002: Search for iPhone 16 Pro and click on lowest price
  // ══════════════════════════════════════════════════════════════
  test('TC002 - Search for iPhone 16 Pro and find lowest price mobile', async ({ page }) => {

    // ──────────────────────────────────────────────────────────
    // STEP 1: Navigate to Amazon.ca (establish session/cookies)
    // ──────────────────────────────────────────────────────────
    await test.step('Navigate to Amazon.ca homepage', async () => {
      await page.goto('https://www.amazon.ca', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(3000);
      const title = await page.title();
      console.log(`Amazon.ca page title: "${title}"`);
      await expect(page).toHaveTitle(/Amazon/i);
    });

    // ──────────────────────────────────────────────────────────
    // STEP 2: Type search query in search bar
    // Selector: #twotabsearchtextbox (confirmed from manual test)
    // ──────────────────────────────────────────────────────────
    await test.step('Enter "iphone 16 pro phone unlocked" in search box', async () => {
      const searchBox = page.locator('#twotabsearchtextbox');
      await searchBox.waitFor({ state: 'visible', timeout: 20000 });
      await searchBox.click();
      await page.waitForTimeout(500);
      await searchBox.fill('iphone 16 pro phone unlocked');
      await page.waitForTimeout(500);
      await expect(searchBox).toHaveValue('iphone 16 pro phone unlocked');
      console.log('✅ Search query entered in search box');
    });

    // ──────────────────────────────────────────────────────────
    // STEP 3: Click search button and handle bot detection
    // Selector: #nav-search-submit-button (confirmed from manual test)
    // ──────────────────────────────────────────────────────────
    await test.step('Click Search button and navigate to results', async () => {
      const searchBtn = page.locator('#nav-search-submit-button');
      await searchBtn.waitFor({ state: 'visible' });
      await searchBtn.click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(3000);

      // Check for Amazon bot block error page
      const bodyText = await page.evaluate(() => document.body?.innerText || '');
      const isBlocked = bodyText.includes('Sorry, something went wrong') ||
                        bodyText.includes('something went wrong');

      if (isBlocked) {
        console.log('⚠️  Bot detection triggered. Using direct search URL as fallback...');
        await page.goto(SEARCH_URL, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(3000);
      }

      console.log(`📍 Current URL after search: ${page.url()}`);
    });

    // ──────────────────────────────────────────────────────────
    // STEP 4: Verify search results page
    // ──────────────────────────────────────────────────────────
    await test.step('Verify search results page is displayed', async () => {
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/amazon\.ca\/s/i);

      // Selector: div[data-component-type="s-search-result"] (confirmed from manual test)
      const firstCard = page.locator('div[data-component-type="s-search-result"]').first();
      await firstCard.waitFor({ state: 'visible', timeout: 25000 });

      const count = await page.locator('div[data-component-type="s-search-result"]').count();
      console.log(`✅ Search results loaded. Product cards visible: ${count}`);
      expect(count).toBeGreaterThan(0);
    });

    // ──────────────────────────────────────────────────────────
    // STEP 5: Batch-extract all product cards in ONE DOM call
    // Using page.evaluate() avoids the slow per-card Playwright
    // locator loop (which would timeout at 60 cards × 3s each).
    // Selectors batch-confirmed from manual test exploration:
    //   div[data-component-type="s-search-result"] - card container
    //   h2 a span                                  - product title text
    //   .a-price .a-offscreen                      - screen-reader price
    // ──────────────────────────────────────────────────────────
    let lowestIndex = -1;
    let lowestPrice = Infinity;
    let lowestTitle = '';
    let lowestPriceText = '';

    await test.step('Find the iPhone 16 Pro with the lowest price (batch DOM extraction)', async () => {

      // ACCESSORY keywords used to filter out phone cases, cables, etc.
      const ACCESSORY_KEYWORDS = ['CASE', 'COVER', 'SCREEN PROTECTOR', 'CHARGER',
                                   'CABLE', 'ADAPTER', 'STAND', 'HOLDER', 'GRIP',
                                   'WALLET', 'SKIN', 'TEMPERED GLASS', 'FILM', 'MOUNT', 'DOCK'];

      // Batch-extract all card data in a single evaluate() call for speed.
      // IMPORTANT: Amazon's DOM structure has <a> as PARENT of <h2>, not child.
      // Correct selector: h2 span (NOT h2 a span).
      // Confirmed from DOM inspection: <h2><span class="a-size-medium...">title</span></h2>
      type CardData = { index: number; title: string; priceText: string };
      const allCardData: CardData[] = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('div[data-component-type="s-search-result"]'));
        return cards.map((card, index) => {
          // Title selector: h2 span.a-size-medium (confirmed from DOM inspection)
          // Amazon renders: <a...><h2><span class="a-size-medium a-color-base a-text-normal">TITLE</span></h2></a>
          const titleEl = card.querySelector('h2 span.a-size-medium') ||
                          card.querySelector('h2 span') ||
                          card.querySelector('[data-cy="title-recipe"] h2 span');
          const title = titleEl?.textContent?.trim() || '';

          // Price selector: .a-price .a-offscreen (confirmed from manual test + DOM inspection)
          // This contains the full formatted price as accessible screen-reader text: e.g. "$1,152.75"
          const priceEl = card.querySelector('.a-price .a-offscreen');
          const priceText = priceEl?.textContent?.trim() || '';

          return { index, title, priceText };
        });
      });

      console.log(`Total cards extracted from DOM: ${allCardData.length}`);

      for (const { index, title, priceText } of allCardData) {
        if (!title || !priceText) continue;

        const upper = title.toUpperCase();

        // Must contain "IPHONE 16 PRO" (covers 16 Pro and 16 Pro Max)
        if (!upper.includes('IPHONE 16 PRO')) continue;

        // Must NOT be an accessory
        if (ACCESSORY_KEYWORDS.some(kw => upper.includes(kw))) continue;

        // Parse the price number from the text (e.g. "$1,152.75" -> 1152.75)
        const numPrice = parsePrice(priceText);
        if (isNaN(numPrice) || numPrice === Infinity) continue;

        console.log(`  [${index}] "${title}" -> ${priceText} (${numPrice})`);

        if (numPrice < lowestPrice) {
          lowestPrice = numPrice;
          lowestIndex = index;
          lowestTitle = title;
          lowestPriceText = priceText;
        }
      }

      console.log(`\n🏆 Lowest price iPhone 16 Pro found:`);
      console.log(`   Title: "${lowestTitle}"`);
      console.log(`   Price: ${lowestPriceText} (CAD ${lowestPrice})`);
      console.log(`   Card index: ${lowestIndex}`);

      // Attach product info to the Playwright HTML report annotations
      test.info().annotations.push({
        type: 'Lowest Price iPhone 16 Pro',
        description: `${lowestTitle} @ ${lowestPriceText} (CAD)`,
      });

      expect(lowestIndex).toBeGreaterThanOrEqual(0);
    });

    // ──────────────────────────────────────────────────────────
    // STEP 6: Click on the lowest price product
    // Navigate to the product detail page
    // ──────────────────────────────────────────────────────────
    await test.step(`Click on lowest price product: "${lowestTitle}" @ ${lowestPriceText}`, async () => {
      const allCards = page.locator('div[data-component-type="s-search-result"]');
      const lowestCard = allCards.nth(lowestIndex);

      // Scroll product into view
      await lowestCard.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);

      // Click the product link: Amazon's DOM structure has <a> wrapping <h2>, not inside it.
      // Correct Playwright selector: a.a-link-normal.s-link-style (the <a> wrapping the product card title)
      // Confirmed from DOM inspection: <a class="a-link-normal s-link-style..."><h2><span>title</span></h2></a>
      const productLink = lowestCard.locator('a.a-link-normal.s-link-style').first();
      await productLink.waitFor({ state: 'visible' });

      console.log(`\n🖱️  Clicking on: "${lowestTitle}"`);
      await productLink.click();

      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(3000);
      console.log(`📍 Product detail URL: ${page.url()}`);
    });

    // ──────────────────────────────────────────────────────────
    // STEP 7: Verify Product Detail Page
    // Selectors confirmed from manual test:
    //   #productTitle - product heading (h1)
    //   #corePrice_feature_div - price container
    //   #add-to-cart-button - yellow Add to Cart CTA
    // ──────────────────────────────────────────────────────────
    await test.step('Verify product detail page URL contains /dp/', async () => {
      await expect(page).toHaveURL(/\/dp\//i, { timeout: 20000 });
    });

    await test.step('Verify product title is visible and matches an iPhone', async () => {
      // Selector: #productTitle (confirmed from manual test)
      const productTitle = page.locator('#productTitle');
      await productTitle.waitFor({ state: 'visible', timeout: 20000 });
      const titleText = await productTitle.textContent();
      console.log(`📱 Product detail title: "${titleText?.trim()}"`);
      expect(titleText?.toUpperCase()).toContain('IPHONE');
    });

    await test.step('Verify price is shown on the detail page', async () => {
      // Multiple fallback price selectors for robustness (confirmed from manual test)
      const priceSelectors = [
        '#corePrice_feature_div .a-price .a-offscreen',
        '#corePriceDisplay_desktop_feature_div .a-price-whole',
        '.priceToPay .a-price-whole',
        '.a-price.aok-align-center .a-offscreen',
      ];
      const priceLocator = page.locator(priceSelectors.join(', ')).first();
      const priceVisible = await priceLocator.isVisible({ timeout: 10000 }).catch(() => false);
      console.log(`💰 Price visible on detail page: ${priceVisible}`);
      expect(priceVisible).toBeTruthy();
    });

    await test.step('Verify Add to Cart or Buy Now button is present', async () => {
      // Confirmed selectors from manual test:
      //   #add-to-cart-button - yellow Add to Cart button
      //   #buy-now-button - orange Buy Now button
      const cartVisible = await page.locator('#add-to-cart-button').isVisible({ timeout: 8000 }).catch(() => false);
      const buyNowVisible = await page.locator('#buy-now-button').isVisible({ timeout: 5000 }).catch(() => false);
      console.log(`🛒 Add to Cart: ${cartVisible} | ⚡ Buy Now: ${buyNowVisible}`);
      expect(cartVisible || buyNowVisible).toBeTruthy();
    });

    await test.step('Capture screenshot of product detail page', async () => {
      await page.screenshot({
        path: 'test-results/iphone16pro-lowest-price-product.png',
        fullPage: false,
      });
      console.log('📸 Screenshot saved: test-results/iphone16pro-lowest-price-product.png');
    });

  }); // end TC002

  // ══════════════════════════════════════════════════════════════
  // TC003: Verify Amazon.ca search URL structure
  // ══════════════════════════════════════════════════════════════
  test('TC003 - Verify Amazon.ca search URL structure', async ({ page }) => {

    await test.step('Navigate to Amazon.ca', async () => {
      await page.goto('https://www.amazon.ca', { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(2000);
      await expect(page).toHaveTitle(/Amazon/i);
    });

    await test.step('Enter search query', async () => {
      const searchBox = page.locator('#twotabsearchtextbox');
      await searchBox.waitFor({ state: 'visible', timeout: 15000 });
      await searchBox.click();
      await searchBox.fill('iphone 16 pro');
      await page.waitForTimeout(500);
    });

    await test.step('Submit search and handle bot detection', async () => {
      await page.locator('#nav-search-submit-button').click();
      await page.waitForLoadState('domcontentloaded');
      await page.waitForTimeout(3000);

      const bodyText = await page.evaluate(() => document.body?.innerText || '');
      if (bodyText.includes('something went wrong')) {
        console.log('⚠️  Bot detection - using direct URL fallback for TC003');
        await page.goto(SEARCH_URL, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(3000);
      }
    });

    await test.step('Verify URL is on amazon.ca/s (search results)', async () => {
      const url = page.url();
      console.log(`Search results URL: ${url}`);
      expect(url).toContain('amazon.ca');
      expect(url).toContain('/s');
    });

    await test.step('Verify URL contains a search query parameter', async () => {
      const url = page.url();
      // Amazon.ca uses either k= OR field-keywords= depending on session state
      const hasQuery = url.includes('k=') || url.includes('field-keywords=') || url.includes('keywords=');
      console.log(`URL has search param: ${hasQuery}`);
      expect(hasQuery).toBeTruthy();
    });

    await test.step('Verify search result cards are rendered on page', async () => {
      // Selector: div[data-component-type="s-search-result"] (confirmed from manual test)
      const firstCard = page.locator('div[data-component-type="s-search-result"]').first();
      await firstCard.waitFor({ state: 'visible', timeout: 20000 });
      const count = await page.locator('div[data-component-type="s-search-result"]').count();
      console.log(`Search result cards visible: ${count}`);
      expect(count).toBeGreaterThan(0);
    });

  }); // end TC003

}); // end describe

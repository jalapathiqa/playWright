import { test, expect, Browser, BrowserContext, Page, chromium } from "@playwright/test";
test('two browsers', async () => {
    const browser = chromium.launch()
    const context = browser.newContext()

    const page = context.newPage()

    const page1 = context.newPage()
    await page.goto('https://www.google.com')
    await page1.goto('https://www.facebook.com')

})


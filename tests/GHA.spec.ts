import { test, expect } from "@playwright/test";

test("GHA", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/login");
    await page.locator("#username").fill("tomsmith");
    await page.locator("#password").fill("SuperSecretPassword!");
    await page.locator("#login").click();
    await expect(page).toHaveURL("https://the-internet.herokuapp.com/login");
});
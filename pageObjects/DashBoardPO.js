import { test, expect } from '@playwright/test';
class DashBoardPO {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.cart = page.locator("button[routerlink*='cart']");
        this.myOrders = page.locator("button[routerlink*='myorders']");
        this.productsText = page.locator(".card-body b");
    }
    async gotoMyOrders() {
        await this.myOrders.click();
    }

    async getProductCount() {
        return await this.products.count();
    }

    async getProductNames() {
        return await this.productsText.allTextContents();
    }

    async searchProduct(productName) {
        const title = this.page.locator(".card-body b");
        await title.first().waitFor();
        console.log(await title.allTextContents());
        const count = await title.count();
        console.log(count);
        for (let i = 0; i < count; i++) {
            if ((await title.nth(i).textContent()).trim() === productName) {
                await title.nth(i).locator("button").click();
                break;
            }
        }
    }

    async addToCart(productName) {
        const product = this.page.locator(".card-body").filter({ hasText: productName });
        await product.locator("button").filter({ hasText: "Add To Cart" }).click();
    }
}
module.exports = { DashBoardPO };
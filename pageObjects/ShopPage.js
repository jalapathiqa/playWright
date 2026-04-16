class ShopPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productTitle = page.locator(".card-title a");
    }

    async getProductTitles() {
        return await this.productTitle.allTextContents();
    }

    async verifyProductIsPresent(productName) {
        const titles = await this.getProductTitles();
        return titles.includes(productName);
    }
}
module.exports = { ShopPage };

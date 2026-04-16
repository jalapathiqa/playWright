const { LoginPage } = require("./LoginPage");
const { DashBoardPO } = require("./DashBoardPO");
const { LoginPagePractise } = require("./LoginPagePractise");
const { ShopPage } = require("./ShopPage");

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashBoardPO = new DashBoardPO(page);
        this.loginPagePractise = new LoginPagePractise(page);
        this.shopPage = new ShopPage(page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getDashBoardPO() {
        return this.dashBoardPO;
    }
    getLoginPagePractise() {
        return this.loginPagePractise;
    }
    getShopPage() {
        return this.shopPage;
    }
}
module.exports = { POManager };
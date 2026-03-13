const { LoginPage } = require("./LoginPage");
const { DashBoardPO } = require("./DashBoardPO");

class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashBoardPO = new DashBoardPO(page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getDashBoardPO() {
        return this.dashBoardPO;
    }
}
module.exports = { POManager };
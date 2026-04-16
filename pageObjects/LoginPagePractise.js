class LoginPagePractise {
    constructor(page) {
        this.page = page;
        this.userName = page.locator("input#username");
        this.password = page.locator("input#password");
        this.terms = page.locator("input#terms");
        this.signInBtn = page.locator("input#signInBtn");
    }

    async goTo() {
        await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    }

    async login(userName, password) {
        await this.userName.fill(userName);
        await this.password.fill(password);
        await this.terms.check();
        await this.signInBtn.click();
    }
}
module.exports = { LoginPagePractise };

const { expect } = require("@playwright/test")

class LoginPage {
    constructor(page) {
        this.page = page
        this.userName = "//input[@placeholder='Enter Email']"
        this.password = "//input[@placeholder='Enter Password']"
        this.login = " //button[normalize-space()='Sign in']"
    }
    async verifyLoginPage() {
        await expect(this.page.locator("//h2[normalize-space()='Sign In']")).toBeVisible()
    }

    async loginToApplication(email, password) {
        await this.page.fill(this.userName, email)
        await this.page.fill(this.password, password)
        await this.page.click(this.login)
    }
}
module.exports = LoginPage
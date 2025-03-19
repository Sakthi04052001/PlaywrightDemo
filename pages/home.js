const { expect } = require("@playwright/test")

class HomePage {
    constructor(page) {
        this.page = page
        this.menu = "//img[@alt='menu']"
        this.signout = "//button[normalize-space()='Sign out']"
    }
    async verifyHomePage() {
        await expect(this.page.locator(" //span[normalize-space()='Manage']")).toBeVisible()
    }

    async logoutFromApplicattion(email, password) {
        await this.page.click(this.menu)
        await this.page.click(this.signout)
    }
}
module.exports = HomePage
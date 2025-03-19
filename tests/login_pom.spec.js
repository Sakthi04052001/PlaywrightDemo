const { test, expect } = require("@playwright/test")
const LoginPage = require("../pages/login")
const HomePage = require("../pages/home")

test("Verify the login", async ({ page }) => {
    await page.goto("https://freelance-learn-automation.vercel.app/login");
    let Login = new LoginPage(page)
    await Login.loginToApplication("admin@email.com", "admin@123")
    let Home = new HomePage(page)
    await Home.verifyHomePage()
    await Home.logoutFromApplicattion()
    await Login.verifyLoginPage()
})
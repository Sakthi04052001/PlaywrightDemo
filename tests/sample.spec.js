const { test, expect } = require("@playwright/test")
test("Verify Application Title", async ({ page }) => {
    await page.goto("https://www.google.co.in/")
    console.log(page.viewportSize().width)
    console.log(page.viewportSize().height)
    await expect(page).toHaveTitle("Google")
}) 
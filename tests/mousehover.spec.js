const { test, expect } = require("@playwright/test")

test("Perform Mouse Hover", async ({ page }) => {
    await page.goto("https://www.flipkart.com/")
    await page.locator('//span[text()="Two Wheelers"]').hover()
    await page.waitForTimeout(1000)
    await page.locator('//a[text()="Petrol Vehicles"]').click()
    await page.waitForTimeout(1000)

})
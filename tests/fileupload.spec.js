const { test, expect } = require("@playwright/test")

test("File Upload", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/upload")
    await page.locator("#file-upload").setInputFiles("./uploads/Profile.jpg")
    await page.locator("#file-submit").click()
    await expect(page.locator("h3")).toHaveText("File Uploaded!")

})
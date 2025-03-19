const { test, expect } = require("@playwright/test")
test("keyboard methods", async ({ page }) => {
    await page.goto("https://www.google.co.in/")
    await page.locator("//textarea[@name='q']").type("Sakthivel A")
    await page.keyboard.press("Control+A")
    await page.keyboard.press("Backspace")
    await page.keyboard.type("Naveen Kumar!")
    await page.keyboard.down("Shift")
    await page.keyboard.down("Control")
    for (let i = 0; i < "Kumar!".length; i++) {

        await page.keyboard.press("ArrowLeft")
    }
    await page.keyboard.up("Shift")
    await page.keyboard.up("Control")
    await page.keyboard.press("Backspace")

    await page.waitForTimeout(1000)
    // await page.keyboard.press("Enter")

})
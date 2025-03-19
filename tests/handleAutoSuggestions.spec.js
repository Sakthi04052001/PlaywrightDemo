const { test, expect } = require("@playwright/test")
test("Handling the auto suggestions with keyboard", async ({ page }) => {
    await page.goto("https://www.google.co.in/")
    await page.locator("//textarea[@name='q']").type("svelte")
    await page.waitForSelector("//li[@role='presentation']")
    await page.keyboard.press("ArrowDown")
    await page.waitForTimeout(1000)
    await page.keyboard.press("ArrowDown")
    await page.waitForTimeout(1000)
    await page.keyboard.press("Enter")

})


test("Handling the auto suggestions without keyboard method", async ({ page }) => {
    await page.goto("https://www.google.co.in/")
    await page.locator("//textarea[@name='q']").type("playwright")

    await page.waitForSelector("//li[@role='presentation']")
    await page.waitForTimeout(1000)
    let elements = await page.$$("//li[@role='presentation']")
    for (let i = 0; i < elements.length; i++) {
        let text = await elements[i].textContent()
        if (text.includes("playwright automation")) {
            console.log("clicked");
            elements[i].click
            break
        }
    }



})
const { test, expect } = require("@playwright/test");

test("waitForLoadState", async ({ page }) => {
    await page.goto("https://freelance-learn-automation.vercel.app/login")
    await page.getByText("New user? Signup").click()
    await page.waitForLoadState('networkidle')
    let count = await page.locator(" //input[@type='checkbox']").count()
    expect(count).toBe(2)

})
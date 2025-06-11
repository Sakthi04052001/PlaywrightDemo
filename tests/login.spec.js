const { test, expect } = require("@playwright/test")

test("Verify the login", async ({ page }) => {
    await page.goto("https://test.app.print2block.in/");

    await page.locator('[placeholder="Enter your email"]').fill("test@email.com");
    await page.locator('[placeholder="Enter your password"]').fill("NewPass@12345");

    await page.locator("button:text('Login')").click()

    await expect(page).toHaveURL(/analytics/);

    await page.locator('button:has(.fa-right-from-bracket)').click();
    await expect(page).toHaveURL("https://test.app.print2block.in/#/");

});

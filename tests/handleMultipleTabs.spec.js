const { test, expect } = require("@playwright/test")
test("Handle Alert", async ({ browser }) => {
    let context = await browser.newContext()
    let page = await context.newPage()
    await page.goto("https://freelance-learn-automation.vercel.app/login")
    const [newPage] = await Promise.all([
        context.waitForEvent("page"),
        page.locator('//a[contains(@href,"linkedin")]').first().click()
    ])
    await newPage.getByRole("button", { name: "Sign in" }).click()
    await newPage.close()
    await page.getByPlaceholder("Enter Email").type("sakthi@email.com")
    await page.waitForTimeout(3000)
})

test('Chat App Test', async ({ browser }) => {
    const contextA = await browser.newContext(); // User A's session
    const contextB = await browser.newContext(); // User B's session

    const pageA = await contextA.newPage();
    const pageB = await contextB.newPage();

    await pageA.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    await pageA.waitForTimeout(3000)
    await pageB.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
    await pageA.waitForTimeout(3000)



});

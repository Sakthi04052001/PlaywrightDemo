const { test, expect } = require("@playwright/test")
test("Handle Alert", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("alert")
        await dialog.accept()
        expect(dialog.message()).toContain("I am a JS Aler")
    })
    await page.getByRole("button", { name: "Click for JS Alert" }).click()


})


test("Handle Confirm", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("confirm")

        expect(dialog.message()).toContain("I am a JS Confirm")
        // //accept the dialog box
        // await dialog.accept()
        //cancel the dialog box
        await dialog.dismiss()

    })
    await page.getByRole("button", { name: "Click for JS Confirm" }).click()


})



test("Handle Prompt", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")

    page.on("dialog", async (dialog) => {
        expect(dialog.type()).toContain("prompt")

        expect(dialog.message()).toContain("I am a JS prompt")
        //accept the dialog box
        await dialog.accept("Sakthivel A")
    })
    await page.getByRole("button", { name: "Click for JS Prompt" }).click()
    await page.waitForTimeout(3000)


})
const { test, expect } = require("@playwright/test");

test("Select the dropdown value", async ({ page }) => {
    await page.goto("https://freelance-learn-automation.vercel.app/signup")

    let selectedDropdown = page.locator('//*[@id="state"] [@name="state"]')
    selectedDropdown.selectOption({ label: "Bihar" })
    await page.waitForTimeout(1000)
    selectedDropdown.selectOption({ value: "Meghalaya" })
    await page.waitForTimeout(1000)
    selectedDropdown.selectOption({ index: 6 })
    await page.waitForTimeout(1000)
    let value = await selectedDropdown.inputValue()
    console.log("value", value)
    expect(value).toBe("Goa")
    await expect(selectedDropdown).toHaveValue("Goa")
    let text = await selectedDropdown.textContent()
    expect(text.includes("Kerala")).toBeTruthy()
    let options = await page.locator("//*[text()='State:']/following-sibling::select/option").all()
    console.log(options)
    for (const element of options) {
        console.log(await element.textContent());
    }
})


const { test, expect } = require("@playwright/test")

const testData = JSON.parse(JSON.stringify(require("../testdata.json")));
const testLoginData = JSON.parse(JSON.stringify(require("../testlogin.json")));

test("Read the test data from json file", async ({ page }) => {
    await page.goto("https://freelance-learn-automation.vercel.app/login");
    await page.getByPlaceholder("Enter Email").type(testData.userName)
    await page.getByPlaceholder("Enter Password").type(testData.password)
    await page.waitForTimeout(3000)
})


test.describe("Data driven login test", () => {

    for (let data of testLoginData) {

        test.describe(`Login with users with credential ${data.id}`, () => {

            test("Login the Application", async ({ page }) => {

                await page.goto("https://freelance-learn-automation.vercel.app/login");
                await page.getByPlaceholder("Enter Email").type(testData.userName)
                await page.getByPlaceholder("Enter Password").type(testData.password)

            })
        })
    }

})
const { test, expect } = require("@playwright/test")

const testLoginData = JSON.parse(JSON.stringify(require("../testlogin.json")));


test.describe("Data driven login test", () => {

    for (let data of testLoginData) {

        test.describe(`Login with users with credential ${data.id}`, () => {

            test("Login the Application", async ({ page }) => {

                await page.goto("https://freelance-learn-automation.vercel.app/login");
                await page.getByPlaceholder("Enter Email").type(data.userName)
                await page.getByPlaceholder("Enter Password").type(data.password)

            })
        })
    }

})
const { Given, When, Then, BeforeAll, AfterAll, After } = require("@cucumber/cucumber");
const { chromium, expect } = require("@playwright/test");

let browser;
let page;

BeforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
});

Given("the user is on the login page", async () => {
    await page.goto("https://freelance-learn-automation.vercel.app/login");
});

When("the user enters username {string} and password {string}", async (username, password) => {
    await page.fill("//input[@placeholder='Enter Email']", username);
    await page.fill("//input[@placeholder='Enter Password']", password);
});

When("the user clicks the login button", async () => {
    await page.click("//button[normalize-space()='Sign in']");
});

Then("the user should {string} be redirected to the Dashboard page", async (outcome) => {
    if (outcome === "not") {
        await expect(page.locator("//h2[normalize-space()='Sign In']")).toBeVisible();
    } else {
        await expect(page.locator("//span[normalize-space()='Manage']")).toBeVisible();
    }
});

After(async () => {
    await page.goto("about:blank");
});

AfterAll(async () => {
    await browser.close();
});

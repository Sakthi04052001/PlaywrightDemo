import { reportIssue } from "../script/reportIssue"
const { test, expect } = require("@playwright/test");


test("Check that Random Seed", async ({ page, browser }) => {
    try {
        await page.goto("https://alpha.randum.io/", { waitUntil: "load" });

        const selector = 'div[title="Click me"] p';

        async function getValues() {
            return await page.$$eval(selector, nodes => nodes.map(n => n.innerText));
        }

        let previousValues = await getValues();
        console.log("previousValues", previousValues)


        await page.waitForTimeout(3000);
        const currentValues = await getValues();
        console.log("currentValues", currentValues);

        const hasChanged = currentValues.some((val, i) => val !== previousValues[i]);

        if (hasChanged) {
            console.log('Random Seed Values Not Changed');
            await page.screenshot({ path: "Random_Seed.png" });
            await reportIssue(browser, "Random_Seed.png", "Test", "Dice Game", "Unspecified", ["Karthi", "Gowtham"], "Random Seed values are not Changed");
        }

    } catch (error) {
        console.error("Test failed due to an unexpected error:", error);
        throw error;
    } finally {
        await page.close();
    }
});
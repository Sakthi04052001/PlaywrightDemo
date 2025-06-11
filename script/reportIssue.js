export const reportIssue = async (browser, screenshot, environment, applicationName, severity, assignedTo, description) => {
    try {
        const context = await browser.newContext();
        const issuePage = await context.newPage();
        await issuePage.goto("https://test.app.print2block.in/issuetracker-test/#/login", { waitUntil: "load" });

        // Login
        await issuePage.getByPlaceholder("Enter your email").fill("sakthivel@print2block.com");
        await issuePage.getByPlaceholder("Enter your password").fill("password");
        await Promise.all([
            issuePage.getByRole("button", { name: "Continue" }).click(),
            issuePage.waitForURL(/dashboard/, { timeout: 10000 })
        ]);

        // Create new issue
        await issuePage.getByRole("button", { name: "New Issue" }).click();
        await issuePage.waitForURL(/create-issue/, { timeout: 10000 });

        // Upload screenshot
        await issuePage.locator("input[name='userImage']").setInputFiles(screenshot);

        // Select Environment and Application Name
        await selectDropdown(issuePage, "Select an Environment", environment);
        await selectDropdown(issuePage, "Application Name", applicationName);

        // Ensure Application URL is populated
        await issuePage.waitForFunction(() => document.querySelector("#url")?.value.trim() !== "", null, { timeout: 15000 });

        // Select Severity and Assignee
        await selectDropdown(issuePage, "Severity", severity);
        for (let i = 0; i < assignedTo.length; i++) {
            await selectDropdown(issuePage, "Issue Assigned To", assignedTo[i]);
        }

        // Enter Description
        await issuePage.getByPlaceholder("Description").fill(description);
        // await issuePage.waitForTimeout(5000);

        // Submit issue
        await Promise.all([
            issuePage.getByRole("button", { name: "Add New Task" }).click(),
            issuePage.waitForURL(/my-issues/, { timeout: 10000 })
        ]);

        console.log("Issue reported successfully.");
        await issuePage.close();
    } catch (error) {
        console.error("Error while reporting the issue:", error.message);
    }
}
/**
 * Helper function to select an option from a dropdown
 */
export const selectDropdown = async (page, labelText, optionText) => {
    const dropdownButton = await page.locator(`label:has-text('${labelText}')`).locator("xpath=following-sibling::div").locator("button");
    await dropdownButton.click();
    await page.waitForSelector("ul[tabindex='-1']:not(.hidden)", { timeout: 5000 });
    await page.click(`li:has-text('${optionText}')`);
}

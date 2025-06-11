const { test, expect } = require("@playwright/test");

// test("Verify that decryption fails when the decryption time is not reached", async ({ page, browser }) => {
//     try {
//         await page.goto("https://demo.app.print2block.in/timelock/#/", { waitUntil: "domcontentloaded" });

//         // Verify Encrypt button exists before clicking
//         const encryptButton = page.getByRole("button", { name: "Encrypt" });
//         await expect(encryptButton).toBeVisible();
//         await encryptButton.click();

//         // Validate redirection
//         await expect(page).toHaveURL("https://demo.app.print2block.in/timelock/#/encrypt", { timeout: 5000 });

//         // Verify input field before typing
//         const textInput = page.getByPlaceholder("Type something here");
//         await expect(textInput).toBeVisible();
//         await textInput.fill("Testing the encryption");


//         // Get current local time and add 2 minutes
//         const now = new Date();
//         now.setMinutes(now.getMinutes() + 1); // Add 2 minutes

//         // Convert to local datetime format (YYYY-MM-DDTHH:mm)
//         const formattedTime = now.getFullYear() +
//             "-" + String(now.getMonth() + 1).padStart(2, "0") +
//             "-" + String(now.getDate()).padStart(2, "0") +
//             "T" + String(now.getHours()).padStart(2, "0") +
//             ":" + String(now.getMinutes()).padStart(2, "0");

//         console.log("formattedTime", formattedTime); // Debugging

//         // Verify datetime input before setting value
//         const dateTimeInput = page.locator("input[type='datetime-local']");
//         await expect(dateTimeInput).toBeVisible();
//         await dateTimeInput.fill(formattedTime);

//         // Click Encrypt button and validate redirection
//         const encryptTextButton = page.getByRole("button", { name: "Enycrypt Text" });
//         await expect(encryptTextButton).toBeVisible();
//         await encryptTextButton.click();
//         await expect(page).toHaveURL(/\/encrypted$/, { timeout: 5000 });

//         // Verify encrypted text area is visible
//         const encryptedTextArea = page.locator("textarea");
//         await expect(encryptedTextArea).toBeVisible();

//         // Start file download and wait for it
//         const [download] = await Promise.all([
//             page.waitForEvent("download"),
//             page.getByRole("button", { name: "Download File" }).click()
//         ]);

//         // Ensure file is downloaded successfully
//         const downloadPath = await download.path();
//         if (!downloadPath) throw new Error("❌ File download failed");
//         console.log("✅ File downloaded:", downloadPath);

//         // Navigate to Decrypt page
//         const decryptButton = page.getByRole("button", { name: "Decrypt" });
//         await expect(decryptButton).toBeVisible();
//         await decryptButton.click();
//         await expect(page).toHaveURL(/\/decrypt$/, { timeout: 5000 });

//         const uploadFileButton = page.getByRole("button", { name: "Upload File" });
//         await expect(uploadFileButton).toBeVisible();
//         await uploadFileButton.click();


//         // Upload the downloaded file
//         const uploadFileInput = page.locator("input[type='file']");
//         await expect(uploadFileInput).toBeVisible();
//         await uploadFileInput.setInputFiles(downloadPath);

//         // Verify upload success message
//         const actualFileName = downloadPath.split("\\").pop();
//         const uploadStatus = page.getByText(`${actualFileName} Successfully uploaded`);
//         await expect(uploadStatus).toBeVisible();

//         // Attempt to decrypt before time has passed
//         await page.getByRole("button", { name: "Decrypt" }).click();




//         try {
//             const errorNotification = page.locator("div.bg-alert-danger h1");
//             await expect(errorNotification).toBeVisible({ timeout: 15000 });
//             await expect(errorNotification).toContainText("Decryption Time not reached yet");

//             console.log("Decryption failed as expected: 'Decryption Time not reached yet'");

//         } catch (error) {
//             console.error("ERROR: Decryption failure message did not appear. Reporting the issue...");
//             // Take a screenshot for debugging
//             const screenshotPath = "decryption_failure_debug.png";
//             await page.screenshot({ path: screenshotPath });
//             // Report the issue in the Issue Tracker app
//             await reportIssue(browser, screenshotPath);
//             // Fail the test explicitly
//             throw new Error("Decryption did NOT fail as expected. Issue reported.");
//         }

//     } catch (error) {
//         console.error("Test failed due to an unexpected error:", error);
//         throw error;
//     }
//     finally {
//         await page.close();
//     }

// });


test("Verify successful decryption after decryption time is reached", async ({ page, browser }) => {
    try {
        await page.goto("https://demo.app.print2block.in/timelock/#/", { waitUntil: "load" });

        const encryptButton = page.getByRole("button", { name: "Encrypt" });
        await expect(encryptButton).toBeVisible();
        await encryptButton.click();

        await expect(page).toHaveURL(/\/encrypt$/, { timeout: 5000 });

        const inputField = page.getByPlaceholder("Type something here");
        await expect(inputField).toBeVisible();
        await inputField.fill("Testing the encryption");

        //Get current local time and add 2 minutes
        const now = new Date();
        now.setMinutes(now.getMinutes() + 1); // Add 2 minutes

        // Convert to local datetime format (YYYY-MM-DDTHH:mm)
        const formattedTime = now.getFullYear() +
            "-" + String(now.getMonth() + 1).padStart(2, "0") +
            "-" + String(now.getDate()).padStart(2, "0") +
            "T" + String(now.getHours()).padStart(2, "0") +
            ":" + String(now.getMinutes()).padStart(2, "0");

        console.log("formattedTime", formattedTime); // Debugging

        const dateTimeInput = page.locator("input[type='datetime-local']");
        await expect(dateTimeInput).toBeVisible();
        await dateTimeInput.fill(formattedTime);

        const encryptTextButton = page.getByRole("button", { name: "Enycrypt Text" });
        await expect(encryptTextButton).toBeVisible();
        await encryptTextButton.click();

        await expect(page).toHaveURL(/\/encrypted$/, { timeout: 10000 });

        const encryptedTextArea = page.locator("textarea");
        await expect(encryptedTextArea).toBeVisible();

        const copyButton = page.getByRole("button", { name: "Copy text" });
        await expect(copyButton).toBeVisible();
        await copyButton.click();

        const decryptButton = page.getByRole("button", { name: "Decrypt" });
        await expect(decryptButton).toBeVisible();
        await decryptButton.click();

        await expect(page).toHaveURL(/\/decrypt$/, { timeout: 10000 });

        const decryptedTextArea = page.locator("textarea");
        await expect(decryptedTextArea).toBeVisible();
        await decryptedTextArea.click();

        await page.keyboard.press(process.platform === "darwin" ? "Meta+V" : "Control+V");
        await page.waitForTimeout(500);

        await expect(decryptedTextArea).not.toHaveValue("");

        // Wait for decryption time to pass
        await page.waitForTimeout(65000);

        await expect(decryptButton).toBeVisible();
        await decryptButton.click();

        await expect(page).toHaveURL(/\/final$/, { timeout: 15000 });

        const textArea = page.locator("textarea");
        await expect(textArea).toBeVisible();



        const decryptedText = await textArea.inputValue();



        if (decryptedText.trim()) {
            console.error("Decryption failed: No text found in textarea.");
            await page.screenshot({ path: "empty_textarea_issue.png" });
            console.log("Screenshot saved: empty_textarea_issue.png");
            await reportIssue(browser, "empty_textarea_issue.png");
        }

        await expect(decryptedTextArea).not.toHaveValue("");
        await page.close()
    } catch (error) {
        console.error("Test failed due to an unexpected error:", error);
        throw error;
    }
    finally {
        await page.close();
    }
});

const reportIssue = async (browser, screenshot) => {
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
        await selectDropdown(issuePage, "Select an Environment", "Test");
        await selectDropdown(issuePage, "Application Name", "Dice Game");

        // Ensure Application URL is populated
        await issuePage.waitForFunction(() => document.querySelector("#url")?.value.trim() !== "", null, { timeout: 15000 });

        // Select Severity and Assignee
        await selectDropdown(issuePage, "Severity", "Unspecified");
        await selectDropdown(issuePage, "Issue Assigned To", "Gowthaman");
        await selectDropdown(issuePage, "Issue Assigned To", "Karthi");


        // Enter Description
        await issuePage.getByPlaceholder("Description").fill("Unable to decrypt the encrypted text.");

        // Submit issue
        await Promise.all([
            issuePage.getByRole("button", { name: "Add New Task" }).click(),
            issuePage.waitForURL(/dashboard/, { timeout: 10000 })
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
const selectDropdown = async (page, labelText, optionText) => {
    const dropdownButton = page.locator(`label:has-text('${labelText}')`).locator("xpath=following-sibling::div").locator("button");
    await dropdownButton.click();
    await page.waitForSelector("ul[tabindex='-1']:not(.hidden)", { timeout: 5000 });
    await page.click(`li:has-text('${optionText}')`);
}


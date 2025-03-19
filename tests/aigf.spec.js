const { test, expect } = require("@playwright/test");

test("Verify the AIGF badge and check document status", async ({ page, browser }) => {

    await page.goto("https://print2block.com/demo-badge-v2/aigf.html", { waitUntil: "load" });

    // Click on the badge
    await page.getByAltText("p2b-badge").click();

    // Wait for navigation to the document verification page
    await page.waitForURL("**/v2/doc?id=*", { timeout: 5000 });

    // Get the current URL and verify it
    const currentURL = page.url();
    expect(currentURL).toMatch(/^https:\/\/demo\.view\.print2block\.in\/v2\/doc\?id=.*/);
    console.log(`Navigated to: ${currentURL}`);

    // Click the "Verify" button
    await page.getByRole("button", { name: "Verify" }).click();
    console.log("Clicked the Verify button.");

    // Wait for any verification result (ignoring hidden messages)
    const resultSelectors = [
        "#verify-revoked:not(.d-none)",
        "#verify-expired:not(.d-none)",
        "#verify-failed:not(.d-none)",
        "#verify-success:not(.d-none)"
    ];
    const verificationMessage = await page.waitForSelector(resultSelectors.join(", "), { timeout: 10000 });

    // Get the text of the result message
    let resultText = await verificationMessage.textContent();

    // Normalize text (trim and convert to lowercase)
    resultText = resultText.trim().toLowerCase();

    console.log(`Verification result: ${resultText}`);

    // Check if result contains "valid", "invalid", "expired", "revoked", or "failed"
    expect(resultText).toMatch(/(valid|invalid|expired|revoked|failed)/i);




    // if (resultText.includes("expired")) {

    //     await page.screenshot({ path: "expired_document.png" });
    //     console.log("Screenshot taken for expired document.");

    //     const context = await browser.newContext();
    //     const issuePage = await context.newPage();

    //     // Go to your issue tracker (replace with actual URL)
    //     await issuePage.goto("https://test.app.print2block.in/issuetracker-test/#/login", { waitUntil: "load" });

    //     await issuePage.getByPlaceholder("Enter your email").fill("sakthivel@print2block.com")
    //     await issuePage.getByPlaceholder("Enter your password").fill("password")
    //     // Click the "Continue" button and wait for navigation
    //     await Promise.all([
    //         issuePage.getByRole("button", { name: "Continue" }).click(),
    //         issuePage.waitForURL(/dashboard/, { timeout: 10000 })
    //     ]);
    //     await Promise.all([
    //         issuePage.getByRole("button", { name: "New Issue" }).click(),
    //         issuePage.waitForURL(/create-issue/, { timeout: 10000 })
    //     ]);

    //     const fileInput = issuePage.locator("input[name='userImage']");
    //     await fileInput.setInputFiles("expired_document.png");

    //     // Select "Test" environment
    //     const environmentDropdown = issuePage
    //         .locator("label:has-text('Select an Environment')")
    //         .locator("xpath=following-sibling::div")
    //         .locator("button");
    //     await environmentDropdown.click();
    //     await issuePage.waitForSelector("ul[tabindex='-1']:not(.hidden)", { timeout: 5000 });
    //     await issuePage.click("li:has-text('Test')");

    //     await issuePage.waitForSelector("//label[contains(text(), 'Application Name')]", { timeout: 5000 });
    //     // Select "Badge(Emerge50)" Application Name
    //     const applicationNameDropdown = issuePage
    //         .locator("label:has-text('Application Name')")
    //         .locator("xpath=following-sibling::div")
    //         .locator("button");

    //     await applicationNameDropdown.click();
    //     await issuePage.waitForSelector("ul[tabindex='-1']:not(.hidden)", { timeout: 5000 });
    //     await issuePage.click("li:has-text('Badge(Emerge50)')");




    //     await issuePage.waitForSelector("#url", { timeout: 10000 });
    //     // Wait for Application URL field to be populated
    //     await issuePage.waitForFunction(() => {
    //         const input = document.querySelector("#url");
    //         return input && input.value.trim() !== ""; // Ensure the value is not empty
    //     }, null, { timeout: 15000 }); // Adjust timeout as needed


    //     // Set Severity to "High"

    //     const severity = issuePage
    //         .locator("label:has-text('Severity')")
    //         .locator("xpath=following-sibling::div")
    //         .locator("button");

    //     await severity.click();

    //     await issuePage.waitForSelector("ul[tabindex='-1']:not(.hidden)", { timeout: 5000 });

    //     await issuePage.click("li:has-text('Unspecified')");


    //     // Assign the issue to "Karthi"
    //     const issueAssignedTo = issuePage
    //         .locator("label:has-text('Issue Assigned To')")
    //         .locator("xpath=following-sibling::div")
    //         .locator("button");

    //     await issueAssignedTo.click();
    //     // Wait for dropdown options to appear
    //     await issuePage.waitForSelector("ul[tabindex='-1']:not(.hidden)", { timeout: 5000 });
    //     // Select "Production"
    //     await issuePage.click("li:has-text('Gowthaman')");


    //     await issuePage.getByPlaceholder("Description").fill("Check the badge aigf application")

    //     await issuePage.waitForTimeout(5000)

    //     await Promise.all([
    //         issuePage.getByRole("button", { name: "Add New Task" }).click(),
    //         issuePage.waitForURL(/dashboard/)
    //     ])






    // }



    if (resultText.includes("valid")) {

        await page.getByRole("button", { name: "Public Audit Proof" }).click();
        console.log("Public Audit Proof button clicked");

        await page.waitForSelector(".modal-dialog", { timeout: 10000 });
        console.log("Audit Proof modal appeared");

        // Check if the failure message exists
        const auditProofAFailed = await page.evaluate(() => {
            const failureMessage = document.querySelector(".proofa-content p");
            console.log("failureMessage", failureMessage)
            return failureMessage && failureMessage.innerText.includes("Audit Proof A check failed");
        });

        if (!auditProofAFailed) {
            // Click "Verify Merkle proof" button
            await page.getByRole("button", { name: "Verify Merkle proof" }).click();
            console.log("Verify Merkle proof button clicked");

            // Wait for Merkle verification status to appear
            const merkleStatus = await page.waitForSelector(".merkle-alert");

            // Get the text content of the Merkle status
            const merkleText = await merkleStatus.textContent();
            console.log(`Merkle Tree Status: ${merkleText}`);

            if (merkleText.includes("Merkle Tree Failed")) {
                throw new Error("Test stopped: Merkle Tree verification failed");
            }
            expect(merkleText).toContain("Merkle Tree Verified");
        }


        await page.getByRole("button", { name: "Verify Proof B" }).click();
        console.log("Verify Proof B button clicked");



        // Wait until at least one "INTEGRITY VERIFIED" message appears
        await page.waitForSelector(".proofb-checks p.text-success");

        // Re-fetch the elements from the page after waiting
        const integrityResult = await page.evaluate(() => {
            const texts = [...document.querySelectorAll(".proofb-checks p")].map(p => p.innerText);
            return {
                verified: texts.some(text => text.includes("INTEGRITY VERIFIED")),
                failed: texts.some(text => text.includes("INTEGRITY FAILED"))
            };
        });

        // Print verification result
        if (integrityResult.verified) {
            console.log("✅ Proof B: INTEGRITY VERIFIED");
        } else if (integrityResult.failed) {
            console.log("❌ Proof B: INTEGRITY FAILED");
        } else {
            console.log("⚠️ Proof B: Verification result not found");
        }
        if (integrityResult.failed) {
            throw new Error("Test stopped:Proof B INTEGRITY FAILED");
        }

    }


});



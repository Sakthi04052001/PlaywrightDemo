const { test, expect } = require("@playwright/test");

test("Verify the Emerge 50 badge and check document status", async ({ page }) => {
    await page.goto("https://print2block.com/demo-badge-v2/emerge50.html", { waitUntil: "load" });

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








    // If document is valid, click two additional buttons
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
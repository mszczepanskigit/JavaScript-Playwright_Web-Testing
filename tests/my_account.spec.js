import { test } from "@playwright/test"
import { MyAccount } from "../page-objects/MyAccount.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { testerUser } from "../data/UserDetails.js"

test("My Account using cookie injection and mocking network request", async ({ page }) => {
    const loginToken = await getLoginToken(...Object.values(testerUser))

    await page.route("**/api/user**", async (route, request) => {
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({message: "MOCKING PLAYWRIGHT ERROR"})
        })
    })

    // console.warn({loginToken})
    const myAccount = new MyAccount(page)
    await myAccount.visit()
    await page.evaluate(([loginTokenInside]) => {
        document.cookie = "token=" + loginTokenInside
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await myAccount.waitForErrorMessage()
})
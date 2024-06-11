import { test } from "@playwright/test"
import { MyAccount } from "../page-objects/MyAccount.js"
import { getLoginToken } from "../api-calls/getLoginToken.js"
import { testerUser } from "../data/UserDetails.js"

test.only("My Account using cookie injection", async ({ page }) => {
    const loginToken = await getLoginToken(...Object.values(testerUser))
    // console.warn({loginToken})
    const myAccount = new MyAccount(page)
    await myAccount.visit()
    await page.evaluate(([loginTokenInside]) => {
        document.cookie = "token=" + loginTokenInside
    }, [loginToken])
    await myAccount.visit()
    await myAccount.waitForPageHeading()
    await page.pause()
})
import { test, expect } from "@playwright/test"

test("Product Page Add To Basket", async ({ page }) => {
    // Go to the localhost page launched in the other terminal
    await page.goto("/")

    // Find the first locator of Add to Basket button
    const addToBasketButton499 = page.locator('div').filter({ hasText: /^499\$Add to Basket$/ }).getByRole('button')
    await addToBasketButton499.waitFor()

    // Validate the default text
    await expect(addToBasketButton499).toHaveText("Add to Basket")

    //Find the basketCounter
    const basketCounter = page.locator('[data-qa="header-basket-count"]')
    // Validate whether the basketCounter is 0
    await expect(basketCounter).toHaveText("0")    


    //Click it
    await addToBasketButton499.click()

    // Validate whether the basketCounter is 1
    await expect(basketCounter).toHaveText("1")    

    // Find the 2nd locator of Add to Basket button and click it immediately
    const addToBasketButton599 = page.locator('div').filter({ hasText: /^599\$Add to Basket$/ }).getByRole('button')
    await addToBasketButton599.waitFor()
    await expect(addToBasketButton599).toHaveText("Add to Basket")
    await addToBasketButton599.click()

    // Validate whether the text changed
    await expect(page.getByRole('button').first()).toHaveText("Remove from Basket")

    // Validate whether the basketCounter is 2
    await expect(basketCounter).toHaveText("2")

    // Go to checkkout and check whether you are in the basket
    const checkoutLink = page.getByRole('link', { name: 'Checkout' })
    await checkoutLink.waitFor()
    await checkoutLink.click()

    await page.waitForURL("/basket")

    // Pause the page to breakdown the execution
    await page.pause()
})
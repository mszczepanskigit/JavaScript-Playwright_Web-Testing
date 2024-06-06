import { expect } from "@playwright/test"

export class LoginPage {
    constructor(page) {
        this.page = page
        this.goToSignupButton = page.locator('[data-qa="go-to-signup-button"]')
        this.basketItemPrice =  page.locator('[data-qa="basket-item-price"]')
    }

    goToSignupPage = async () => {
        await this.goToSignupButton.waitFor()
        await this.goToSignupButton.click()
        await this.page.waitForURL(/\/signup/, { timeout: 2000 })
    }
}
import { expect } from "@playwright/test"

export class Checkout {
    constructor(page) {
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
        this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        await this.basketItemPrice.first().waitFor()
        const allPriceText = await this.basketItemPrice.allInnerTexts()
        // console.warn({allPriceText})
        const allPrices = allPriceText.map(price => parseInt(price.replace(/\D/g, ''), 10))
        const minPriceIdx = allPrices.indexOf(Math.min(...allPrices))

        await this.basketItemRemoveButton.nth(minPriceIdx).waitFor()
        await this.basketItemRemoveButton.nth(minPriceIdx).click()

        await this.basketCards.nth(itemsBeforeRemoval - 1).waitFor({ state: 'hidden' })
        const itemsAfterRemoval = await this.basketCards.count()

        expect(itemsAfterRemoval).toBeLessThan(itemsBeforeRemoval)
    }

    continueToCheckout = async () => {
        await this.continueToCheckoutButton.waitFor()
        await this.continueToCheckoutButton.click()
        await this.page.waitForURL(/\/login/, { timeout: 2000 })
    }
}
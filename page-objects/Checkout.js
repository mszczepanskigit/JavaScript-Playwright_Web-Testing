import { expect } from "@playwright/test"

export class Checkout {
    constructor(page) {
        this.page = page
        this.basketCards = page.locator('[data-qa="basket-card"]')
        this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
        this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
    }

    removeCheapestProduct = async () => {
        await this.basketCards.first().waitFor()
        const itemsBeforeRemoval = await this.basketCards.count()
        console.log({ itemsBeforeRemoval })
        await this.basketItemPrice.first().waitFor()
        const allPriceText = await this.basketItemPrice.allInnerTexts()
        // console.warn({allPriceText})
        
        const allPrices = allPriceText.map(price => parseInt(price.replace(/\D/g, ''), 10))
        const minPriceIdx = allPrices.indexOf(Math.min(...allPrices))
        await this.basketItemRemoveButton.nth(minPriceIdx).waitFor()
        await this.basketItemRemoveButton.nth(minPriceIdx).click()
        await this.basketCards.nth(minPriceIdx).waitFor({ state: 'hidden' })
        
        const itemsAfterRemoval = await this.basketCards.count()
        console.log({ itemsAfterRemoval })
        await expect(itemsAfterRemoval).toBeLessThan(itemsBeforeRemoval)
    }
}
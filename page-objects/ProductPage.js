import { expect } from "@playwright/test"
import { Navigation } from "./Navigation"

export class ProductPage {
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
    }

    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (productIndex) => {
        const theAddButton = await this.addButtons.nth(productIndex)
        await theAddButton.waitFor()
        await expect(theAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        const basketCountBeforeAdding = await navigation.getBasketCount()
        await theAddButton.click()
        await expect(theAddButton).toHaveText("Remove from Basket")
        const basketCountAfterAdding = await navigation.getBasketCount()
        await expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        await this.sortDropdown.selectOption("price-asc")
    }
}
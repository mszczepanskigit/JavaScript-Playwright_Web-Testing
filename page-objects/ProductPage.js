import { expect } from "@playwright/test"
import { Navigation } from "./Navigation.js"
import { isDesktopViewPort } from "../utils/CheckPlatform.js"

export class ProductPage {
    constructor(page) {
        this.page = page
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
        this.productTitle = page.locator('[data-qa="product-title"]')
    }

    visit = async () => {
        await this.page.goto("/")
    }

    addProductToBasket = async (productIndex) => {
        const theAddButton = await this.addButtons.nth(productIndex)
        await theAddButton.waitFor()
        await expect(theAddButton).toHaveText("Add to Basket")
        const navigation = new Navigation(this.page)
        
        let basketCountBeforeAdding
        if (isDesktopViewPort(this.page)) {
            basketCountBeforeAdding = await navigation.getBasketCount()
        }
        
        await theAddButton.click()
        await expect(theAddButton).toHaveText("Remove from Basket")
        if (isDesktopViewPort(this.page)) {
            const basketCountAfterAdding = await navigation.getBasketCount()
            expect(basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)
        }
        
    }

    sortByCheapest = async () => {
        await this.sortDropdown.waitFor()
        await this.productTitle.first().waitFor()
        const productTitlesBefore = await this.productTitle.allInnerTexts()
        await this.sortDropdown.selectOption("price-asc")
        const productTitlesAfter = await this.productTitle.allInnerTexts()
        expect(productTitlesAfter).not.toEqual(productTitlesBefore)
    }
}
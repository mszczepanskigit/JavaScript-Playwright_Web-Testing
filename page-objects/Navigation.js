export class Navigation {
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        return parseInt(await this.basketCounter.innerText(), 10)
    }

    goToCheckout = async () => {
        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")
        if (!this.page.url().endsWith('/basket')) {
            throw new Error(`Navigation failed: Expected URL to be '/basket', but got '${this.page.url()}'`)
        }
    }
}
import { isDesktopViewPort } from "../utils/CheckPlatform"

export class Navigation {
    constructor(page) {
        this.page = page
        this.basketCounter = page.locator('[data-qa="header-basket-count"]')
        this.checkoutLink = page.getByRole('link', { name: 'Checkout' })
        this.barsAtTheTop = page.locator('svg.fa-bars')
    }

    getBasketCount = async () => {
        await this.basketCounter.waitFor()
        return parseInt(await this.basketCounter.innerText(), 10)
    }

    goToCheckout = async () => {
        if (!isDesktopViewPort(this.page)) {
            await this.barsAtTheTop.waitFor()
            await this.barsAtTheTop.click()
        }
        await this.checkoutLink.waitFor()
        await this.checkoutLink.click()
        await this.page.waitForURL("/basket")
        if (!this.page.url().endsWith('/basket')) {
            throw new Error(`Navigation failed: Expected URL to be '/basket', but got '${this.page.url()}'`)
        }
    }
}
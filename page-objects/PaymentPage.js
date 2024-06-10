import { expect } from "@playwright/test"

export class PaymentPage {
    constructor(page) {
        this.page = page
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]')
                                .locator('[data-qa="discount-code"]')
        this.discountBar = page.locator('[data-qa="discount-code-input"]')
        this.submitDiscountButton = page.getByRole('button', { name: 'Submit discount' })
        this.discountActiveMessage = page.locator('[data-qa="discount-active-message"]')
        this.textToGetStriked = page.locator('.mt-6') // dot allows you to specify that you are looking within the class objects
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()

        await this.discountBar.waitFor()
        await this.discountBar.fill(code)
        await expect(this.discountBar).toHaveValue(code)

        await this.textToGetStriked.waitFor()
        const beforeStrikeClass = await this.textToGetStriked.getAttribute('class')
        expect(beforeStrikeClass).toBe('mt-6 ')

        await this.submitDiscountButton.waitFor()
        await this.submitDiscountButton.click()
        await this.discountActiveMessage.waitFor()

        const afterStrikeClass = await this.textToGetStriked.getAttribute('class')
        expect(afterStrikeClass).toBe('mt-6 line-through')
        await expect(this.discountActiveMessage).toHaveText('Discount activated!')


    }
}
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
        this.initialTotalPrice = page.locator('[data-qa="total-value"]')
        this.discountedTotalPrice = page.locator('[data-qa="total-with-discount-value"]')
    }

    activateDiscount = async () => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()

        await this.discountBar.waitFor()
        //Option 1 using .fill() with await expect()
        await this.discountBar.fill(code)
        await expect(this.discountBar).toHaveValue(code)
        //Option 2 using slow typing
        //await this.discountBar.focus()
        //await this.page.keyboard.type(code, {delay: 1010})
        //expect(await this.discountBar.inputValue()).toBe(code)


        await this.textToGetStriked.waitFor()
        const beforeStrikeClass = await this.textToGetStriked.getAttribute('class')
        expect(beforeStrikeClass).toBe('mt-6 ')

        await this.submitDiscountButton.waitFor()
        await this.submitDiscountButton.click()
        await this.discountActiveMessage.waitFor()

        const afterStrikeClass = await this.textToGetStriked.getAttribute('class')
        expect(afterStrikeClass).toBe('mt-6 line-through')
        await expect(this.discountActiveMessage).toHaveText('Discount activated!')

        await this.initialTotalPrice.waitFor()
        await this.discountedTotalPrice.waitFor()
        expect(parseInt((await this.discountedTotalPrice.innerText()).replace(/[^0-9.]/g, ''), 10)).
        toBeLessThanOrEqual(parseInt((await this.initialTotalPrice.innerText()).replace(/[^0-9.]/g, ''), 10))
    }
}
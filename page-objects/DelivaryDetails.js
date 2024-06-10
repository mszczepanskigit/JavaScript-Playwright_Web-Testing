import { expect } from "@playwright/test"

export class DeliveryDetails {
    constructor(page) {
        this.page = page
        this.firstNameBar = page.getByPlaceholder('First name')
        this.lastNameBar = page.getByPlaceholder('Last name')
        this.streetBar = page.getByPlaceholder('Street')
        this.postCodeBar = page.getByPlaceholder('Post code')
        this.cityBar = page.getByPlaceholder('City')
        //this.countryDropdown = page.locator('[data-qa="country-dropdown"]')
        this.countryDropdown = page.getByRole('combobox')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.continueButton = page.getByRole('button', { name: 'Continue to payment' })
        this.savedAddressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedAddressFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedAddressLastName = page.locator('[data-qa="saved-address-lastName"]')
        this.savedAddressStreet = page.locator('[data-qa="saved-address-street"]')
        this.savedAddressPostCode = page.locator('[data-qa="saved-address-postcode"]')
        this.savedAddressCity = page.locator('[data-qa="saved-address-city"]')
        this.savedAddressCountry = page.locator('[data-qa="saved-address-country"]')
    }

    fillDeliveryDetails = async (firstName, lastName, street, postCode, city, country) => {
    await this.firstNameBar.waitFor()
    await this.firstNameBar.fill(firstName)

    await this.lastNameBar.waitFor()
    await this.lastNameBar.fill(lastName)

    await this.streetBar.waitFor()
    await this.streetBar.fill(street)

    await this.postCodeBar.waitFor()
    await this.postCodeBar.fill(postCode)

    await this.cityBar.waitFor()
    await this.cityBar.fill(city)

    await this.countryDropdown.waitFor()
    await this.countryDropdown.selectOption(country)
    }

    saveDetails = async (saveDecision = false) => {
        if (saveDecision) {
            const addressCountBeforeSaving = await this.savedAddressContainer.count()
            await this.saveAddressButton.waitFor()
            await this.saveAddressButton.click()
            //await this.savedAddressContainer.waitFor()
            await expect(this.savedAddressContainer).toHaveCount(addressCountBeforeSaving + 1)

            await this.savedAddressFirstName.first().waitFor()
            expect(await this.savedAddressFirstName.first().innerText()).toBe(await this.firstNameBar.inputValue())
            
            await this.savedAddressLastName.first().waitFor()
            expect(await this.savedAddressLastName.first().innerText()).toBe(await this.lastNameBar.inputValue())
            
            await this.savedAddressStreet.first().waitFor()
            expect(await this.savedAddressStreet.first().innerText()).toBe(await this.streetBar.inputValue())
            
            await this.savedAddressPostCode.first().waitFor()
            expect(await this.savedAddressPostCode.first().innerText()).toBe(await this.postCodeBar.inputValue())

            await this.savedAddressCity.first().waitFor()
            expect(await this.savedAddressCity.first().innerText()).toBe(await this.cityBar.inputValue())
            
            await this.savedAddressCountry.first().waitFor()
            expect(await this.savedAddressCountry.first().innerText()).toBe(await this.countryDropdown.inputValue())
        }
    }

    goToPayment = async () => {
        await this.continueButton.waitFor()
        await this.continueButton.click()
        await this.page.waitForURL(/\/payment/, { timeout: 2000 })
    }
}
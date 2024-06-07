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
    }

    fillDeliveryDetails = async (firstName, lastName, street, postCode, city, country, saveDecision = false) => {
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

    if (saveDecision) {
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click()
        await this.savedAddressContainer.waitFor()
    }
    await this.continueButton.waitFor()
    await this.continueButton.click()
    }
}
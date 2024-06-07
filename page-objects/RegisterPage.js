import { v4 as uuid } from 'uuid'

export class RegisterPage {
    constructor(page) {
        this.page = page
        this.emailBar = page.getByPlaceholder('e-mail')
        this.pwdBar = page.getByPlaceholder('password')
        this.registerButton = page.getByRole('button', {name: 'Register'})
    }

    signUpAsNewUser = async () => {
        await this.emailBar.waitFor()
        const emailID = "test-" + uuid() + "-@dom.com"
        await this.emailBar.fill(emailID)
        await this.pwdBar.waitFor()
        const password = uuid()
        await this.pwdBar.fill(password)
        await this.registerButton.waitFor()
        await this.registerButton.click()
    }
}
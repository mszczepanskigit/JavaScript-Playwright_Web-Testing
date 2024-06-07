export class RegisterPage {
    constructor(page) {
        this.page = page
        this.emailBar = page.getByPlaceholder('e-mail')
        this.pwdBar = page.getByPlaceholder('password')
        this.registerButton = page.getByRole('button', {name: 'Register'})
    }

    signUpAsNewUser = async () => {
        await this.emailBar.waitFor()
        await this.emailBar.fill("usr@dom.com")
        await this.pwdBar.waitFor()
        await this.pwdBar.fill("trickyp@BBword")
        await this.registerButton.waitFor()
        await this.registerButton.click()
    }
}
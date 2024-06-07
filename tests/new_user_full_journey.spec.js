import { test, expect } from "@playwright/test"
import { ProductPage } from "../page-objects/ProductPage.js"
import { Navigation } from "../page-objects/Navigation.js"
import { Checkout } from "../page-objects/Checkout.js"
import { LoginPage } from "../page-objects/LoginPage.js"
import { RegisterPage } from "../page-objects/RegisterPage.js"
import { v4 as uuid } from 'uuid'

test.only("New user full E2E test journey", async ({ page }) => {
    
    const productsPage = new ProductPage(page)
    await productsPage.visit()
    await productsPage.sortByCheapest()

    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)

    const navigation = new Navigation(page)
    await navigation.goToCheckout()

    const checkout = new Checkout(page)
    await checkout.removeCheapestProduct()
    await checkout.continueToCheckout()

    const login = new LoginPage(page)
    await login.goToSignupPage()

    const register = new RegisterPage(page)
    const email = "test-" + uuid() + "-@dom.com"
    const password = uuid()
    await register.signUpAsNewUser(email, password)


    await page.pause()
})
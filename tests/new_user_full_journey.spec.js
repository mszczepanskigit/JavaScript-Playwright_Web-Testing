import { test, expect } from "@playwright/test"
import { ProductPage } from "../page-objects/ProductPage.js"
import { Navigation } from "../page-objects/Navigation.js"
import { Checkout } from "../page-objects/Checkout.js"
import { LoginPage } from "../page-objects/LoginPage.js"
import { RegisterPage } from "../page-objects/RegisterPage.js"
import { DeliveryDetails } from "../page-objects/DelivaryDetails.js"
import { v4 as uuid } from "uuid"
import { generateRandomFiveDigitCode } from "../utils/GenerateDataUtils"

test.only("1st user full E2E test journey", async ({ page }) => {
    
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

    const deliveryDetails = new DeliveryDetails(page)
    const firstName = "Tester John"
    const lastName = "Smith"
    const street = "Alabama Alley 69"
    const postCode = generateRandomFiveDigitCode()
    const city = "Malmo"
    const country = "Sweden"
    const saveDecision = true
    await deliveryDetails.fillDeliveryDetails(firstName, lastName, street, postCode, city, country, saveDecision)

    await page.pause()
})

test.only("2nd user full E2E test journey", async ({ page }) => {
    
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
    const email = "test-" + uuid() + "-@dom2.com"
    const password = uuid()
    await register.signUpAsNewUser(email, password)

    const deliveryDetails = new DeliveryDetails(page)
    const firstName = "Tester Yan"
    const lastName = "Kovalsky"
    const street = "Alabama Alley 69"
    const postCode = generateRandomFiveDigitCode()
    const city = "Minsk"
    const country = "Belarus"
    await deliveryDetails.fillDeliveryDetails(firstName, lastName, street, postCode, city, country)

    await page.pause()
})
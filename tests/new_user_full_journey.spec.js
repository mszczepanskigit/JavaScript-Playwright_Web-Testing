import { test, expect } from "@playwright/test"
import { ProductPage } from "../page-objects/ProductPage.js"
import { Navigation } from "../page-objects/Navigation.js"
import { Checkout } from "../page-objects/Checkout.js"
import { LoginPage } from "../page-objects/LoginPage.js"
import { RegisterPage } from "../page-objects/RegisterPage.js"
import { DeliveryDetails } from "../page-objects/DelivaryDetails.js"
import { v4 as uuid } from "uuid"
import { deliveryDetails_1, deliveryDetails_2 } from "../data/DeliveryDetailsInDicts.js"
import { PaymentPage } from "../page-objects/PaymentPage.js"
import { paymentDetails_1 } from "../data/PaymentDetailsInDicts.js"

test("Sanity test", async ({ page }) => {
    
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
    await deliveryDetails.fillDeliveryDetails(...Object.values(deliveryDetails_1))
    await deliveryDetails.saveDetails()
    await deliveryDetails.goToPayment()
})

test("Full user E2E test journey", async ({ page }) => {
    
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
    await deliveryDetails.fillDeliveryDetails(...Object.values(deliveryDetails_1))
    await deliveryDetails.saveDetails(true)
    await deliveryDetails.fillDeliveryDetails(...Object.values(deliveryDetails_2))
    await deliveryDetails.saveDetails(true)
    await deliveryDetails.goToPayment()

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()
    await paymentPage.fillPaymentDetails(...Object.values(paymentDetails_1))
    await paymentPage.payForThePurchase()

    await page.pause()
})
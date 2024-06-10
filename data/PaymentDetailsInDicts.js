import * as generateRandom from "../utils/GenerateDataUtils"

export const paymentDetails_1 ={
    cardOwner: "Tester John",
    cardNumber: generateRandom.generateRandom16DigitCode(),
    dateValidUntil: "12/28",
    CVC: generateRandom.generateRandomCVCNumber()
}
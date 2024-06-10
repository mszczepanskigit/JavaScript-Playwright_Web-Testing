import { generateRandomFiveDigitCode } from "../utils/GenerateDataUtils"

export const deliveryDetails_save ={
    firstName: "Tester John",
    lastName: "Smith",
    street: "Alabama Alley 69",
    postCode: generateRandomFiveDigitCode(),
    city: "Malmo",
    country: "Sweden"
}

export const deliveryDetails_notSave ={
    firstName: "Tester Yan",
    lastName: "Kovalsky",
    street: "Red Street 45",
    postCode: generateRandomFiveDigitCode(),
    city: "Minsk",
    country: "Belarus"
}
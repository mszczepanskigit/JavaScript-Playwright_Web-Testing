export function generateRandomFiveDigitCode() {
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    return randomCode.toString();
}
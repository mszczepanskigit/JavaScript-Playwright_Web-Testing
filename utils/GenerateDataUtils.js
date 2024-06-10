export function generateRandomFiveDigitCode() {
    const randomCode = Math.floor(1e4 + Math.random() * 9e4);
    return randomCode.toString();
}

export function generateRandom16DigitCode() {
    const randomCode = Math.floor(1e15 + Math.random() * 9e15);
    return randomCode.toString();
}

export function generateRandomCVCNumber() {
    const randomCode = Math.floor(1e2 + Math.random() * 9e2);
    return randomCode.toString();
}

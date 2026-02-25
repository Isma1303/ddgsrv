const validateTaxId = (taxId = '') => {
    let isValid = false
    if (taxId !== '') {
        taxId = taxId.includes('-') ? taxId : taxId.substring(0, taxId.length - 1) + '-' + taxId[taxId.length - 1]
        const dashPosition = taxId.indexOf('-')
        const taxIdBody = taxId.substring(0, dashPosition)
        let multiplier = taxIdBody.length + 1
        let sum = 0

        for (let i = 0; i < taxIdBody.length; i++) {
            const value = parseInt(taxIdBody.charAt(i))
            sum += value * multiplier
            multiplier -= 1
        }

        const remainder = sum % 11
        let checkDigit: any = 11 - remainder
        if (checkDigit === 10) {
            checkDigit = 'K'
        }

        const enteredCheckDigit = taxId.substring(dashPosition + 1)
        if (enteredCheckDigit === checkDigit.toString()) {
            isValid = true
        }
    }
    return isValid
}

export { validateTaxId }

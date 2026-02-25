import * as bcrypt from 'bcryptjs'

const encryptText = async (text: string, saltRounds: number) => {
    const generatedSalt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(text, generatedSalt)
    return hash
}

const comparePassword = async (password: string, storedPassword: string) => {
    return await bcrypt.compare(password, storedPassword)
}

const btoa = (text: string) => {
    return Buffer.from(text, 'binary').toString('base64')
}

const atob = (base64: string) => {
    return Buffer.from(base64, 'base64').toString('binary')
}

const insecureCrypt = (text: any, salt: any) => {
    const textToChars = (text: any) => text.split('').map((c: any) => c.charCodeAt(0))
    const byteHex = (n: any) => ('0' + Number(n).toString(16)).slice(-2)
    const applySaltToChar = (code: any) => textToChars(salt).reduce((a: any, b: any) => a ^ b, code)

    return text.split('').map(textToChars).map(applySaltToChar).map(byteHex).join('')
}

const insecureDecrypt = (encoded: any, salt: any) => {
    const textToChars = (text: string) => text.split('').map((c) => c.charCodeAt(0))
    const applySaltToChar = (code: any) => textToChars(salt).reduce((a, b) => a ^ b, code)
    return encoded
        .match(/.{1,2}/g)
        .map((hex: any) => parseInt(hex, 16))
        .map(applySaltToChar)
        .map((charCode: any) => String.fromCharCode(charCode))
        .join('')
}

export { encryptText, comparePassword, atob, btoa, insecureCrypt, insecureDecrypt }

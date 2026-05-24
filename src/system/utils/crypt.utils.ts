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

const decodeBase64IfNeeded = (value: string) => {
    const normalized = (value || '').trim()
    if (!normalized) return normalized

    // Only decode when the value looks like valid base64 and round-trips safely.
    if (!/^[A-Za-z0-9+/]+={0,2}$/.test(normalized) || normalized.length % 4 !== 0) {
        return normalized
    }

    try {
        const decoded = Buffer.from(normalized, 'base64').toString('utf8')
        const reencoded = Buffer.from(decoded, 'utf8').toString('base64').replace(/=+$/g, '')
        const inputNoPadding = normalized.replace(/=+$/g, '')
        return reencoded === inputNoPadding ? decoded : normalized
    } catch {
        return normalized
    }
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

export { encryptText, comparePassword, atob, btoa, decodeBase64IfNeeded, insecureCrypt, insecureDecrypt }

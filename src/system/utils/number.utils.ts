export const getNumberWithNDecimals = (number: number, options?: { decimals?: number }): number => {
    const { decimals = 8 } = options || {}
    const [integer, decimal = ''] = number.toString().split('.')
    const result = [integer, decimal.slice(0, decimals)].join('.')
    return Number(result)
}

export const roundTwoDecimals = (number: number): number => {
    return Math.round(number * 100) / 100
}

export const roundSixDecimals = (number: number): number => {
    return Math.round(number * 1000000) / 1000000
}

export const roundFourDecimals = (number: number): number => {
    return Math.round(number * 10000) / 10000
}

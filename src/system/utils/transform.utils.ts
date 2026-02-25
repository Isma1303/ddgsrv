const parseHeaderParams = (params: any, payloadOptions: string[]) => {
    const parsedParams: Record<string, any> = {}
    payloadOptions.forEach((option) => {
        parsedParams[option] = isNaN(params[option]) ? params[option] : Number(params[option])
    })
    return parsedParams
}

const nestRecords = (records: any[], id: string, parentId: string, nestedName = 'nested') => {
    const nestedRecords: Record<string, any>[] = []
    const tempRecords: Record<string, any>[] = []

    records.forEach((record) => {
        if (record[id] == record[parentId]) {
            record[nestedName] = []
            nestedRecords.push(record)
        } else {
            tempRecords.push(record)
        }
    })

    tempRecords.forEach((record) => {
        nestedRecords.forEach((nestedRecord) => {
            if (record[parentId] == nestedRecord[id]) {
                nestedRecord[nestedName].push(record)
            }
        })
    })

    nestedRecords.forEach((nestedRecord) => {
        nestedRecord[nestedName].forEach((nestedItem: any) => {
            const foundRecord = records.find((element) => {
                if (element[parentId] == nestedItem[id]) {
                    return true
                }
            })
            if (foundRecord) {
                nestedItem[nestedName] = []
            }
        })
    })

    nestedRecords.forEach((nestedRecord) => {
        records.forEach((record) => {
            nestedRecord[nestedName].forEach((levelRecord: any) => {
                if (record[parentId] == levelRecord[id]) {
                    levelRecord[nestedName].push(record)
                }
            })
        })
    })

    return nestedRecords
}

const renameProperties = (records: Record<string, any>[], propertyNames: any[]) => {
    records.forEach((record) => {
        for (const k in record) {
            const propertyName = propertyNames.find((propertyName: any) => propertyName.property === k)
            if (propertyName) {
                record[propertyName.name] = record[k]
                delete record[k]
            }
        }
    })
    return records
}

const formatRecords = (records: Record<string, string | number | boolean>[], recordFormat: Record<string, string>) => {
    let formattedRecords: Record<string, string | number | boolean>[] = []
    formattedRecords = records.map((record) => {
        const formattedRecord: Record<string, string | number | boolean> = {}
        for (const key in recordFormat) {
            formattedRecord[recordFormat[key]] = record[key]
        }
        return formattedRecord
    })
    return formattedRecords
}

const getFileName = (fileName: string) => {
    const ext = fileName.split('.').pop()

    return { blobName: fileName, ext: `${ext}` }
}

/**
 * Formats a number as currency.
 *
 * @param value - The number to format.
 * @param currencyCode - The currency code to use.
 * @param minimumFractionDigits - The minimum number of fraction digits (default is 2).
 * @returns The formatted currency string.
 */
const formatCurrency = (value: number, currencyCode: string, minimumFractionDigits: number = 2): string => {
    return new Intl.NumberFormat('es-GT', {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits,
    }).format(value)
}

export { parseHeaderParams, nestRecords, renameProperties, formatRecords, getFileName, formatCurrency }

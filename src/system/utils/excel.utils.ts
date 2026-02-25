/* eslint-disable indent */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const xl = require('excel4node')

import { WorkBook, WorkSheet, utils } from 'xlsx'

const generateExcel = (data: Record<string, any>) => {
    const workbook = new xl.Workbook({
        defaultFont: {
            size: 10,
            name: 'Century Gothic',
            color: 'FFFFFFFF',
        },
    })

    const worksheet = workbook.addWorksheet('Sheet Name', {
        sheetView: { showGridLines: false },
    })

    worksheet.column(1).setWidth(30)

    const cellStyle = workbook.createStyle({
        font: {
            color: '#000000',
            size: 10,
            name: 'Century Gothic',
        },
        numberFormat: '$#,##0.00',
    })

    worksheet.cell(1, 1).string(data.greeting).style(cellStyle)

    return workbook
}

const getGoalsEmployeesTemplate = () => {
    const workbook = new xl.Workbook({
        defaultFont: {
            size: 12,
            name: 'Calibri',
            color: '#000000',
        },
    })

    const worksheet = workbook.addWorksheet('Data', {
        sheetView: { showGridLines: true },
    })

    const columns: { name: string; width: number }[] = [
        { name: 'ID Connect', width: 20 },
        { name: 'Código empleado SAP', width: 20 },
        { name: 'Metas individuales', width: 20 },
        { name: 'Correo electrónico', width: 20 },
    ]

    const dataExample = [{ value: 1 }, { value: 12 }, { value: 80.3 }]

    const styleCells = workbook.createStyle({
        font: {
            color: '#000000',
            size: 10,
            name: 'Calibri',
        },
    })

    columns.forEach((column, index) => {
        worksheet.column(index + 1).setWidth(column.width)
        worksheet
            .cell(1, index + 1)
            .string(column.name)
            .style(styleCells)
    })

    dataExample.forEach((column, index) => {
        worksheet
            .cell(2, index + 1)
            .number(column.value)
            .style(styleCells)
    })
    return workbook
}

const getEmployeesTemplate = () => {
    const workbook = new xl.Workbook({
        defaultFont: {
            size: 12,
            name: 'Calibri',
            color: '#000000',
        },
    })

    const worksheet = workbook.addWorksheet('Data', {
        sheetView: { showGridLines: true },
    })

    const columns: { name: string; width: number }[] = [
        { name: 'ID Connect', width: 20 },
        { name: 'Código empleado SAP', width: 20 },
        { name: 'Nombre', width: 20 },
        { name: 'Apellido', width: 20 },
        { name: 'Código sociedad', width: 20 },
        { name: 'Descripción sociedad', width: 20 },
        { name: 'Fecha contratación', width: 20 },
        { name: 'Fecha antiguedad', width: 20 },
        { name: 'Código posición', width: 20 },
        { name: 'Descripción posición', width: 20 },
        { name: 'Fecha inicio posición', width: 20 },
        { name: '¿Aplica a bono HAZ?', width: 20 },
        { name: 'Banda', width: 20 },
        { name: 'Grade', width: 20 },
        { name: 'Departamento', width: 20 },
        { name: 'CECO a diciembre', width: 20 },
        { name: 'Salario mensual', width: 20 },
        { name: 'Código moneda', width: 20 },
        { name: 'Código pais operación', width: 20 },
        { name: 'SF Unidad de negocio', width: 20 },
        { name: 'SF Operación', width: 20 },
        { name: 'Correo electrónico', width: 20 },
        { name: 'Código posición anterior', width: 20 },
        { name: 'Descripción posición anterior', width: 20 },
        { name: 'Aplica bono posición anterior', width: 20 },
        { name: 'Fecha inicio posición anterior', width: 20 },
        { name: 'Fecha fin posición anterior', width: 20 },
    ]

    const dataExample: { value: any; dataType: 'string' | 'number' }[] = [
        { value: '1234578', dataType: 'string' },
        { value: 'EMP001', dataType: 'string' },
        { value: 'Jhon', dataType: 'string' },
        { value: 'Doe', dataType: 'string' },
        { value: 'SC001', dataType: 'string' },
        { value: 'Sociedad A', dataType: 'string' },
        { value: '2025-01-15', dataType: 'string' },
        { value: '2025-01-15', dataType: 'string' },
        { value: 'P001', dataType: 'string' },
        { value: 'Gerente', dataType: 'string' },
        { value: '2025-02-01', dataType: 'string' },
        { value: 1, dataType: 'number' },
        { value: 'B1', dataType: 'string' },
        { value: 'G5', dataType: 'string' },
        { value: 'Ventas', dataType: 'string' },
        { value: 'CECO001', dataType: 'string' },
        { value: 5000, dataType: 'number' },
        { value: 'USD', dataType: 'string' },
        { value: 'GT', dataType: 'string' },
        { value: 'Negocio A', dataType: 'string' },
        { value: 'Operación 1', dataType: 'string' },
        { value: 'jhon.doe@gmail.com', dataType: 'string' },
    ]

    const styleCells = workbook.createStyle({
        font: {
            color: '#000000',
            size: 10,
            name: 'Calibri',
        },
    })

    columns.forEach((column, index) => {
        worksheet.column(index + 1).setWidth(column.width)
        worksheet
            .cell(1, index + 1)
            .string(column.name)
            .style(styleCells)
    })

    dataExample.forEach((column, index) => {
        if (column.dataType === 'number')
            worksheet
                .cell(2, index + 1)
                .number(column.value)
                .style(styleCells)
        if (column.dataType === 'string')
            worksheet
                .cell(2, index + 1)
                .string(column.value)
                .style(styleCells)
    })
    return workbook
}

const getOperationEquivalenceTemplate = () => {
    const workbook = new xl.Workbook({
        defaultFont: {
            size: 12,
            name: 'Calibri',
            color: '#000000',
        },
    })

    const worksheet = workbook.addWorksheet('Data', {
        sheetView: { showGridLines: true },
    })

    const columns: { name: string; width: number }[] = [
        { name: 'SF Unidad', width: 20 },
        { name: 'SF operación', width: 20 },
        { name: 'Unidad', width: 20 },
        { name: 'Operación', width: 20 },
    ]

    const dataExample: { value: any; dataType: 'string' | 'number' }[] = [
        { value: 'Negocio A', dataType: 'string' },
        { value: 'Operación 1', dataType: 'string' },
        { value: 'Negocio B', dataType: 'string' },
        { value: 'Operación 2', dataType: 'string' },
    ]

    const styleCells = workbook.createStyle({
        font: {
            color: '#000000',
            size: 10,
            name: 'Calibri',
        },
    })

    columns.forEach((column, index) => {
        worksheet.column(index + 1).setWidth(column.width)
        worksheet
            .cell(1, index + 1)
            .string(column.name)
            .style(styleCells)
    })

    dataExample.forEach((column, index) => {
        if (column.dataType === 'number')
            worksheet
                .cell(2, index + 1)
                .number(column.value)
                .style(styleCells)
        if (column.dataType === 'string')
            worksheet
                .cell(2, index + 1)
                .string(column.value)
                .style(styleCells)
    })
    return workbook
}

const getPositionCountryEquivalenceTemplate = () => {
    const workbook = new xl.Workbook({
        defaultFont: {
            size: 12,
            name: 'Calibri',
            color: '#000000',
        },
    })

    const worksheet = workbook.addWorksheet('Data', {
        sheetView: { showGridLines: true },
    })

    const columns: { name: string; width: number }[] = [
        { name: 'Código de posición', width: 20 },
        { name: 'Nombre de posición', width: 20 },
        { name: 'Código de país', width: 20 },
    ]

    const dataExample: { value: any; dataType: 'string' | 'number' }[] = [
        { value: 'P001', dataType: 'string' },
        { value: 'Gerente', dataType: 'string' },
        { value: 'GT', dataType: 'string' },
    ]

    const styleCells = workbook.createStyle({
        font: {
            color: '#000000',
            size: 10,
            name: 'Calibri',
        },
    })

    columns.forEach((column, index) => {
        worksheet.column(index + 1).setWidth(column.width)
        worksheet
            .cell(1, index + 1)
            .string(column.name)
            .style(styleCells)
    })

    dataExample.forEach((column, index) => {
        if (column.dataType === 'number')
            worksheet
                .cell(2, index + 1)
                .number(column.value)
                .style(styleCells)
        if (column.dataType === 'string')
            worksheet
                .cell(2, index + 1)
                .string(column.value)
                .style(styleCells)
    })
    return workbook
}

const getPositionScopeEquivalenceTemplate = () => {
    const workbook = new xl.Workbook({
        defaultFont: {
            size: 12,
            name: 'Calibri',
            color: '#000000',
        },
    })

    const worksheet = workbook.addWorksheet('Data', {
        sheetView: { showGridLines: true },
    })

    const columns: { name: string; width: number }[] = [
        { name: 'Código de posición', width: 20 },
        { name: 'Nombre de posición', width: 20 },
        { name: 'Unidad', width: 20 },
        { name: 'Operación', width: 20 },
    ]

    const dataExample: { value: any; dataType: 'string' | 'number' }[] = [
        { value: 'P001', dataType: 'string' },
        { value: 'Gerente', dataType: 'string' },
        { value: 'Negocio A', dataType: 'string' },
        { value: 'Operación 1', dataType: 'string' },
    ]

    const styleCells = workbook.createStyle({
        font: {
            color: '#000000',
            size: 10,
            name: 'Calibri',
        },
    })

    columns.forEach((column, index) => {
        worksheet.column(index + 1).setWidth(column.width)
        worksheet
            .cell(1, index + 1)
            .string(column.name)
            .style(styleCells)
    })

    dataExample.forEach((column, index) => {
        if (column.dataType === 'number')
            worksheet
                .cell(2, index + 1)
                .number(column.value)
                .style(styleCells)
        if (column.dataType === 'string')
            worksheet
                .cell(2, index + 1)
                .string(column.value)
                .style(styleCells)
    })
    return workbook
}

const getExcelData = (
    workbook: WorkBook,
    sheetName: string,
    objectStructure: Record<string, string>,
    dataTypesColumns?: Record<string, string>,
): Record<string, any>[] => {
    const workSheet = modifyColumnAliases(workbook.Sheets[sheetName], objectStructure)
    return utils
        .sheet_to_json(workSheet, {
            defval: null, // establecer defval en null para incluir celdas vacías en la salida
        })
        .map((record: any) => {
            const filteredRecord: any = {}
            for (const field of Object.values(objectStructure)) {
                if (!Object.keys(record).includes(field)) continue
                filteredRecord[field] = record[field]
                if (dataTypesColumns) {
                    filteredRecord[field] = dataTypeConverter(record[field], dataTypesColumns[field])
                }
            }
            return filteredRecord
        })
}

const modifyColumnAliases = (sheet: WorkSheet, objectKeys: Record<string, string>): WorkSheet => {
    for (const cell in sheet) {
        const regExp = new RegExp('[A-Z]+1{1}$')
        if (cell.match(regExp)) {
            const value = sheet[cell]['w']
            sheet[cell]['w'] = objectKeys[value] || value
        }
    }
    return sheet
}

const dataTypeConverter = (valor: any, tipo: string): any => {
    if (valor === null || valor === undefined) return null

    switch (tipo) {
        case 'string':
            return valor.toString()
        case 'number':
            return Number(valor)
        case 'date':
            if (typeof valor === 'number') {
                return new Date((valor - 25569) * 86400 * 1000)
            }
            return new Date(valor)
        case 'boolean':
            return valor.toString().toLowerCase() === 'true' || valor === '1'
        default:
            return valor
    }
}

export {
    generateExcel,
    getExcelData,
    getGoalsEmployeesTemplate,
    getEmployeesTemplate,
    getOperationEquivalenceTemplate,
    getPositionCountryEquivalenceTemplate,
    getPositionScopeEquivalenceTemplate,
}

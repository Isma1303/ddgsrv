export interface ISaleLines {
    sale_line_id: number
    sale_id: number
    menu_item_id: number
    product_id: number
    quantity: number
    unit_price: number
    line_total: number
}

export interface ISaleLinesNew extends Omit<ISaleLines, 'sale_line_id'> {}
export interface ISaleLinesUpdate extends Partial<ISaleLines> {}

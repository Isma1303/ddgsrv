export interface IMenu {
    menu_id: number
    menu_nm: string
    valid_from: Date
    valid_to: Date
    is_active: boolean
}

export interface IMenuNew extends Omit<IMenu, 'menu_id'> {}
export interface IMenuUpdate extends Partial<IMenu> {}

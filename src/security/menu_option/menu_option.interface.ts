export interface MenuOption {
    id: number
    text: string
    icon: string
    path: string
    sort: string
    parentId: number
}

export interface IMenuOption {
    menu_option_id: number
    menu_option: string
    icon: string
    path: string
    sort: string
    parent_menu_option_id: number
}

export interface IMenuOptionNew extends Omit<IMenuOption, 'menu_option_id'> {}
export interface IMenuOptionUpdate extends Partial<IMenuOption> {}

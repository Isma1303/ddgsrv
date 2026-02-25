export interface IAction {
    action_id: number
    action: string
    table_name: string
    write_permission: boolean
}

export interface IActionNew extends Omit<IAction, 'action_id'> {}
export interface IActionUpdate extends Partial<IAction> {}

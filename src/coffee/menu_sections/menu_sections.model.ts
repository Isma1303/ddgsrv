import Model from '../../system/model'
import { IMenuSection, IMenuSectionNew, IMenuSectionUpdate } from './menu_sections.interface'

export class MenuSectionsModel extends Model<IMenuSection, IMenuSectionNew, IMenuSectionUpdate> {
    constructor() {
        super()
        this.schemaName = 'coffee'
        this.tableName = 'menu_sections'
        this.tableId = 'menu_section_id'
        this.tableAlias = 'ms'
        this.tableFields = [
            { name: 'menu_section_id', description: 'ID de la sección del menú', required: false },
            { name: 'menu_id', description: 'ID del menú', required: true },
            { name: 'section_nm', description: 'Nombre de la sección', required: true },
            { name: 'sort_order', description: 'Orden de clasificación', required: true },
            { name: 'is_active', description: 'Indica si está activa', required: true },
        ]
    }
}

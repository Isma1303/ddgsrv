export interface FabricAPIResponse {
    value: any
}

export interface Workspace {
    id: string
    displayName: string
    description: string
    type: 'Workspace'
    capacityId?: string
}

export type ItemType =
    | 'Dashboard'
    | 'DataPipeline'
    | 'Datamart'
    | 'Environment'
    | 'Eventhouse'
    | 'Eventstream'
    | 'KQLDashboard'
    | 'KQLDatabase'
    | 'KQLQueryset'
    | 'Lakehouse'
    | 'MLExperiment'
    | 'MLModel'
    | 'MirroredWarehouse'
    | 'Notebook'
    | 'PaginatedReport'
    | 'Report'
    | 'SQLEndpoint'
    | 'SemanticModel'
    | 'SparkJobDefinition'
    | 'Warehouse'

export type ItemTypeWithDefinitionSupport = 'KQLDashboard' | 'Notebook' | 'Report' | 'SemanticModel' | 'SparkJobDefinition'

export interface Item {
    description: string
    displayName: string
    id: string
    type: ItemType
    workspaceId: string
}

export interface WorkspaceItem extends Workspace {
    items: Item[]
}

export interface OperationStatus {
    status: string
    createdTimeUtc: string
    lastUpdatedTimeUtc: string
    percentComplete: number
    error: string | null
}
export interface ItemDefinitionPart {
    path: string
    payload: string
    payloadType: 'InlineBase64'
}

export interface ItemDefinition {
    format?: string
    parts: ItemDefinitionPart[]
}

export interface ItemDefinitionResponse {
    definition: ItemDefinition
}

export interface CreateWorkspaceResponse {
    capacityId: string
    description: string
    displayName: string
    id: string
    type: string
}

export type WorkspaceRole = 'Admin' | 'Contributor' | 'Member' | 'Viewer'
export type PrincipalType = 'Group' | 'ServicePrincipal' | 'ServicePrincipalProfile' | 'User'
export type ModelPermissionType = 'none' | 'read' | 'readRefresh' | 'refresh' | 'administrator'
export type RoleMemberType = 'user' | 'group' | 'auto'

export interface SemanticModelRoleMember {
    user: string
    roleMemberType?: RoleMemberType
    identityProvider?: 'activeDirectory' | string
}

export interface SemanticModelRole {
    roleName: string
    modelPermission: ModelPermissionType
    tablePermission: string
    members: SemanticModelRoleMember[]
}

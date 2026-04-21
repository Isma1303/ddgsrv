export interface ParamsUploadDataSPO {
    records: Record<string, string | number | boolean>[]
    stgTable: string
    storeProcedureDataProcessing: string
    connectionName?: string
    responseMessage?: {
        key: string
        value: string
    }
}

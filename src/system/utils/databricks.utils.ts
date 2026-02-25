import configuration from '../../config'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { DBSQLClient } = require('@databricks/sql')
let clientInstance: any = null

const createDBClient = () => {
    const serverHostname = configuration.DATABRICKS.DATABRICKS_INSTANCE
    const httpPath = configuration.DATABRICKS.HTTP_PATH
    const token = configuration.DATABRICKS.DATABRICKS_PERSONAL_TOKEN

    if (!serverHostname || !httpPath || !token) {
        throw new Error(
            'No se puede encontrar el nombre de host del servidor, la ruta HTTP o el token de acceso personal. ' +
                'Verifique las variables de entorno DATABRICKS_SERVER_HOSTNAME, ' +
                'DATABRICKS_HTTP_PATH, and DATABRICKS_TOKEN.',
        )
    }

    const client = new DBSQLClient({})
    client.connect({
        host: serverHostname,
        path: httpPath,
        token: token,
    })

    return client
}

const getClient = () => {
    if (!clientInstance) {
        clientInstance = createDBClient()
    }
    return clientInstance
}

export const executeQueryDatabricks = async <T>(statement: string): Promise<T[]> => {
    try {
        const client = getClient()
        const session = await client.openSession()
        const queryOperation = await session.executeStatement(statement)
        const result = await queryOperation.fetchAll()
        await queryOperation.close()
        await session.close()

        return new Promise<T[]>((resolve) => resolve(result))
    } catch (errorGeneralFuncion: any) {
        if (errorGeneralFuncion.statusCode === 403)
            return new Promise<T[]>((resolve, reject) =>
                reject({
                    message:
                        'Error al conectar con el recurso de Databricks, no es posible acceder al recurso solicitado. Comprueba tus credenciales',
                }),
            )
        return new Promise<T[]>((resolve, reject) => reject({ message: ` ${errorGeneralFuncion.message} ` }))
    }
}

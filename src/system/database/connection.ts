import knex, { Knex } from 'knex'
import config from '../../config'

class Connection {
    dbCollection: Record<string, any>
    defaultConnectionName = 'DB_ADMIN'
    constructor() {
        const adminDbSettings = {
            client: config.DB.DB_ADMIN.DB_CLIENT,
            connection: {
                database: config.DB.DB_ADMIN.DB_NAME,
                user: config.DB.DB_ADMIN.DB_USER,
                password: config.DB.DB_ADMIN.DB_PASS,
                host: config.DB.DB_ADMIN.DB_SERVER,
                options: {
                    encrypt: true, // Modificar a false si la conexión es local ya que va sobre http
                },
                requestTimeout: 300000,
            },
            pool: {
                min: 1,
                max: 10,
            },
        }
        const solcompDbSettings = {
            client: config.DB.DB_SOLCOMP.DB_CLIENT,
            connection: {
                database: config.DB.DB_SOLCOMP.DB_NAME,
                user: config.DB.DB_SOLCOMP.DB_USER,
                password: config.DB.DB_SOLCOMP.DB_PASS,
                host: config.DB.DB_SOLCOMP.DB_SERVER,
                options: {
                    encrypt: true, // Modificar a false si la conexión es local ya que va sobre http
                },
                requestTimeout: 300000,
            },
            pool: {
                min: 1,
                max: 10,
            },
        }
        this.dbCollection = {
            DB_ADMIN: knex(adminDbSettings),
            DB_SOLCOMP: knex(solcompDbSettings),
        }
    }

    async getConnection(connectionName: string | false = false): Promise<Knex> {
        try {
            if (connectionName && connectionName != '') return this.dbCollection[connectionName]
            else return this.dbCollection[this.defaultConnectionName]
        } catch (err) {
            console.error(err)
            throw new Error('Error al obtener la conexión a la base de datos')
        }
    }

    getClient(connectionName: string) {
        return config.DB[connectionName]?.DB_CLIENT || 'mssql'
    }
}

export const connection = new Connection()

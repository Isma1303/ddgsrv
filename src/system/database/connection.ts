import knex, { Knex } from 'knex'
import config from '../../config'

class Connection {
    dbCollection: Record<string, any>
    defaultConnectionName = 'DB_codeliq'
    constructor() {
        const codeliqDbSettings = {
            client: config.DB.DB_codeliq.DB_CLIENT,
            connection: {
                database: config.DB.DB_codeliq.DB_NAME,
                user: config.DB.DB_codeliq.DB_USER,
                password: config.DB.DB_codeliq.DB_PASS,
                host: config.DB.DB_codeliq.DB_SERVER,
                port: config.DB.DB_codeliq.DB_PORT,
                ssl: { rejectUnauthorized: false },
            },
            pool: {
                min: 1,
                max: 10,
            },
        }
        this.dbCollection = {
            DB_codeliq: knex(codeliqDbSettings),
        }

        this.dbCollection.DB_codeliq.raw('SELECT 1')
            .then(() => {
                console.log('Database connected')
            })
            .catch((err: any) => {
                console.error('Database connection error:', err.message)
            })
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
        return config.DB.DB_codeliq?.DB_CLIENT || 'mssql'
    }
}

export const connection = new Connection()

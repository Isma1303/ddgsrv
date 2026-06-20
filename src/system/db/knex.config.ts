import knex from "knex";
import { configuration } from "../configuration";

export const knexConfig = {
    client: "pg",
    connection: {
        host: configuration.database.host,
        port: configuration.database.port,
        user: configuration.database.user,
        password: configuration.database.password,
        database: configuration.database.database,
        ssl: {
            rejectUnauthorized: false
        }
    },
    timeout: 30000,
    pool: {
        min: 2,
        max: 10
    }


}

export const db = knex(knexConfig);

export const connection = async () => {
    try {
        await db.raw("SELECT 1")
        console.log("Database connection successfully")
    } catch (error) {
        console.log(error)
    }
}
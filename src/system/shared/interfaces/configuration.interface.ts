export interface Configuration {

    server: {
        port: number
    }

    database: {
        host: string
        port: number
        user: string
        password: string
        database: string
    }

    cors: {
        origin: string
    }

    jwt: {
        secret: string
    }

}
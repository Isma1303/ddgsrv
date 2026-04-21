import Configuration from './system/interfaces/configuration.interface'

const configuration: Configuration = {
    PORT: process.env.PORT || 3000,
    DB: {
        DB_codeliq: {
            DB_USER: process.env.DB_USER || '',
            DB_PASS: process.env.DB_PASS || '',
            DB_SERVER: process.env.DB_SERVER || '',
            DB_NAME: process.env.DB_NAME || '',
            DB_CLIENT: process.env.DB_CLIENT || 'pg',
        },
    },
    JWT_SECRET: process.env.JWT_SECRET || '',
    URL_PROD: process.env.URL_PROD || '',
    URL_DEV: process.env.URL_DEV || 'https://localhost:3000/',
    EMAIL: {
        EMAIL_USER: process.env.EMAIL_USER || '',
        EMAIL_PASS: process.env.EMAIL_PASS || '',
        EMAIL_HOST: process.env.EMAIL_HOST || '',
        EMAIL_PORT: process.env.EMAIL_PORT || '',
        EMAIL_TRANSPORT: (process.env.EMAIL_TRANSPORT as any) || 'nodemailer', // 'nodemailer' or 'auth0'
    },
    OPENAI: {
        BASE_URL: process.env.OPENAI_BASE_URL || '',
        API_KEY: process.env.OPENAI_API_KEY || '',
    },
}

export default configuration

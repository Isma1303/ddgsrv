import Configuration from './system/interfaces/configuration.interface'

const configuration: Configuration = {
    PORT: Number(process.env.PORT)|| 3000,
    DB: {
        DB_codeliq: {
            DB_USER: process.env.DB_USER || '',
            DB_PASS: process.env.DB_PASS || '',
            DB_SERVER: process.env.DB_SERVER || '',
            DB_NAME: process.env.DB_NAME || '',
            DB_CLIENT: process.env.DB_CLIENT || 'pg',
            DB_PORT: Number(process.env.DB_PORT) || 5432,
        },
    },
    JWT_SECRET: process.env.JWT_SECRET || '',
    URL_PROD: process.env.URL_PROD || '',
    URL_DEV: process.env.URL_DEV || 'https://localhost:3000/',
    EMAIL: {
        EMAIL_USER: process.env.EMAIL_USER || '',
        EMAIL_PASS: process.env.EMAIL_PASS || process.env.EMAIL_PASSWORD || '',
        EMAIL_HOST: process.env.EMAIL_HOST || '',
        EMAIL_PORT: process.env.EMAIL_PORT || '',
        EMAIL_TRANSPORT: (process.env.EMAIL_TRANSPORT as any) || 'nodemailer', // 'nodemailer' or 'auth0'
        EMAIL_FROM: process.env.EMAIL_FROM || '',
    },
    LOGO_URL: process.env.LOGO_URL || '',
    CLOUDINARY_URL: {
        CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
        CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
        CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
    },
}

export default configuration

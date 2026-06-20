export default interface Configuration {
    PORT: number | string
    DB: Record<string, Record<string, any>>
    JWT_SECRET: string
    URL_PROD: string
    URL_DEV: string
    EMAIL: {
        EMAIL_USER: string
        EMAIL_PASS: string
        EMAIL_HOST: string
        EMAIL_PORT: string
        EMAIL_TRANSPORT?: 'nodemailer' | 'auth0'
        EMAIL_FROM: string
    }
    LOGO_URL: string
    CLOUDINARY_URL: {
        CLOUDINARY_CLOUD_NAME: string
        CLOUDINARY_API_KEY: string
        CLOUDINARY_API_SECRET: string
    }
}

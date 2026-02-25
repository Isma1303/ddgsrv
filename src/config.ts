import Configuration from './system/interfaces/configuration.interface'

const configuration: Configuration = {
    PORT: process.env.PORT || 3000,
    USE_DASHBOARD_MOCKS: process.env.USE_DASHBOARD_MOCKS ? process.env.USE_DASHBOARD_MOCKS.toString().toLocaleLowerCase() === 'true' : true,
    DB: {
        DB_ADMIN: {
            DB_USER: process.env.DB_ADMIN_USER || '',
            DB_PASS: process.env.DB_ADMIN_PASS || '',
            DB_SERVER: process.env.DB_ADMIN_SERVER || '',
            DB_NAME: process.env.DB_ADMIN_NAME || '',
            DB_CLIENT: process.env.DB_ADMIN_CLIENT || 'mssql',
        },
        DB_SOLCOMP: {
            DB_USER: process.env.DB_SOLCOMP_USER || '',
            DB_PASS: process.env.DB_SOLCOMP_PASS || '',
            DB_SERVER: process.env.DB_SOLCOMP_SERVER || '',
            DB_NAME: process.env.DB_SOLCOMP_NAME || '',
            DB_CLIENT: process.env.DB_SOLCOMP_CLIENT || 'mssql',
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
        EMAIL_SECURE: Boolean(process.env.EMAIL_SECURE?.toString().toLocaleLowerCase() === 'true'),
        EMAIL_SECRET_KEY: process.env.EMAIL_SECRET_KEY || '',
        EMAIL_TRANSPORT: (process.env.EMAIL_TRANSPORT as any) || 'nodemailer', // 'nodemailer' or 'auth0'
    },
    AZURE_AD: {
        AZURE_TENANT_ID: process.env.AZURE_TENANT_ID || '',
        AZURE_CLIENT_ID: process.env.AZURE_CLIENT_ID || '_',
        AZURE_AUTHORITY: process.env.AZURE_AUTHORITY || 'https://login.microsoftonline.com/common',
        AZURE_CLIENT_SECRET: process.env.AZURE_CLIENT_SECRET || '_',
    },
    DATABRICKS: {
        DATABRICKS_INSTANCE: process.env.DATABRICKS_INSTANCE || '',
        DATABRICKS_PERSONAL_TOKEN: process.env.DATABRICKS_PERSONAL_TOKEN || '',
        HTTP_PATH: process.env.DATABRICKS_HTTP_PATH || '',
    },
    AUTH0_EMAIL_AZURE_GRAPH: {
        GRAPH_EMAIL_CLIENT_ID: process.env.GRAPH_EMAIL_CLIENT_ID || '',
        GRAPH_EMAIL_CLIENT_SECRET: process.env.GRAPH_EMAIL_CLIENT_SECRET || '',
        GRAPH_EMAIL_TENANT_ID: process.env.GRAPH_EMAIL_TENANT_ID || '',
        GRAPH_EMAIL_SENDER: process.env.GRAPH_EMAIL_SENDER || '',
    },
    OPENAI: {
        BASE_URL: process.env.OPENAI_BASE_URL || '',
        API_KEY: process.env.OPENAI_API_KEY || '',
    },
}

export default configuration

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
        EMAIL_SECRET_KEY: string
        EMAIL_SECURE?: boolean
        EMAIL_TRANSPORT?: 'nodemailer' | 'auth0'
    }
    AZURE_AD: Record<string, any>
    DATABRICKS: {
        DATABRICKS_INSTANCE: string
        DATABRICKS_PERSONAL_TOKEN: string
        HTTP_PATH: string
    }
    AUTH0_EMAIL_AZURE_GRAPH: {
        GRAPH_EMAIL_CLIENT_ID: string
        GRAPH_EMAIL_CLIENT_SECRET: string
        GRAPH_EMAIL_TENANT_ID: string
        GRAPH_EMAIL_SENDER: string
    }
    USE_DASHBOARD_MOCKS?: boolean
    OPENAI: {
        BASE_URL: string
        API_KEY: string
    }
}

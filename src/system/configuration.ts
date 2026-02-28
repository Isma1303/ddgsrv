import { Configuration } from "./shared/interfaces/configuration.interface";
import dotenv from "dotenv";
dotenv.config();

export const configuration: Configuration = {
    server: {
        port: Number(process.env.PORT) || 3000
    },
    database: {
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER || "postgres",
        password: process.env.DB_PASSWORD || "postgres",
        database: process.env.DB_NAME || "postgres"
    },
    cors: {
        origin: process.env.CORS_ORIGIN || "*"
    },
    jwt: {
        secret: process.env.JWT_SECRET || "secret"
    },
    mailTrap: {
        host: process.env.MAIL_TRAP_HOST || "",
        port: Number(process.env.MAIL_TRAP_PORT) || 1,
        user: process.env.MAIL_TRAP_USER || "",
        password: process.env.MAIL_TRAP_PASSWORD || "",
        from: process.env.MAIL_FROM || ""
    },

    logo_url: process.env.LOGO_URL || ""
}
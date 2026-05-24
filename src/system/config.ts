import Configuration from "./interfaces/configuration.interface";

const configuration: Configuration = {
  PORT: parseInt(process.env.PORT || "3000"),
  DB: {
    DB_USER: process.env.DB_USER || "",
    DB_PASS: process.env.DB_PASS || "",
    DB_SERVER: process.env.DB_SERVER || "",
    DB_NAME: process.env.DB_NAME || "",
    DB_CLIENT: process.env.DB_CLIENT || "pg",
    DB_PORT: parseInt(process.env.DB_PORT || "5432"),
  },
  JWT_SECRET: process.env.JWT_SECRET || "",
  URL_PROD: process.env.URL_PROD || "",
  URL_DEV: process.env.URL_DEV || "https://localhost:3000/",
  EMAIL: {
    EMAIL_USER: process.env.EMAIL_USER || "",
    EMAIL_PASS: process.env.EMAIL_PASS || "",
    EMAIL_HOST: process.env.EMAIL_HOST || "",
    EMAIL_PORT: process.env.EMAIL_PORT || "",
    EMAIL_TRANSPORT: (process.env.EMAIL_TRANSPORT as any) || "nodemailer", // 'nodemailer' or 'auth0'
    EMAIL_FROM: process.env.EMAIL_FROM || "",
  },
};

export default configuration;

export default interface Configuration {
  PORT: number;
  DB: {
    DB_codeliq: {
      DB_USER: string;
      DB_PASS: string;
      DB_SERVER: string;
      DB_NAME: string;
      DB_CLIENT: string;
      DB_PORT: number;
    };
  };
  JWT_SECRET: string;
  URL_PROD: string;
  URL_DEV: string;
  EMAIL: {
    EMAIL_USER: string;
    EMAIL_PASS: string;
    EMAIL_HOST: string;
    EMAIL_PORT: string;
    EMAIL_TRANSPORT?: "nodemailer" | "auth0";
    EMAIL_FROM: string;
  };
  LOGO_URL: string;
  CLOUDINARY_URL: {
    CLOUDINARY_CLOUD_NAME: string;
    CLOUDINARY_API_KEY: string;
    CLOUDINARY_API_SECRET: string;
  };
}

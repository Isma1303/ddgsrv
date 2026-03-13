import express from "express";
import cookieParser from "cookie-parser";
import { connection } from "./system/db/knex.config";
import router from "./system/routes";
import morgan from "morgan";
import cors from "cors";
import { configuration } from "./system/configuration";
const app = express();

connection();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: configuration.cors.origin,
    credentials: true,
  }),
);

app.use("/api/v1", router);

export default app;

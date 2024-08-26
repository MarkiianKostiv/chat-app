import cors from "cors";
import { Express } from "express";
import cookieParser from "cookie-parser";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const securitySetup = (app: Express, express: any) =>
  app.use(cors(corsOptions)).use(express.json()).use(cookieParser());

export default securitySetup;

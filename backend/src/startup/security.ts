import cors from "cors";
import { Express } from "express";
import cookieParser from "cookie-parser";

const securitySetup = (app: Express, express: any) =>
  app.use(cors()).use(express.json()).use(cookieParser());

export default securitySetup;

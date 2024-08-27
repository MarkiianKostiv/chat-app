import cors from "cors";
import { Express } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const localhost = process.env.LOCAL_HOST;
const deployHost = process.env.DEPLOY_HOST;

const corsOptions = {
  origin: [
    `${localhost}`,
    `${deployHost}`,
    "https://chat-20k1y102d-markians-projects.vercel.app",
  ],
  credentials: true,
};

const securitySetup = (app: Express, express: any) =>
  app.use(cors(corsOptions)).use(express.json()).use(cookieParser());

export default securitySetup;

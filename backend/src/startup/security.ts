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
    "https://chat-app-six-beta-83.vercel.app",
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const securitySetup = (app: Express, express: any) =>
  app.use(cors(corsOptions)).use(express.json()).use(cookieParser());

export default securitySetup;

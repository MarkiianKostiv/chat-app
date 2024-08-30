import { Express, Request, Response } from "express";
import UserController from "../controllers/mongoose/user.controller";
import authController from "../controllers/mongoose/auth.controller";
import messagesController from "../controllers/mongoose/messages.controller";
import chatController from "../controllers/mongoose/chat.controllers";
import settingsController from "../controllers/mongoose/user.settings.controller";

const routerSetup = (app: Express) =>
  app

    .get("/", async (req: Request, res: Response) => {
      res.send("Hello From Chat-app API!");
    })
    .use("/users", UserController)
    .use("/auth", authController)
    .use("/messages", messagesController)
    .use("/chat", chatController)
    .use("/settings", settingsController);

export default routerSetup;

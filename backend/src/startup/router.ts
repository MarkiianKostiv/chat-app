import { Express, Request, Response } from "express";
import UserController from "../controllers/mongoose/user.controller";
import authController from "../controllers/mongoose/auth.controller";
import messagesController from "../controllers/mongoose/messages.controller";

const routerSetup = (app: Express) =>
  app

    .get("/", async (req: Request, res: Response) => {
      res.send("Hello Express APIvantage!");
    })
    .use("/users", UserController)
    .use("/auth", authController)
    .use("/messages", messagesController);

export default routerSetup;

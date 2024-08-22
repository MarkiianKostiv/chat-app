import { Router } from "express";
import { sendMessage, getMessages } from "../../services/message.service";
import protectRoute from "../../middlewares/protectroute";

const controller = Router();

controller
  .post("/send/:id", protectRoute, sendMessage)
  .get("/:id", protectRoute, getMessages);

export default controller;

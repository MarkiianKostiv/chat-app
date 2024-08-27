import { Router } from "express";
import protectRoute from "../../middlewares/protectroute";
import { deleteChat } from "../../services/chat.service";

const controller = Router();

controller.delete("/delete/:receiverId", protectRoute, deleteChat);

export default controller;

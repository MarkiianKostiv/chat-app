import { Router } from "express";
import protectRoute from "../../middlewares/protectroute";
import { getUserByIdentifier, getUsers } from "../../services/user.service";

const controller = Router();

controller
  .get("/", protectRoute, getUsers)
  .get("/query", protectRoute, getUserByIdentifier);

export default controller;

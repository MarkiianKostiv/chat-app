import { Router } from "express";
import protectRoute from "../../middlewares/protectroute";
import { updateProfileSettings } from "../../services/user.settings.service";

const controller = Router();

controller.patch("/update", protectRoute, updateProfileSettings);

export default controller;

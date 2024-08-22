import { Router, Request, Response } from "express";
import { login, logout, signup } from "../../services/auth.service";

const controller = Router();

controller
  .post("/sign-up", signup)
  .post("/login", login)
  .post("/logout", logout);

export default controller;

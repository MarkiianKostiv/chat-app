import { Router } from "express";
import {
  login,
  logout,
  signup,
  googleSignUp,
  googleLogin,
} from "../../services/auth.service";

const controller = Router();

controller
  .post("/sign-up", signup)
  .post("/google-sign-up", googleSignUp)
  .post("/login", login)
  .post("/google-login", googleLogin)
  .post("/logout", logout);

export default controller;

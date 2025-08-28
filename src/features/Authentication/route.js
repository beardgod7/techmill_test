import { Router } from "express";
import authController from "./controler.js";

class AuthRoutes {
  constructor() {
    this.router = Router();
    this._initializeRoutes();
  }

  _initializeRoutes() {
    // Register user
    this.router.post("/register", authController.register);

    // Login
    this.router.post("/login", authController.login);

    // Logout
    this.router.post("/logout", authController.logout);

    // Refresh token
    this.router.post("/refresh", authController.refresh);
  }

  getRouter() {
    return this.router;
  }
}

export default new AuthRoutes();

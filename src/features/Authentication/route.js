import { Router } from "express";
import authController from "./controler.js";
import LeakyBucketLimiter from "../../middleware/ratelimiter.js";
import AuthMiddleware from "../../middleware/authentication.js";

class AuthRoutes {
  constructor() {
    this.router = Router();
    this.registerLimiter = new LeakyBucketLimiter({
      maxTokens: 5,
      refillRate: 0.2,
    });
    this.loginLimiter = new LeakyBucketLimiter({
      maxTokens: 3,
      refillRate: 0.1,
    });
    this.refreshLimiter = new LeakyBucketLimiter({
      maxTokens: 10,
      refillRate: 0.5,
    });
    this.authMiddleware = new AuthMiddleware();
    this._initializeRoutes();
  }

  _initializeRoutes() {
    this.router.post(
      "/register",
      this.registerLimiter.middleware(),
      authController.register
    );
    this.router.post(
      "/login",
      this.loginLimiter.middleware(),
      authController.login
    );
    this.router.post("/logout", authController.logout);

    this.router.post(
      "/refresh",
      this.refreshLimiter.middleware(),
      authController.refresh
    );
    this.router.patch(
      "/ban/:userId",
      this.authMiddleware.authenticate(),
      this.authMiddleware.authorize("Admin"),
      authController.setBanStatus
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new AuthRoutes();

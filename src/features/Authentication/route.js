import { Router } from "express";
import authController from "./controler.js";
import LeakyBucketLimiter from "../../middleware/ratelimiter.js";

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
  }

  getRouter() {
    return this.router;
  }
}

export default new AuthRoutes();

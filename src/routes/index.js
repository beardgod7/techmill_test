import { Router } from "express";
import authRoutes from "../features/Authentication/route.js";
import ProductRoutes from "../features/Product/route.js";

class ApiRoutes {
  constructor() {
    this.router = Router();
    this._initializeRoutes();
  }

  _initializeRoutes() {
    this.router.use("/auth", authRoutes.getRouter());
    this.router.use("/product", ProductRoutes.getRouter());

    this.router.use("*", (req, res) => {
      res.status(404).json({ message: "API endpoint not found" });
    });
  }

  getRouter() {
    return this.router;
  }
}

export default new ApiRoutes();

import { Router } from "express";
import ProductController from "./controller.js";
import AuthMiddleware from "../../middleware/authentication.js";

class ProductRoutes {
  constructor() {
    this.router = Router();
    this.authMiddleware = new AuthMiddleware();
    this._initializeRoutes();
  }

  _initializeRoutes() {
    // Public routes
    this.router.get("/", ProductController.getAll);
    // Routes for authenticated users (User role)
    this.router.post(
      "/create",
      this.authMiddleware.authenticate(),
      this.authMiddleware.authorize("User"),
      ProductController.create
    );

    this.router.put(
      "/update/:id",
      this.authMiddleware.authenticate(),
      this.authMiddleware.authorize("User"),
      ProductController.update
    );

    this.router.get(
      "/user/products",
      this.authMiddleware.authenticate(),
      this.authMiddleware.authorize("User"),
      ProductController.getByUser
    );

    this.router.delete(
      "/delete/:id",
      this.authMiddleware.authenticate(),
      this.authMiddleware.authorize("User"),
      ProductController.delete
    );

    // Admin route to approve/unapprove product
    this.router.patch(
      "/:id/approve",
      this.authMiddleware.authenticate(),
      this.authMiddleware.authorize("Admin"),
      ProductController.approve
    );
  }

  getRouter() {
    return this.router;
  }
}

export default new ProductRoutes();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();
export default class App {
  constructor() {
    this.app = express();
    this._initializeMiddlewares();
  }

  _initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(morgan("combined"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  getExpressInstance() {
    return this.app;
  }
}

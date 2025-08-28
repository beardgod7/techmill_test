import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

class Database {
  constructor() {
    this.sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: "postgres",
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
        logging: false,
      }
    );
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("✅ Database connected successfully!");
    } catch (error) {
      console.error("❌ Error connecting to the database:", error);
    }
  }

  getInstance() {
    return this.sequelize;
  }
}

// create a single instance (singleton)
const database = new Database();

export default database;

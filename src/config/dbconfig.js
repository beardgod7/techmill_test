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
        pool: {
          max: 20,
          min: 5,
          acquire: 30000,
          idle: 10000,
        },
      }
    );
  }

  async connect() {
    try {
      await this.sequelize.authenticate();
      console.log("✅ Database connected successfully!");

      // Warm up pool immediately
      await this.warmUpPool(5); // create 5 initial connections
    } catch (error) {
      console.error("❌ Error connecting to the database:", error);
    }
  }

  async warmUpPool(connections = 5) {
    const queries = Array.from({ length: connections }, () =>
      this.sequelize.query("SELECT 1")
    );
    await Promise.all(queries);
    console.log(`🔄 Database pool warmed up with ${connections} connections`);
  }

  getInstance() {
    return this.sequelize;
  }
}

const database = new Database();
export default database;

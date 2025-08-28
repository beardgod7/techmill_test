import { DataTypes, Model } from "sequelize";
import database from "../../../config/dbconfig.js";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM("User", "Admin"), defaultValue: "User" },
    isBanned: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize: database.getInstance(),
    modelName: "User",
    tableName: "users",
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["email"],
      },
    ],
  }
);

export default User;

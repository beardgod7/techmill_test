import { DataTypes, Model } from "sequelize";
import database from "../../../config/dbconfig.js";

import User from "./user.model.js";

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.ENUM("access", "refresh"),
      allowNull: false,
      defaultValue: "refresh",
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize: database.getInstance(),
    modelName: "Token",
    tableName: "tokens",
    timestamps: true,
  }
);

// Associations
Token.belongsTo(User, { foreignKey: "userId", onDelete: "CASCADE" });
User.hasMany(Token, { foreignKey: "userId" });

export default Token;

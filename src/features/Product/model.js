import { DataTypes, Model } from "sequelize";
import database from "../../config/dbconfig.js";

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
    userId: { type: DataTypes.UUID, allowNull: false },
  },
  {
    sequelize: database.getInstance(),
    modelName: "Product",
    tableName: "products",
    timestamps: true,
  }
);

export default Product;

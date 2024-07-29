import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Author = sequelize.define(
  "Author",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "authors",
    timestamps: true,
  },
);

export default Author;

import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Author from "./author.js";
import Category from "./category.js";

class Book extends Model {}

Book.init(
  {
    book_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Author,
        key: "id",
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
    isbn: {
      type: DataTypes.STRING,
      unique: true,
    },
    publicationYear: {
      type: DataTypes.INTEGER,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "books",
    timestamps: true,
  },
);

export default Book;

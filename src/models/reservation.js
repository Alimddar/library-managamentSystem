import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import User from "./user.js";
import Book from "./book.js";

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    reservationDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    status: {
      type: DataTypes.ENUM("active", "fulfilled", "cancelled"),
      defaultValue: "active",
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "user_id",
      },
    },
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: Book,
        key: "book_id",
      },
    },
  },
  {
    tableName: "reservations",
    timestamps: true,
  },
);

export default Reservation;

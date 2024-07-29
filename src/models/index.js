import User from "./user.js";
import Book from "./book.js";
import Author from "./author.js";
import Category from "./category.js";
import Reservation from "./reservation.js";

// Define relationships
User.hasMany(Reservation, { foreignKey: "userId" });
Reservation.belongsTo(User, { foreignKey: "userId" });

Book.hasMany(Reservation, { foreignKey: "bookId" });
Reservation.belongsTo(Book, { foreignKey: "bookId" });

Book.belongsTo(Author, { foreignKey: "authorId" });
Author.hasMany(Book, { foreignKey: "authorId" });

Book.belongsToMany(Category, {
  through: "BookCategories",
  foreignKey: "bookId",
});
Category.belongsToMany(Book, {
  through: "BookCategories",
  foreignKey: "categoryId",
});

export default {
  User,
  Book,
  Author,
  Category,
  Reservation,
};

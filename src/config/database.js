import { Sequelize } from "sequelize";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sequelize = new Sequelize({
  storage: path.join(__dirname, "..", "..", "database.sqlite"),
  dialect: "sqlite",
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

export const initializeDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error during database synchronization:", error);
  }
};

export const dropDatabase = async () => {
  try {
    await sequelize.drop();
    console.log("All models were dropped successfully.");
  } catch (error) {
    console.error("Unable to drop the database:", error);
  }
};

export default sequelize;

import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser';
import userRoutes from "./src/routes/userRoutes.js";
import authorRoutes from "./src/routes/authorRoutes.js";
import authenticateToken from "./src/middlewares/authMiddleware.js";
import { initializeDatabase, dropDatabase } from "./src/config/database.js";

// Load environment variables from a .env file into process.env
dotenv.config();

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; 

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the API! Navigate to /api/v1 for the available endpoints.");
});

app.use("/api/users", userRoutes);
app.use("/api/authors", authenticateToken, authorRoutes);

// Uncomment to initialize the database schema
// initializeDatabase();

// Uncomment to drop the database schema
// dropDatabase();

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
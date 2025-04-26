import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import {connectDB} from "./db/db.js";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";
// Import models before syncing DB
import "./models/user.js"; // defines Users
import "./models/contact.js";
import errorHandler from "./middlewares/errorHandler.js"; // defines Contacts (with FK to Users)

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contacts", contactsRouter);
app.use("/api/auth", authRouter);

// Not found handler
app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use((_, res) => {
  res.status(500).json({ message: "Server error" });
});

// Custom error handler formatting error response as JSON
app.use(errorHandler);

// Connect DB and start server
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to the database:", error.message);
    process.exit(1);
  });

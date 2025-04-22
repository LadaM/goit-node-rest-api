import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true, // Enforces SSL
      rejectUnauthorized: false, // Allows self-signed certificates
    },
  },
  logging: false, // Disable logging for cleaner output
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful");
    await sequelize.sync(); // Ensures tables are created
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1); // Exit process on failure
  }
};

export default sequelize;

import dotenv from "dotenv";
dotenv.config(); // ✅ MUST come before using process.env.DATABASE_URL

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection successful");
    await sequelize.sync({ force: true });
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

export default sequelize;

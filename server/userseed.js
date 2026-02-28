import User from "./models/userModel.js";
import bcrypt from "bcryptjs";
import connectDB from "./db/db.js";
import dotenv from "dotenv";
dotenv.config();

const userRegister = async () => {
  connectDB();
  try {
    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });
    await newUser.save();
    console.log("Admin was created");
  } catch (err) {
    console.log("Error in user seeding:", err);
  }
};

userRegister();

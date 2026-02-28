import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authMiddleware = async (req, res, next) => {
  try {
    console.log("AUTH HEADER:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("NO TOKEN PROVIDED");
      return res
        .status(401)
        .json({ success: false, error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    console.log("TOKEN RECEIVED:", token);

    console.log("JWT_SECRET IN MIDDLEWARE:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED TOKEN:", decoded);

    const user = await User.findById(decoded.id).select("-password");
    console.log("USER FROM TOKEN:", user?._id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error.message);
    res.status(401).json({ success: false, error: "Invalid or expired token" });
  }
};

export default authMiddleware;

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import departmentRouter from "./routes/department.js";
import employeeRouter from "./routes/employee.js";
import salaryRouter from "./routes/salary.js";
import leaveRouter from "./routes/leave.js";
import dashboardRoutes from "./routes/dashboard.js";

import dotenv from "dotenv";
dotenv.config();
import connectToDatabase from "./db/db.js";

console.log("JWT_SECRET:", process.env.JWT_SECRET);
connectToDatabase();

const app = express();

import cors from "cors";

app.use(
  cors({
    origin: "https://your-frontend-url.onrender.com",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public/uploads"));

app.use("/api/auth", authRoutes);
app.use("/api/department", departmentRouter);
app.use("/api/employee", employeeRouter);
app.use("/api/salary", salaryRouter);
app.use("/api/leave", leaveRouter);
app.use("/api/admin-dashboard/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

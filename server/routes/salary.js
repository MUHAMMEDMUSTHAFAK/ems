import express from "express";
import authMiddileware from "../middleware/authMiddileware.js";
import { addSalary,getSalary } from "../controllers/salaryController.js";
const router = express.Router();


router.post("/add", authMiddileware, addSalary )
router.get("/:id", authMiddileware, getSalary )





export default router;

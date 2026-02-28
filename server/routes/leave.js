import express from "express";
import authMiddileware from "../middleware/authMiddileware.js";
import { addLeave, getLeave, getLeaves, getLeaveDetail, updateLeave } from "../controllers/leaveController.js";

const router = express.Router();

router.post("/add", authMiddileware, addLeave);
router.get("/detail/:id", authMiddileware, getLeaveDetail); // ⬅ move this above "/:id"
router.get("/:id", authMiddileware, getLeave);
router.get("/", authMiddileware, getLeaves);
router.put("/:id", authMiddileware, updateLeave);

export default router;

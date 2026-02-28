import express from "express";
import authMiddileware from "../middleware/authMiddileware.js";
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee,fetchEmployeesByDepId} from "../controllers/employeeController.js";
const router = express.Router();

router.get('/',authMiddileware, getEmployees)
router.post("/add", authMiddileware, upload.single("image"), addEmployee);
router.get('/:id',authMiddileware, getEmployee)
router.put('/:id',authMiddileware, updateEmployee)
router.get('/department/:id',authMiddileware ,fetchEmployeesByDepId )
export default router;

import { addEmployee, getEmployees, updateEmployee, deleteEmployee, getEmployeeById } from "../controllers/employeeConterller.ts";
import { Router } from "express";
const empRouter = Router();


empRouter.post("/add", addEmployee);
empRouter.put("/update/:id", updateEmployee);
empRouter.get("/all", getEmployees);
empRouter.delete("/delete/:id", deleteEmployee);
empRouter.get("/get/:id", getEmployeeById);
export default empRouter;
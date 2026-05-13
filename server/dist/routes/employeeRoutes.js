import { Router } from "express";
const empRouter = Router();
import { addEmployee } from "../controllers/employeeConterller";
empRouter.post("/add", addEmployee);
export default empRouter;
//# sourceMappingURL=employeeRoutes.js.map
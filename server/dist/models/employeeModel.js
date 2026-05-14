import mongoose, { Document } from "mongoose";
const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
}, { timestamps: true });
const employeeModel = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);
export default employeeModel;
//# sourceMappingURL=employeeModel.js.map
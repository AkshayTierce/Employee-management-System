import mongoose, { Document } from "mongoose";

interface IEmployee extends Document {
    name: string;
    email: string;
    position: string;
    salary: number;
}

const employeeSchema = new mongoose.Schema<IEmployee>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    position:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    }
}, { timestamps:true })

const employeeModel = mongoose.models.Employee || mongoose.model<IEmployee>("Employee", employeeSchema)

export default employeeModel;
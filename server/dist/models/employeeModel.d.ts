import mongoose, { Document } from "mongoose";
interface IEmployee extends Document {
    name: string;
    email: string;
    position: string;
    salary: number;
}
declare const employeeModel: mongoose.Model<any, {}, {}, {}, any, any, any> | mongoose.Model<IEmployee, {}, {}, {}, mongoose.Document<unknown, {}, IEmployee, {}, mongoose.DefaultSchemaOptions> & IEmployee & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IEmployee>;
export default employeeModel;
//# sourceMappingURL=employeeModel.d.ts.map
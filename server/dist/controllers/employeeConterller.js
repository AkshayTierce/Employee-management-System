import express from 'express';
import employeeModel from '../models/employeeModel';
export const addEmployee = async (req, res) => {
    try {
        const { name, email, position, salary } = req.body;
        if (!name || !email || !position || !salary) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // @ts-ignore
        const alreadyExists = await employeeModel.findOne({ email }); // Placeholder for checking if employee already exists
        if (alreadyExists) {
            return res.status(400).json({ message: "Employee with this email already exists" });
        }
        const newEmployee = await employeeModel.create({ name, email, position, salary });
        // Save employee to database (not implemented here)
        res.status(201).json({
            message: "Employee added successfully",
            employee: newEmployee,
            success: true
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "An error occurred",
            success: false
        });
    }
};
//# sourceMappingURL=employeeConterller.js.map
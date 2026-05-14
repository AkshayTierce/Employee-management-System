import express from 'express';
import employeeModel from "../models/employeeModel.js";
export const addEmployee = async (req, res) => {
    try {
        const { name, email, position, salary } = req.body;
        if (!name || !email || !position || !salary) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // @ts-ignore
        const alreadyExists = await employeeModel.findOne({ email });
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
export const getEmployees = async (req, res) => {
    try {
        const employees = await employeeModel.find();
        res.status(200).json({
            message: "Employees fetched successfully",
            employees,
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
export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, position, salary } = req.body;
        if (!name || !email || !position || !salary) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!id) {
            return res.status(400).json({ message: "Employee ID is required" });
        }
        // @ts-ignore
        const updatedEmployee = await employeeModel.findByIdAndUpdate(id, { name, email, position, salary }, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({
            message: "Employee updated successfully",
            employee: updatedEmployee,
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
export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Employee ID is required" });
        }
        // @ts-ignore
        const deletedEmployee = await employeeModel.findByIdAndDelete(id);
        if (!deletedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({
            message: "Employee deleted successfully",
            employee: deletedEmployee,
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
export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "Employee ID is required" });
        }
        // @ts-ignore
        const employee = await employeeModel.findById(id);
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({
            message: "Employee fetched successfully",
            employee,
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
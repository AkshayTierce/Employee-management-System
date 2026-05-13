"use client";

import { useEffect, useState } from "react";
import EmployeeCard, { Employee } from "@/components/EmployeeCard";
import EmployeeForm, { EmployeeFormData } from "@/components/EmployeeForm";
import StatCard from "@/components/StatCard";
import { useToast } from "@/context/ToastContext";
import axios from "axios";

const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

export default function Home() {
  const { addToast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Employee | null>(null);

  const getEmployees = async () => {
    try {
      const res = await axios.get(`${apiBase}/all`);

      if (res.data.success) {
        setEmployees(res.data.employees);
      } else {
        console.error("Failed to fetch employees:", res.data.message);
        addToast("Failed to load employees", "error");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
      addToast("Error loading employees", "error");
    }
  };

  useEffect(() => {
    getEmployees();
  }, []);

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (emp: Employee) => {
    setEditing(emp);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this employee?")) return;

    const previousEmployees = employees;
    setEmployees((prev) => prev.filter((e) => e._id !== id));

    try {
      const res = await axios.delete(`${apiBase}/delete/${id}`);
      if (!res.data.success) {
        throw new Error(res.data.message || "Delete failed");
      }
      addToast("Employee deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting employee:", error);
      setEmployees(previousEmployees);
      addToast("Unable to delete employee. Please try again.", "error");
    }
  };

  const handleSubmit = async (data: EmployeeFormData) => {
    if (editing) {
      try {
        const res = await axios.put(`${apiBase}/update/${editing._id}`, data);
        if (res.data.success && res.data.employee) {
          setEmployees((prev) => prev.map((e) => (e._id === editing._id ? res.data.employee : e)));
          setShowForm(false);
          setEditing(null);
          addToast("Employee updated successfully", "success");
        } else {
          throw new Error(res.data.message || "Update failed");
        }
      } catch (error) {
        console.error("Error updating employee:", error);
        addToast("Unable to update employee. Please try again.", "error");
      }
    } else {
      try {
        const res = await axios.post(`${apiBase}/add`, data);
        if (res.data.success && res.data.employee) {
          setEmployees((prev) => [res.data.employee, ...prev]);
          setShowForm(false);
          addToast("Employee added successfully", "success");
        } else {
          throw new Error(res.data.message || "Create failed");
        }
      } catch (error) {
        console.error("Error adding employee:", error);
        addToast("Unable to add employee. Please try again.", "error");
      }
    }
  };

  const avgSalary = employees.length
    ? employees.reduce((s, e) => s + Number(e.salary), 0) / employees.length
    : 0;

  const avgSalaryFormatted = `₹${avgSalary.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

  const uniquePositions = new Set(employees.map((e) => e.position)).size;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-12">

        {/* ── Header ── */}
        <div className="flex items-start justify-between mb-10 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Employee Management</h1>
            <p className="text-sm text-gray-400 mt-1">Manage your team records</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-xl hover:bg-gray-700 active:scale-95 transition-all"
          >
            <span className="text-base leading-none">+</span> Add Employee
          </button>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard label="Total Employees" value={employees.length} sub="All records" accent="blue" />
          <StatCard label="Positions" value={uniquePositions} sub="Unique roles" accent="amber" />
        </div>

        {/* ── Section header ── */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-semibold text-gray-700">All Employees</h2>
          <span className="text-xs text-gray-400 bg-gray-100 px-2.5 py-1 rounded-full">
            {employees.length} record{employees.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* ── Employee Grid ── */}
        {employees.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-gray-200 rounded-xl bg-white">
            <span className="text-4xl mb-3">👤</span>
            <p className="text-base font-semibold text-gray-700">No employees yet</p>
            <p className="text-sm text-gray-400 mt-1">Click "Add Employee" to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {employees.map((emp) => (
              <EmployeeCard key={emp._id} employee={emp} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>

      {/* ── Modal ── */}
      {showForm && (
        <EmployeeForm employee={editing} onSubmit={handleSubmit} onClose={() => setShowForm(false)} />
      )}
    </main>
  );
}

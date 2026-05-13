"use client";

import { useState, useEffect } from "react";
import { Employee } from "./EmployeeCard";

export interface EmployeeFormData {
  name: string;
  email: string;
  position: string;
  salary: number;
}

interface EmployeeFormProps {
  employee?: Employee | null;
  onSubmit: (data: EmployeeFormData) => void;
  onClose: () => void;
}

const empty: EmployeeFormData = { name: "", email: "", position: "", salary: 0 };

const inputClass =
  "w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all placeholder:text-gray-400";

export default function EmployeeForm({ employee, onSubmit, onClose }: EmployeeFormProps) {
  const [form, setForm] = useState<EmployeeFormData>(empty);

  useEffect(() => {
    setForm(employee ? { name: employee.name, email: employee.email, position: employee.position, salary: employee.salary } : empty);
  }, [employee]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "salary" ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 animate-[slideUp_0.2s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {employee ? "Edit Employee" : "Add New Employee"}
          </h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 text-xs hover:bg-gray-50 transition-colors">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Full Name</label>
            <input name="name" type="text" placeholder="e.g. Arjun Kumar" value={form.name} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Email</label>
            <input name="email" type="email" placeholder="e.g. arjun@company.com" value={form.email} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Position</label>
            <input name="position" type="text" placeholder="e.g. Frontend Developer" value={form.position} onChange={handleChange} className={inputClass} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-600">Salary (per month)</label>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 focus-within:bg-white transition-all">
              <span className="px-3 py-2.5 text-sm font-bold text-gray-500 bg-white border-r border-gray-200">₹</span>
              <input name="salary" type="number" placeholder="e.g. 75000" value={form.salary || ""} onChange={handleChange} min={0} className="flex-1 px-3 py-2.5 text-sm font-mono bg-transparent outline-none" />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 text-sm font-semibold text-white bg-gray-900 rounded-lg hover:bg-gray-700 active:scale-95 transition-all">
              {employee ? "Update" : "Save Employee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

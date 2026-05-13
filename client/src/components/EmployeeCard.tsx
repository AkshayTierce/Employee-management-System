"use client";

export interface Employee {
  _id: string;
  name: string;
  email: string;
  position: string;
  salary: number;
}

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const avatarColors = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-rose-100 text-rose-700",
  "bg-amber-100 text-amber-700",
  "bg-teal-100 text-teal-700",
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

function getColor(name: string) {
  return avatarColors[name.charCodeAt(0) % avatarColors.length];
}

export default function EmployeeCard({ employee, onEdit, onDelete }: EmployeeCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold ${getColor(employee.name)}`}>
          {getInitials(employee.name)}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(employee)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-sm hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
          >
            ✏️
          </button>
          <button
            onClick={() => onDelete(employee._id)}
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-sm hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
          >
            🗑️
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-base font-semibold text-gray-900">{employee.name}</h3>
        <p className="text-sm text-gray-400 mt-0.5">{employee.email}</p>
        <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
          {employee.position}
        </span>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-400">Monthly Salary</span>
        <span className="text-base font-bold font-mono text-green-700">
          ₹{employee.salary.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
}

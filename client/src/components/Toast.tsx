"use client";

import { Toast as ToastType, useToast } from "@/context/ToastContext";
import { useEffect } from "react";

export function Toast({ toast }: { toast: ToastType }) {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(toast.id);
    }, 3000);
    return () => clearTimeout(timer);
  }, [toast.id, removeToast]);

  const bgColor = {
    success: "bg-green-50 border-green-200",
    error: "bg-red-50 border-red-200",
    warning: "bg-amber-50 border-amber-200",
    info: "bg-blue-50 border-blue-200",
  }[toast.type];

  const textColor = {
    success: "text-green-800",
    error: "text-red-800",
    warning: "text-amber-800",
    info: "text-blue-800",
  }[toast.type];

  const iconColor = {
    success: "text-green-600",
    error: "text-red-600",
    warning: "text-amber-600",
    info: "text-blue-600",
  }[toast.type];

  const icon = {
    success: "✓",
    error: "✕",
    warning: "⚠",
    info: "ℹ",
  }[toast.type];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${bgColor} ${textColor} text-sm font-medium animate-[slideInRight_0.3s_ease] shadow-md`}
    >
      <span className={`text-lg font-bold ${iconColor}`}>{icon}</span>
      <span>{toast.message}</span>
      <button
        onClick={() => removeToast(toast.id)}
        className="ml-auto text-xs opacity-50 hover:opacity-100 transition-opacity"
      >
        ✕
      </button>
    </div>
  );
}

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
}

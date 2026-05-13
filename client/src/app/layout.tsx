import type { Metadata } from "next";
import { ToastProvider } from "@/context/ToastContext";
import { ToastContainer } from "@/components/Toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Employee Management",
  description: "Manage your team records",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ToastProvider>
          {children}
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  );
}

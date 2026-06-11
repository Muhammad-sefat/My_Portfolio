"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: "success" | "destructive" | "info";
}

interface ToastContextType {
  toast: (options: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(({ title, description, variant = "info" }: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, variant }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-start gap-3 rounded-2xl border p-4 shadow-lg transition-all duration-300 transform translate-y-0 animate-in fade-in slide-in-from-bottom-4 ${
              t.variant === "success"
                ? "bg-[#0d0d0e]/95 border-emerald-500/30 text-white"
                : t.variant === "destructive"
                ? "bg-[#0d0d0e]/95 border-red-500/30 text-white"
                : "bg-[#0d0d0e]/95 border-neutral-900 text-white"
            }`}
          >
            {t.variant === "success" && (
              <CheckCircle className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            )}
            {t.variant === "destructive" && (
              <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            )}
            {t.variant === "info" && (
              <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            )}

            <div className="flex-1">
              <h4 className="text-sm font-semibold">{t.title}</h4>
              {t.description && (
                <p className="mt-1 text-xs text-neutral-400">{t.description}</p>
              )}
            </div>

            <button
              onClick={() => removeToast(t.id)}
              className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-900 hover:text-white transition-colors flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

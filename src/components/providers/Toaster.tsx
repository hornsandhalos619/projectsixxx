"use client";

import { useToastStore } from "./ToastProvider";
import { AnimatePresence, motion } from "framer-motion";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info, Sparkles } from "lucide-react";

const iconComponents = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
  ritual: Sparkles,
} as const;

type ToastType = keyof typeof iconComponents;

const styles: Record<ToastType, string> = {
  success: "bg-void-800 border-wine-400/50 text-pallor-100",
  error: "bg-void-800 border-blood-400/50 text-pallor-100",
  warning: "bg-void-800 border-wine-400/50 text-wine-300",
  info: "bg-void-800 border-border-subtle text-pallor-200",
  ritual: "bg-void-800 border-blood-400/50 text-blood-400",
};

export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  return (
    <AnimatePresence mode="popLayout">
      {toasts.map((toast) => {
        const Icon = iconComponents[toast.type as ToastType];
        return (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={`fixed bottom-6 right-6 z-[100] max-w-sm ${styles[toast.type as ToastType]} border rounded-xl p-4 shadow-velvet backdrop-blur-xl glass animate-sigh`}
            role="alert"
            aria-live="polite"
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0 pt-0.5">
                <Icon className="w-5 h-5" aria-hidden="true" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display-alt text-step-1 font-semibold">{toast.title}</p>
                {toast.message && (
                  <p className="font-ui text-step-0 text-pallor-300 mt-1">{toast.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-1">
                {toast.action && (
                  <button
                    onClick={() => {
                      toast.action?.onClick();
                      removeToast(toast.id);
                    }}
                    className="font-ui text-step-0 text-wine-400 hover:text-wine-300 underline underline-offset-1"
                  >
                    {toast.action.label}
                  </button>
                )}
                <button
                  onClick={() => removeToast(toast.id)}
                  className="font-ui text-step-0 text-pallor-400 hover:text-pallor-200"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
}
"use client";

import { ReactNode } from "react";
import { QueryProvider } from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";
import { GSAPProvider } from "./GSAPProvider";
import { CartProvider } from "./CartProvider";
import { ToastProvider } from "./ToastProvider";
import { Toaster } from "./Toaster";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <AuthProvider>
        <GSAPProvider>
          <CartProvider>
            <ToastProvider>
              {children}
              <Toaster />
            </ToastProvider>
          </CartProvider>
        </GSAPProvider>
      </AuthProvider>
    </QueryProvider>
  );
}
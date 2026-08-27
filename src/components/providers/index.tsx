"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { GSAPProvider } from "@/components/providers/GSAPProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="nocturne-theme">
      <QueryProvider>
        <AuthProvider>
          <GSAPProvider>{children}</GSAPProvider>
        </AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
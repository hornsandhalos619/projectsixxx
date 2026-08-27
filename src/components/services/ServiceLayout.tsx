"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ServiceLayoutProps {
  children: ReactNode;
  className?: string;
}

export function ServiceLayout({ children, className }: ServiceLayoutProps) {
  return (
    <div className={cn("min-h-screen", className)}>
      <div className="relative z-10">{children}</div>
      <div className="fixed inset-0 -z-10 texture-cracked-obsidian pointer-events-none" aria-hidden="true" />
      <div className="fixed inset-0 -z-10 texture-gold-leaf pointer-events-none" aria-hidden="true" />
    </div>
  );
}
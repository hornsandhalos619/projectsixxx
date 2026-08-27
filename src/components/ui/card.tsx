"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "velvet" | "obsidian" | "elevated" | "bordered";
  interactive?: boolean;
  padded?: boolean;
}

const cardVariants = {
  default: "bg-void-800 border border-border-subtle",
  velvet: "bg-void-800 texture-velvet relative overflow-hidden",
  obsidian: "bg-void-900 texture-cracked-obsidian relative overflow-hidden",
  elevated: "bg-void-700 border border-border-subtle shadow-velvet",
  bordered: "bg-transparent border border-wine-400/30",
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", interactive = false, padded = true, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-none transition-all duration-300 ease-caress",
          cardVariants[variant],
          interactive && "hover:border-blood-400/50 hover:shadow-blood-glow cursor-pointer",
          padded && "p-5 md:p-6",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mb-4", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("font-display text-step-3 text-pallor-100 tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("font-body text-pallor-300 mt-1", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mt-4 flex items-center gap-3", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export const CardMedia = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { aspectRatio?: string }>(
  ({ className, aspectRatio = "16/9", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
);
CardMedia.displayName = "CardMedia";
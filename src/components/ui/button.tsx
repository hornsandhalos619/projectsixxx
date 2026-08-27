"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-ui font-medium transition-all duration-200 ease-flutter " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blood-400 focus-visible:ring-offset-2 " +
    "focus-visible:ring-offset-void-900 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        ritual:
          "btn-ritual px-6 py-3 text-sm uppercase tracking-wider",
        "ritual-secondary":
          "btn-ritual-secondary px-6 py-3 text-sm uppercase tracking-wider",
        ghost: "btn-ritual-ghost px-4 py-2 text-sm",
        velvet: "bg-void-800 border border-void-700 text-pallor-100 hover:border-wine-400 hover:bg-void-700 px-5 py-2.5 rounded-none",
        blood: "bg-blood-500 text-pallor-50 hover:bg-blood-400 px-5 py-2.5 rounded-none",
        wine: "bg-wine-500 text-pallor-50 hover:bg-wine-400 px-5 py-2.5 rounded-none",
      },
      size: {
        sm: "px-3 py-1.5 text-xs",
        md: "px-5 py-2.5 text-sm",
        lg: "px-7 py-3.5 text-base",
        xl: "px-10 py-4 text-lg",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "velvet",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      loading = false,
      iconLeft,
      iconRight,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Summoning...</span>
          </>
        ) : (
          <>
            {iconLeft && <span className="flex-shrink-0">{iconLeft}</span>}
            {children}
            {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
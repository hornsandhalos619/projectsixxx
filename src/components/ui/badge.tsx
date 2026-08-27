import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-step--2 font-ui font-medium transition-all duration-flutter ease-flutter",
  {
    variants: {
      variant: {
        blood: "bg-blood-400/20 text-blood-300 border border-blood-400/30 hover:bg-blood-400/30 hover:border-blood-400",
        wine: "bg-wine-400/20 text-wine-300 border border-wine-400/30 hover:bg-wine-400/30 hover:border-wine-400",
        pallor: "bg-pallor-200/20 text-pallor-100 border border-pallor-200/30 hover:bg-pallor-200/30 hover:border-pallor-200",
        void: "bg-void-700 text-pallor-300 border border-border-subtle hover:bg-void-600 hover:text-pallor-200",
        gold: "bg-gradient-to-r from-wine-300 to-wine-500 text-void-950 border border-wine-400/50 shadow-wine-glow/20",
        rose: "bg-gradient-to-r from-blood-400 to-blood-600 text-pallor-50 border border-blood-400/50 shadow-blood-glow/20",
        outline: "bg-transparent text-pallor-300 border border-border-subtle hover:border-wine-400 hover:text-wine-300",
      },
      size: {
        xs: "px-2 py-0.5 text-step--2 gap-1",
        sm: "px-2.5 py-0.5 text-step--1 gap-1",
        md: "px-3 py-1 text-step-0 gap-1.5",
        lg: "px-4 py-1.5 text-step-1 gap-2",
      },
      dot: {
        true: "relative pl-6 before:absolute before:left-2 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-current",
      },
      pulse: {
        true: "animate-blood-pulse",
      },
    },
    defaultVariants: {
      variant: "blood",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
  pulse?: boolean;
  icon?: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, pulse, icon, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, dot, pulse }), className)}
        {...props}
      >
        {icon && <span className="flex items-center" aria-hidden="true">{icon}</span>}
        {children}
      </span>
    );
  }
);
Badge.displayName = "Badge";

export { Badge, badgeVariants };
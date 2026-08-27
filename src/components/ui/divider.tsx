import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const dividerVariants = cva("w-full", {
  variants: {
    variant: {
      default: "border-t border-border-subtle",
      blood: "border-t border-blood-400/30",
      "blood-gradient": "h-px bg-gradient-to-r from-transparent via-blood-400 to-transparent border-0",
      wine: "border-t border-wine-400/30",
      "wine-gradient": "h-px bg-gradient-to-r from-transparent via-wine-400 to-transparent border-0",
      velvet: "border-t border-blood-400/10",
      "velvet-fade": "h-px bg-gradient-to-r from-transparent via-blood-400/20 to-transparent border-0",
      gold: "border-t border-wine-300/30",
      "gold-leaf": "relative h-px bg-gradient-to-r from-transparent via-wine-300 to-transparent border-0 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-4 before:h-4 before:bg-wine-300 before:rounded-full before:opacity-60",
      ornate: "relative h-px bg-gradient-to-r from-transparent via-blood-400 to-transparent border-0 before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-8 before:h-px before:bg-blood-400 after:absolute after:left-1/2 after:top-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:w-8 after:h-px after:bg-blood-400",
      double: "border-y border-border-subtle py-1",
      dashed: "border-t-2 border-dashed border-border-subtle",
    },
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    },
    thickness: {
      thin: "border-t",
      medium: "border-t-2",
      thick: "border-t-4",
    },
  },
  defaultVariants: {
    variant: "default",
    orientation: "horizontal",
    thickness: "thin",
  },
});

export interface DividerProps
  extends React.HTMLAttributes<HTMLHRElement>,
    VariantProps<typeof dividerVariants> {
  children?: React.ReactNode;
  className?: string;
}

const Divider = React.forwardRef<HTMLHRElement, DividerProps>(
  ({ className, variant, orientation, thickness, children, ...props }, ref) => {
    if (children) {
      return (
        <div
          ref={ref}
          className={cn("flex items-center gap-4", className)}
          role="separator"
          aria-orientation={orientation}
          {...props}
        >
          <hr className={cn(dividerVariants({ variant, orientation: "horizontal", thickness }), "flex-1")} aria-hidden="true" />
          <span className="font-ui text-step--1 text-pallor-400 uppercase tracking-wider whitespace-nowrap">{children}</span>
          <hr className={cn(dividerVariants({ variant, orientation: "horizontal", thickness }), "flex-1")} aria-hidden="true" />
        </div>
      );
    }

    return (
      <hr
        ref={ref}
        className={cn(dividerVariants({ variant, orientation, thickness }), className)}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    );
  }
);
Divider.displayName = "Divider";

export { Divider, dividerVariants };
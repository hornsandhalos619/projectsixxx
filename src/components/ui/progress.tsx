"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { GothicIcons } from "./icon";

const progressVariants = cva(
  "relative h-2 w-full overflow-hidden rounded-full bg-void-700 border border-border-subtle",
  {
    variants: {
      variant: {
        default: "",
        blood: "bg-blood-400/10 border-blood-400/30",
        wine: "bg-wine-400/10 border-wine-400/30",
        velvet: "bg-velvet-gloss border-blood-400/20",
        ritual: "bg-gradient-to-r from-void-700 via-blood-600/20 to-void-700 border-gradient-blood",
      },
      size: {
        xs: "h-1",
        sm: "h-1.5",
        md: "h-2",
        lg: "h-3",
        xl: "h-4",
      },
      radius: {
        full: "rounded-full",
        gothic: "rounded-gothic-md",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      radius: "full",
    },
  }
);

const progressIndicatorVariants = cva(
  "h-full w-full flex items-center transition-all duration-sigh ease-sigh",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-wine-400 to-wine-500",
        blood: "bg-gradient-to-r from-blood-400 via-blood-500 to-blood-600 shadow-[0_0_10px_theme(colors.blood.400/50)]",
        wine: "bg-gradient-to-r from-wine-300 via-wine-400 to-wine-500 shadow-[0_0_10px_theme(colors.wine.400/50)]",
        velvet: "bg-gradient-to-r from-blood-400/30 via-blood-500/20 to-blood-400/30 shadow-[0_0_10px_rgba(192,57,43,0.3)]",
        gold: "bg-gradient-to-r from-wine-300 via-wine-400 to-wine-300 shadow-wine-glow",
        ritual: "bg-gradient-to-r from-blood-400 via-wine-400 to-blood-400 animate-blood-pulse shadow-blood-glow",
      },
      striped: {
        true: "bg-[linear-gradient(45deg,rgba(255,255,255,.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,.15)_50%,rgba(255,255,255,.15)_75%,transparent_75%,transparent)] bg-[size:1rem_1rem] animate-[stripe_1s_linear_infinite]",
        false: "",
      },
      animated: {
        true: "animate-velvet-shimmer",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      striped: false,
      animated: false,
    },
  }
);

const progressLabelVariants = cva(
  "absolute right-0 top-1/2 -translate-y-1/2 text-step--2 font-ui font-medium text-pallor-300",
  {
    variants: {
      position: {
        inside: "right-2 text-pallor-50",
        outside: "right-0 top-[-1.5rem] text-pallor-300",
        overlay: "right-2 text-pallor-50 mix-blend-difference",
      },
    },
    defaultVariants: {
      position: "outside",
    },
  }
);

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: VariantProps<typeof progressVariants>["variant"];
  size?: VariantProps<typeof progressVariants>["size"];
  radius?: VariantProps<typeof progressVariants>["radius"];
  showLabel?: boolean;
  labelPosition?: VariantProps<typeof progressLabelVariants>["position"];
  labelFormat?: (value: number) => string;
  striped?: boolean;
  animated?: boolean;
  className?: string;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  (
    {
      variant = "default",
      size = "md",
      radius = "full",
      showLabel = false,
      labelPosition = "outside",
      labelFormat = (value) => `${Math.round(value)}%`,
      striped = false,
      animated = false,
      className,
      value,
      max = 100,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value || 0) / max, 0), 1) * 100;

    return (
      <div className={cn("w-full", className)} {...props}>
        <ProgressPrimitive.Root
          ref={ref}
          className={cn(progressVariants({ variant, size, radius }))}
          value={value}
          max={max}
        >
          <ProgressPrimitive.Indicator
            className={cn(progressIndicatorVariants({ variant, striped, animated }), "origin-left")}
            style={{ transform: `scaleX(${percentage / 100})` } as React.CSSProperties}
          />
        </ProgressPrimitive.Root>
        {showLabel && (
          <span className={cn(progressLabelVariants({ position: labelPosition }))}>
            {labelFormat(percentage)}
          </span>
        )}
      </div>
    );
  }
);
Progress.displayName = ProgressPrimitive.Root.displayName;

// Step Progress (Ritual Steps)
interface StepProgressProps {
  steps: { label: string; description?: string; icon?: React.ReactNode; complete?: boolean; current?: boolean }[];
  variant?: "default" | "blood" | "wine" | "velvet" | "ritual";
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const stepProgressVariants = cva(
  "relative",
  {
    variants: {
      variant: {
        default: "",
        blood: "",
        wine: "",
        velvet: "",
        ritual: "",
      },
      orientation: {
        horizontal: "flex items-center",
        vertical: "flex flex-col items-start",
      },
      size: {
        sm: "gap-4",
        md: "gap-6",
        lg: "gap-8",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
      size: "md",
    },
  }
);

const stepProgressLineVariants = cva(
  "absolute top-1/2 -translate-y-1/2 w-full h-1 bg-void-700 border border-border-subtle rounded-full overflow-hidden z-0",
  {
    variants: {
      orientation: {
        horizontal: "left-0",
        vertical: "left-1/2 -translate-x-1/2 h-full w-1 top-0 -translate-y-0",
      },
      variant: {
        default: "",
        blood: "bg-blood-400/10 border-blood-400/30",
        wine: "bg-wine-400/10 border-wine-400/30",
        velvet: "bg-velvet-gloss border-blood-400/20",
        ritual: "bg-gradient-to-r from-void-700 via-blood-600/20 to-void-700 border-gradient-blood",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
      variant: "default",
    },
  }
);

const stepProgressLineFillVariants = cva(
  "absolute top-0 left-0 h-full bg-gradient-to-r from-blood-400 via-wine-400 to-blood-400 transition-all duration-sigh ease-sigh",
  {
    variants: {
      orientation: {
        horizontal: "w-0",
        vertical: "h-0 w-full bottom-0 top-auto",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const stepProgressItemVariants = cva(
  "relative z-10 flex flex-col items-center",
  {
    variants: {
      orientation: {
        horizontal: "flex-1",
        vertical: "w-full flex-row items-start gap-4",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

const stepProgressCircleVariants = cva(
  "relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-flutter ease-sigh",
  {
    variants: {
      variant: {
        default: "bg-void-800 border-border-subtle text-pallor-300",
        blood: "bg-void-800 border-blood-400/50 text-blood-400",
        wine: "bg-void-800 border-wine-400/50 text-wine-300",
        velvet: "bg-velvet-gloss border-blood-400/30 text-pallor-200",
        ritual: "bg-gradient-to-br from-void-800 to-blood-600/20 border-gradient-blood text-blood-400",
      },
      state: {
        pending: "",
        current: "animate-blood-pulse shadow-[0_0_20px_rgba(192,57,43,0.4)]",
        complete: "bg-gradient-to-br from-blood-400 to-blood-600 border-blood-400 text-pallor-50 shadow-blood-glow",
      },
      size: {
        sm: "h-8 w-8 text-step--1",
        md: "h-10 w-10 text-step-0",
        lg: "h-12 w-12 text-step-1",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "pending",
      size: "md",
    },
  }
);

const stepProgressLabelVariants = cva(
  "mt-2 text-center font-ui",
  {
    variants: {
      size: {
        sm: "text-step--2",
        md: "text-step--1",
        lg: "text-step-0",
      },
      state: {
        pending: "text-pallor-400",
        current: "text-blood-400 font-medium",
        complete: "text-pallor-100 font-medium",
      },
    },
    defaultVariants: {
      size: "md",
      state: "pending",
    },
  }
);

const stepProgressDescriptionVariants = cva(
  "mt-1 text-center font-body text-pallor-400",
  {
    variants: {
      size: {
        sm: "text-step--2",
        md: "text-step--1",
        lg: "text-step-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

export const StepProgress = React.forwardRef<HTMLDivElement, StepProgressProps>(
  ({ steps, variant = "default", size = "md", orientation = "horizontal", className }, ref) => {
    const completedSteps = steps.filter((s) => s.complete).length;
    const progressPercentage = steps.length > 0 ? (completedSteps / steps.length) * 100 : 0;

    return (
      <div ref={ref} className={cn(stepProgressVariants({ variant, orientation, size }), className)}>
        {orientation === "horizontal" && steps.length > 1 && (
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 z-0 pointer-events-none">
            <div className={cn(stepProgressLineVariants({ orientation, variant }))}>
              <div
                className={cn(stepProgressLineFillVariants({ orientation }))}
                style={{ width: `${progressPercentage}%` } as React.CSSProperties}
              />
            </div>
          </div>
        )}
        {orientation === "vertical" && steps.length > 1 && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full z-0 pointer-events-none">
            <div className={cn(stepProgressLineVariants({ orientation, variant }))}>
              <div
                className={cn(stepProgressLineFillVariants({ orientation }))}
                style={{ height: `${progressPercentage}%` } as React.CSSProperties}
              />
            </div>
          </div>
        )}
        <div className={cn(orientation === "horizontal" ? "flex items-center" : "flex flex-col items-start w-full"), "relative z-10"}>
          {steps.map((step, index) => {
            const isComplete = step.complete;
            const isCurrent = step.current && !isComplete;
            const state = isComplete ? "complete" : isCurrent ? "current" : "pending";

            return (
              <div key={index} className={cn(stepProgressItemVariants({ orientation }))}>
                <div className={cn(stepProgressCircleVariants({ variant, state, size }))}>
                  {isComplete ? (
                    <GothicIcons.WaxSeal className="h-5 w-5" aria-hidden="true" />
                  ) : step.icon ? (
                    <span className="text-current">{step.icon}</span>
                  ) : (
                    <span className="font-display-alt text-current">{index + 1}</span>
                  )}
                </div>
                <span className={cn(stepProgressLabelVariants({ size, state }))}>
                  {step.label}
                </span>
                {step.description && (
                  <p className={cn(stepProgressDescriptionVariants({ size }))}>
                    {step.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);
StepProgress.displayName = "StepProgress";

export { Progress, progressVariants };
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tooltipVariants = cva(
  "z-[700] rounded-gothic-md px-3 py-2 text-step--1 font-ui font-medium text-pallor-100 animate-flutter pointer-events-none",
  {
    variants: {
      variant: {
        velvet: "bg-void-800/95 backdrop-blur-sm border border-border-subtle shadow-velvet-lg texture-velvet",
        blood: "bg-blood-500/95 text-pallor-50 border border-blood-400/30 shadow-blood-glow",
        wine: "bg-wine-400/95 text-void-950 border border-wine-400/30 shadow-wine-glow",
        obsidian: "bg-obsidian-glass backdrop-blur-md border border-border-subtle shadow-velvet-xl",
      },
      side: {
        top: "",
        right: "",
        bottom: "",
        left: "",
      },
    },
    defaultVariants: {
      variant: "velvet",
    },
  }
);

const tooltipArrowVariants = cva(
  "fill-[var(--tooltip-bg)] border-[var(--tooltip-border)]",
  {
    variants: {
      variant: {
        velvet: "",
        blood: "",
        wine: "",
        obsidian: "",
      },
    },
  }
);

interface TooltipProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> {
  variant?: VariantProps<typeof tooltipVariants>["variant"];
}

const Tooltip = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Root>, TooltipProps>(
  ({ variant = "velvet", children, ...props }, ref) => (
    <TooltipPrimitive.Root ref={ref} {...props}>{children}</TooltipPrimitive.Root>
  )
);
Tooltip.displayName = TooltipPrimitive.Root.displayName;

interface TooltipTriggerProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Trigger> {
  asChild?: boolean;
}

const TooltipTrigger = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Trigger>, TooltipTriggerProps>(
  ({ asChild = true, ...props }, ref) => (
    <TooltipPrimitive.Trigger ref={ref} asChild={asChild} {...props} />
  )
);
TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

interface TooltipContentProps extends React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> {
  variant?: VariantProps<typeof tooltipVariants>["variant"];
  sideOffset?: number;
  alignOffset?: number;
}

const TooltipContent = React.forwardRef<React.ElementRef<typeof TooltipPrimitive.Content>, TooltipContentProps>(
  ({ className, variant = "velvet", sideOffset = 8, alignOffset = 0, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      alignOffset={alignOffset}
      className={cn(tooltipVariants({ variant }), className)}
      {...props}
    >
      <TooltipPrimitive.Arrow
        className={cn(tooltipArrowVariants({ variant }), "h-2 w-2")}
      />
      {props.children}
    </TooltipPrimitive.Content>
  )
);
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, tooltipVariants };
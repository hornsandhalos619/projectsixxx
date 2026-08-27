"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tabsListVariants = cva(
  "flex w-full items-center justify-center gap-1 p-1 bg-void-800 border border-border-subtle rounded-gothic-lg",
  {
    variants: {
      variant: {
        default: "",
        blood: "border-blood-400/30 bg-blood-400/5",
        wine: "border-wine-400/30 bg-wine-400/5",
        velvet: "texture-velvet",
      },
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      variant: "default",
      orientation: "horizontal",
    },
  }
);

const tabsTriggerVariants = cva(
  "relative flex items-center justify-center gap-2 rounded-gothic-md px-4 py-2 text-step-0 font-ui font-medium text-pallor-300 transition-all duration-flutter ease-flutter focus-blood data-[state=active]:text-pallor-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "hover:text-pallor-100 hover:bg-void-700 data-[state=active]:bg-blood-400/20 data-[state=active]:text-blood-300 data-[state=active]:shadow-[inset_0_-2px_0_0_theme(colors.blood.400)]",
        blood: "hover:text-blood-300 hover:bg-blood-400/10 data-[state=active]:bg-blood-400/20 data-[state=active]:text-blood-300 data-[state=active]:shadow-[inset_0_-2px_0_0_theme(colors.blood.400)]",
        wine: "hover:text-wine-300 hover:bg-wine-400/10 data-[state=active]:bg-wine-400/20 data-[state=active]:text-wine-300 data-[state=active]:shadow-[inset_0_-2px_0_0_theme(colors.wine.400)]",
        velvet: "hover:text-pallor-100 hover:bg-void-700/50 data-[state=active]:bg-velvet-gloss data-[state=active]:text-pallor-100 data-[state=active]:shadow-[inset_0_-2px_0_0_rgba(192,57,43,0.3)]",
        underline: "bg-transparent hover:text-pallor-100 data-[state=active]:text-blood-400 data-[state=active]:shadow-[inset_0_-2px_0_0_theme(colors.blood.400)]",
      },
      size: {
        sm: "px-3 py-1.5 text-step--1",
        md: "px-4 py-2 text-step-0",
        lg: "px-6 py-2.5 text-step-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const tabsContentVariants = cva(
  "animate-flutter focus-blood",
  {
    variants: {
      variant: {
        default: "bg-void-800/50 border border-border-subtle rounded-gothic-lg p-6 texture-velvet",
        blood: "bg-blood-400/5 border-blood-400/20 rounded-gothic-lg p-6",
        wine: "bg-wine-400/5 border-wine-400/20 rounded-gothic-lg p-6",
        none: "p-0 bg-transparent border-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface TabsProps extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> {
  variant?: VariantProps<typeof tabsListVariants>["variant"];
  orientation?: VariantProps<typeof tabsListVariants>["orientation"];
  contentVariant?: VariantProps<typeof tabsContentVariants>["variant"];
}

const Tabs = React.forwardRef<React.ElementRef<typeof TabsPrimitive.Root>, TabsProps>(
  ({ variant = "default", orientation = "horizontal", contentVariant = "default", children, className, ...props }, ref) => (
    <TabsPrimitive.Root
      ref={ref}
      orientation={orientation}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </TabsPrimitive.Root>
  )
);
Tabs.displayName = TabsPrimitive.Root.displayName;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
    variant?: VariantProps<typeof tabsListVariants>["variant"];
    orientation?: VariantProps<typeof tabsListVariants>["orientation"];
  }
>(({ className, variant = "default", orientation = "horizontal", ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListVariants({ variant, orientation }), className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: VariantProps<typeof tabsTriggerVariants>["variant"];
    size?: VariantProps<typeof tabsTriggerVariants>["size"];
  }
>(({ className, variant = "default", size = "md", ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(tabsTriggerVariants({ variant, size }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    variant?: VariantProps<typeof tabsContentVariants>["variant"];
  }
>(({ className, variant = "default", ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentVariants({ variant }), className)}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { GothicIcons } from "./icon";

const accordionVariants = cva(
  "w-full border border-border-subtle rounded-gothic-lg overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-void-800",
        blood: "bg-void-800 border-blood-400/30",
        wine: "bg-void-800 border-wine-400/30",
        velvet: "bg-void-800 texture-velvet",
        ritual: "bg-gradient-to-br from-void-800 via-void-700 to-blood-600/10 border-gradient-blood",
      },
      type: {
        single: "",
        multiple: "",
      },
    },
    defaultVariants: {
      variant: "default",
      type: "single",
    },
  }
);

const accordionItemVariants = cva(
  "border-t border-border-subtle first:border-0 transition-all duration-sigh ease-sigh",
  {
    variants: {
      variant: {
        default: "",
        blood: "border-blood-400/20",
        wine: "border-wine-400/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const accordionTriggerVariants = cva(
  "flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-step-0 font-ui font-medium text-pallor-200 transition-all duration-flutter ease-flutter focus-blood hover:text-pallor-100 hover:bg-void-700/50",
  {
    variants: {
      variant: {
        default: "data-[state=open]:text-blood-400 data-[state=open]:bg-blood-400/5",
        blood: "text-blood-400 data-[state=open]:text-blood-300 data-[state=open]:bg-blood-400/10",
        wine: "text-wine-300 data-[state=open]:text-wine-300 data-[state=open]:bg-wine-400/10",
        velvet: "data-[state=open]:text-pallor-100 data-[state=open]:bg-velvet-gloss",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const accordionContentVariants = cva(
  "overflow-hidden text-step-0 text-pallor-300 animate-sigh data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
  {
    variants: {
      variant: {
        default: "bg-void-700/50",
        blood: "bg-blood-400/5",
        wine: "bg-wine-400/5",
        velvet: "bg-velvet-gloss",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AccordionProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> {
  variant?: VariantProps<typeof accordionVariants>["variant"];
  type?: VariantProps<typeof accordionVariants>["type"];
  className?: string;
}

const Accordion = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Root>, AccordionProps>(
  ({ variant = "default", type = "single", className, children, ...props }, ref) => (
    <AccordionPrimitive.Root
      ref={ref}
      type={type}
      className={cn(accordionVariants({ variant, type }), className)}
      {...props}
    >
      {children}
    </AccordionPrimitive.Root>
  )
);
Accordion.displayName = AccordionPrimitive.Root.displayName;

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {
  variant?: VariantProps<typeof accordionItemVariants>["variant"];
}

const AccordionItem = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Item>, AccordionItemProps>(
  ({ variant = "default", className, ...props }, ref) => (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  )
);
AccordionItem.displayName = "AccordionItem";

interface AccordionHeaderProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header> {}

const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Header>,
  AccordionHeaderProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Header ref={ref} className={cn("", className)} {...props} />
));
AccordionHeader.displayName = "AccordionHeader";

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  variant?: VariantProps<typeof accordionTriggerVariants>["variant"];
  iconLeft?: React.ReactNode;
}

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, variant = "default", iconLeft, children, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    ref={ref}
    className={cn(accordionTriggerVariants({ variant }), className)}
    {...props}
  >
    {iconLeft && <span className="flex items-center text-pallor-400">{iconLeft}</span>}
    <span className="flex-1 text-left">{children}</span>
    <AccordionPrimitive.Indicator className="flex items-center justify-center text-blood-400 transition-transform duration-flutter">
      <GothicIcons.VelvetRibbon className="h-5 w-5" aria-hidden="true" />
    </AccordionPrimitive.Indicator>
  </AccordionPrimitive.Trigger>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  variant?: VariantProps<typeof accordionContentVariants>["variant"];
}

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  AccordionContentProps
>(({ className, variant = "default", children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(accordionContentVariants({ variant }), "px-6 pb-6", className)}
    {...props}
  >
    <div className="font-body leading-relaxed">{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent };
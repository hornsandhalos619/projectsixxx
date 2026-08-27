"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { GothicIcons } from "./icon";

const dialogVariants = cva(
  "relative z-[500] w-full max-w-lg rounded-gothic-xl bg-void-800 border border-border-subtle shadow-ritual animate-ritual-enter texture-velvet",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[90vw]",
      },
      variant: {
        default: "",
        obsidian: "bg-obsidian-glass backdrop-blur-xl border-border-subtle/50",
        blood: "border-blood-400/30 shadow-blood-glow",
        wine: "border-wine-400/30 shadow-wine-glow",
        ritual: "border-gradient-blood",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
);

const overlayVariants = cva(
  "fixed inset-0 z-[499] bg-void-950/80 backdrop-blur-sm animate-sigh data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
  {
    variants: {
      variant: {
        default: "",
        blood: "bg-blood-600/10",
        ritual: "bg-gradient-to-b from-void-950/90 via-void-900/80 to-blood-600/10",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface DialogProps extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Root> {
  size?: VariantProps<typeof dialogVariants>["size"];
  variant?: VariantProps<typeof dialogVariants>["variant"];
  overlayVariant?: VariantProps<typeof overlayVariants>["variant"];
}

const Dialog = React.forwardRef<React.ElementRef<typeof DialogPrimitive.Root>, DialogProps>(
  ({ size = "md", variant = "default", overlayVariant = "default", children, ...props }, ref) => (
    <DialogPrimitive.Root ref={ref} {...props}>{children}</DialogPrimitive.Root>
  )
);
Dialog.displayName = DialogPrimitive.Root.displayName;

const DialogTrigger = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Trigger>
>(({ ...props }, ref) => (
  <DialogPrimitive.Trigger ref={ref} {...props} />
));
DialogTrigger.displayName = DialogPrimitive.Trigger.displayName;

const DialogPortal = DialogPrimitive.Portal;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay> & { variant?: VariantProps<typeof overlayVariants>["variant"] }
>(({ className, variant = "default", ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(overlayVariants({ variant }), className)}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    size?: VariantProps<typeof dialogVariants>["size"];
    variant?: VariantProps<typeof dialogVariants>["variant"];
    hideClose?: boolean;
  }
>(({ className, size = "md", variant = "default", hideClose = false, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay variant={variant === "blood" ? "blood" : variant === "ritual" ? "ritual" : "default"} />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(dialogVariants({ size, variant }), className)}
      {...props}
    >
      {children}
      {!hideClose && (
        <DialogClose className="absolute top-4 right-4 z-10" aria-label="Close dialog">
          <GothicIcons.WaxSeal className="h-6 w-6 text-blood-400 hover:text-blood-300 transition-colors duration-flutter" />
        </DialogClose>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 text-center pb-4 border-b border-border-subtle", className)}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 pt-4 border-t border-border-subtle", className)}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("font-display-alt text-step-3 text-pallor-100 tracking-tight", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("font-body text-step-0 text-pallor-300 leading-relaxed", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn(
      "rounded-gothic-md p-2 text-pallor-400 hover:text-pallor-100 hover:bg-void-700 transition-all duration-flutter focus-blood",
      className
    )}
    {...props}
  >
    {children || (
      <GothicIcons.WaxSeal className="h-5 w-5" aria-hidden="true" />
    )}
  </DialogPrimitive.Close>
));
DialogClose.displayName = DialogPrimitive.Close.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogVariants,
  overlayVariants,
};
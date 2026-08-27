"use client";

import * as React from "react";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { GothicIcons } from "./icon";

const toastVariants = cva(
  "relative pointer-events-auto flex w-[360px] items-start gap-3 overflow-hidden rounded-gothic-lg border p-4 shadow-velvet-xl animate-sigh data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=end]:animate-out data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
  {
    variants: {
      variant: {
        default: "bg-void-800/95 backdrop-blur-sm border-border-subtle",
        blood: "bg-void-800/95 backdrop-blur-sm border-blood-400/30 shadow-blood-glow",
        wine: "bg-void-800/95 backdrop-blur-sm border-wine-400/30 shadow-wine-glow",
        velvet: "bg-velvet-gloss/95 backdrop-blur-sm border-blood-400/20 shadow-velvet-lg texture-velvet",
        obsidian: "bg-obsidian-glass backdrop-blur-md border-border-subtle/50 shadow-velvet-xl",
        success: "bg-wine-500/10 border-wine-400/30 shadow-wine-glow",
        error: "bg-blood-500/10 border-blood-400/30 shadow-blood-glow",
        warning: "bg-wine-500/10 border-wine-400/30 shadow-wine-glow",
        ritual: "bg-gradient-to-br from-void-800 via-blood-600/10 to-void-800 border-gradient-blood shadow-ritual",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const toastIconVariants = cva(
  "flex-shrink-0 flex items-center justify-center h-5 w-5",
  {
    variants: {
      variant: {
        default: "text-pallor-400",
        blood: "text-blood-400",
        wine: "text-wine-300",
        velvet: "text-blood-400",
        obsidian: "text-pallor-300",
        success: "text-wine-300",
        error: "text-blood-400",
        warning: "text-wine-300",
        ritual: "text-blood-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const toastTitleVariants = cva(
  "font-display-alt text-step-1 text-pallor-100 tracking-tight",
  {
    variants: {
      variant: {
        default: "",
        blood: "text-blood-300",
        wine: "text-wine-300",
        velvet: "text-pallor-100",
        obsidian: "text-pallor-100",
        success: "text-wine-300",
        error: "text-blood-300",
        warning: "text-wine-300",
        ritual: "text-blood-300",
      },
    },
  }
);

const toastDescriptionVariants = cva(
  "mt-1 font-body text-step-0 text-pallor-300 leading-relaxed",
  {
    variants: {
      variant: {
        default: "",
        blood: "text-pallor-300",
        wine: "text-pallor-300",
        velvet: "text-pallor-200",
        obsidian: "text-pallor-300",
        success: "text-pallor-200",
        error: "text-pallor-300",
        warning: "text-pallor-300",
        ritual: "text-pallor-200",
      },
    },
  }
);

const toastCloseVariants = cva(
  "absolute top-3 right-3 flex h-6 w-6 items-center justify-center rounded-gothic-md text-pallor-400 transition-all duration-flutter hover:text-pallor-100 hover:bg-void-700 focus-blood",
  {
    variants: {
      variant: {
        default: "",
        blood: "text-blood-400 hover:text-blood-300 hover:bg-blood-400/10",
        wine: "text-wine-300 hover:text-wine-200 hover:bg-wine-400/10",
      },
    },
  }
);

const toastViewportVariants = cva(
  "fixed z-[800] flex flex-col gap-3 p-4 pointer-events-none",
  {
    variants: {
      position: {
        "top-right": "top-0 right-0 items-end",
        "top-left": "top-0 left-0 items-start",
        "top-center": "top-0 left-1/2 -translate-x-1/2 items-center",
        "bottom-right": "bottom-0 right-0 items-end",
        "bottom-left": "bottom-0 left-0 items-start",
        "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 items-center",
      },
    },
    defaultVariants: {
      position: "top-right",
    },
  }
);

interface ToastProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root> {
  variant?: VariantProps<typeof toastVariants>["variant"];
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
}

const Toast = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Root>, ToastProps>(
  (
    {
      variant = "default",
      title,
      description,
      icon,
      action,
      duration = 5000,
      onClose,
      className,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(true);

    React.useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => setOpen(false), duration);
        return () => clearTimeout(timer);
      }
    }, [duration]);

    if (!open) return null;

    const defaultIcons: Record<string, React.ReactNode> = {
      default: <GothicIcons.Grimoire className="h-5 w-5" />,
      blood: <GothicIcons.BloodDrop className="h-5 w-5" />,
      wine: <GothicIcons.Chalice className="h-5 w-5" />,
      velvet: <GothicIcons.VelvetRibbon className="h-5 w-5" />,
      obsidian: <GothicIcons.Skull className="h-5 w-5" />,
      success: <GothicIcons.WaxSeal className="h-5 w-5" />,
      error: <GothicIcons.Sigil className="h-5 w-5" />,
      warning: <GothicIcons.Candle className="h-5 w-5" />,
      ritual: <GothicIcons.Ouroboros className="h-5 w-5" />,
    };

    return (
      <ToastPrimitive.Root
        ref={ref}
        className={cn(toastVariants({ variant }), className)}
        onOpenChange={setOpen}
        {...props}
      >
        <div className={cn(toastIconVariants({ variant }))} aria-hidden="true">
          {icon || defaultIcons[variant]}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <div className={cn(toastTitleVariants({ variant }))}>{title}</div>
          )}
          {description && (
            <div className={cn(toastDescriptionVariants({ variant }))}>{description}</div>
          )}
          {action && <div className="mt-3">{action}</div>}
        </div>
        <ToastPrimitive.Close
          className={cn(toastCloseVariants({ variant }))}
          onClick={() => { setOpen(false); onClose?.(); }}
          aria-label="Dismiss"
        >
          <GothicIcons.WaxSeal className="h-4 w-4" aria-hidden="true" />
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    );
  }
);
Toast.displayName = ToastPrimitive.Root.displayName;

interface ToastViewportProps extends React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport> {
  position?: VariantProps<typeof toastViewportVariants>["position"];
}

const ToastViewport = React.forwardRef<React.ElementRef<typeof ToastPrimitive.Viewport>, ToastViewportProps>(
  ({ position = "top-right", className, ...props }, ref) => (
    <ToastPrimitive.Viewport
      ref={ref}
      className={cn(toastViewportVariants({ position }), className)}
      {...props}
    />
  )
);
ToastViewport.displayName = ToastPrimitive.Viewport.displayName;

// Toast hook for programmatic usage
interface ToastOptions {
  variant?: VariantProps<typeof toastVariants>["variant"];
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
}

const toastIcons: Record<string, React.ReactNode> = {
  default: <GothicIcons.Grimoire className="h-5 w-5" />,
  blood: <GothicIcons.BloodDrop className="h-5 w-5" />,
  wine: <GothicIcons.Chalice className="h-5 w-5" />,
  velvet: <GothicIcons.VelvetRibbon className="h-5 w-5" />,
  obsidian: <GothicIcons.Skull className="h-5 w-5" />,
  success: <GothicIcons.WaxSeal className="h-5 w-5" />,
  error: <GothicIcons.Sigil className="h-5 w-5" />,
  warning: <GothicIcons.Candle className="h-5 w-5" />,
  ritual: <GothicIcons.Ouroboros className="h-5 w-5" />,
};

function useToast() {
  const [toasts, setToasts] = React.useState<Array<ToastOptions & { id: string }>>([]);

  const toast = React.useCallback((options: ToastOptions) => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { ...options, id }]);

    if (options.duration !== 0 && options.duration !== Infinity) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, options.duration || 5000);
    }

    return id;
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = React.useCallback(() => {
    setToasts([]);
  }, []);

  return { toasts, toast, dismiss, dismissAll };
}

// Provider component
interface ToastProviderProps {
  children: React.ReactNode;
  position?: VariantProps<typeof toastViewportVariants>["position"];
}

export function ToastProvider({ children, position = "top-right" }: ToastProviderProps) {
  const { toasts } = useToast();

  return (
    <>
      {children}
      <ToastViewport position={position}>
        {toasts.map((t) => (
          <Toast
            key={t.id}
            variant={t.variant}
            title={t.title}
            description={t.description}
            icon={t.icon}
            action={t.action}
            duration={t.duration}
            onClose={t.onClose}
          />
        ))}
      </ToastViewport>
    </>
  );
}

// Convenience functions
export const toast = {
  default: (options: Omit<ToastOptions, "variant">) => ({ ...options, variant: "default" as const }),
  blood: (options: Omit<ToastOptions, "variant">) => ({ ...options, variant: "blood" as const }),
  wine: (options: Omit<ToastOptions, "variant">) => ({ ...options, variant: "wine" as const }),
  velvet: (options: Omit<ToastOptions, "variant">) => ({ ...options, variant: "velvet" as const }),
  obsidian: (options: Omit<ToastOptions, "variant">) => ({ ...options, variant: "obsidian" as const }),
  success: (options: Omit<ToastOptions, "variant">) => ({ ...options, variant: "success" as const }),
  error: (options: Omit<ToastOptions, "variant">) => ({ ...options, variant: "error" as const }),
  warning: (options: Omit<ToastOptions, "variant">) => ({ ...options, variant: "warning" as const }),
  ritual: (options: Omit<ToastOptions, "variant">) => ({ ...options, variant: "ritual" as const }),
};

export { Toast, ToastViewport, useToast, ToastProvider, toastVariants };
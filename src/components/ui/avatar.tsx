"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { GothicIcons } from "./icon";

const avatarVariants = cva(
  "relative inline-flex shrink-0 overflow-hidden rounded-gothic-lg bg-void-700",
  {
    variants: {
      size: {
        xs: "h-6 w-6 text-step--2",
        sm: "h-8 w-8 text-step--1",
        md: "h-10 w-10 text-step-0",
        lg: "h-12 w-12 text-step-1",
        xl: "h-16 w-16 text-step-2",
        "2xl": "h-20 w-20 text-step-3",
        "3xl": "h-24 w-24 text-step-4",
      },
      variant: {
        default: "border border-border-subtle",
        blood: "border-2 border-blood-400/50 shadow-[0_0_0_1px_theme(colors.blood.400/30)]",
        wine: "border-2 border-wine-400/50 shadow-[0_0_0_1px_theme(colors.wine.400/30)]",
        velvet: "border border-blood-400/20 texture-velvet shadow-velvet-md",
        gold: "border-2 border-wine-300/50 shadow-wine-glow",
        ornate: "border-2 border-gradient-blood p-[2px] bg-void-800",
        skull: "border-2 border-pallor-300/30",
        bat: "border-2 border-blood-400/50",
        rose: "border-2 border-blood-400/50",
        crown: "border-2 border-wine-300/50",
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-gothic-lg",
        gothic: "rounded-gothic-xl",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      shape: "circle",
    },
  }
);

const avatarImageVariants = cva(
  "aspect-square h-full w-full object-cover transition-transform duration-sigh ease-sigh hover:scale-105",
  {
    variants: {
      variant: {
        default: "",
        blood: "",
      },
    },
  }
);

const avatarFallbackVariants = cva(
  "flex h-full w-full items-center justify-center bg-void-700 font-display-alt text-pallor-200",
  {
    variants: {
      variant: {
        default: "text-pallor-300",
        blood: "text-blood-400 bg-blood-400/10",
        wine: "text-wine-300 bg-wine-400/10",
        velvet: "text-pallor-200 bg-velvet-gloss",
        gold: "text-wine-300 bg-wine-400/10",
        skull: "text-pallor-300",
        bat: "text-blood-400",
        rose: "text-blood-400",
        crown: "text-wine-300",
      },
    },
  }
);

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  size?: VariantProps<typeof avatarVariants>["size"];
  variant?: VariantProps<typeof avatarVariants>["variant"];
  shape?: VariantProps<typeof avatarVariants>["shape"];
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
  icon?: React.ReactNode;
  status?: "online" | "offline" | "busy" | "away";
  statusPosition?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
  className?: string;
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  (
    {
      size = "md",
      variant = "default",
      shape = "circle",
      src,
      alt,
      fallback,
      icon,
      status,
      statusPosition = "bottom-right",
      className,
      ...props
    },
    ref
  ) => {
    const statusColors = {
      online: "bg-wine-400 border-void-900",
      offline: "bg-void-700 border-void-900",
      busy: "bg-blood-400 border-void-900",
      away: "bg-wine-500 border-void-900",
    };

    const statusPositions = {
      "bottom-right": "bottom-0 right-0",
      "bottom-left": "bottom-0 left-0",
      "top-right": "top-0 right-0",
      "top-left": "top-0 left-0",
    };

    const statusSizes = {
      xs: "h-1.5 w-1.5",
      sm: "h-2 w-2",
      md: "h-2.5 w-2.5",
      lg: "h-3 w-3",
      xl: "h-3.5 w-3.5",
      "2xl": "h-4 w-4",
      "3xl": "h-5 w-5",
    };

    const iconMap: Record<string, React.ReactNode> = {
      skull: <GothicIcons.Skull className="h-full w-full" />,
      bat: <GothicIcons.Bat className="h-full w-full" />,
      rose: <GothicIcons.Rose className="h-full w-full" />,
      crown: <GothicIcons.Crown className="h-full w-full" />,
    };

    return (
      <AvatarPrimitive.Root
        ref={ref}
        className={cn(avatarVariants({ size, variant, shape }), className)}
        {...props}
      >
        {src ? (
          <AvatarPrimitive.Image
            src={src}
            alt={alt || ""}
            className={cn(avatarImageVariants({ variant }))}
          />
        ) : icon && iconMap[icon as string] ? (
          <span className="flex h-full w-full items-center justify-center text-blood-400">
            {iconMap[icon as string]}
          </span>
        ) : (
          <AvatarPrimitive.Fallback
            className={cn(avatarFallbackVariants({ variant }), "font-display-alt")}
          >
            {fallback || (alt ? alt.charAt(0).toUpperCase() : "?")}
          </AvatarPrimitive.Fallback>
        )}
        {status && (
          <span
            className={cn(
              "absolute rounded-full border-2",
              statusColors[status],
              statusPositions[statusPosition],
              statusSizes[size]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </AvatarPrimitive.Root>
    );
  }
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  max?: number;
  size?: VariantProps<typeof avatarVariants>["size"];
  variant?: VariantProps<typeof avatarVariants>["variant"];
  className?: string;
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({ max = 5, size = "md", variant = "default", className, children, ...props }, ref) => {
    const childrenArray = React.Children.toArray(children);
    const visibleChildren = childrenArray.slice(0, max);
    const remainingCount = childrenArray.length - max;

    const overlapMap = {
      xs: "-space-x-1.5",
      sm: "-space-x-2",
      md: "-space-x-2.5",
      lg: "-space-x-3",
      xl: "-space-x-4",
      "2xl": "-space-x-5",
      "3xl": "-space-x-6",
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center", overlapMap[size], className)}
        {...props}
      >
        {visibleChildren.map((child, index) =>
          React.isValidElement(child) ? (
            React.cloneElement(child as React.ReactElement, {
              key: child.key || index,
              size,
              variant,
              className: cn("ring-2 ring-void-900", index > 0 && "z-[auto]"),
            })
          ) : (
            <span key={index}>{child}</span>
          )
        )}
        {remainingCount > 0 && (
          <AvatarPrimitive.Root
            className={cn(avatarVariants({ size, variant: "velvet", shape: "circle" }), "ring-2 ring-void-900 flex-shrink-0")}
          >
            <AvatarPrimitive.Fallback className={cn(avatarFallbackVariants({ variant: "velvet" }))}>
              +{remainingCount}
            </AvatarPrimitive.Fallback>
          </AvatarPrimitive.Root>
        )}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";

export { Avatar, AvatarGroup, avatarVariants };
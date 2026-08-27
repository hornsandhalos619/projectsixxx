"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const skeletonVariants = cva(
  "relative overflow-hidden bg-void-700 rounded-gothic-md",
  {
    variants: {
      variant: {
        default: "border border-border-subtle",
        blood: "border border-blood-400/30",
        wine: "border border-wine-400/30",
        velvet: "border border-blood-400/20 texture-velvet",
        text: "bg-transparent border-0",
        card: "bg-void-800 border border-border-subtle",
        avatar: "bg-void-700 border border-border-subtle",
        button: "bg-void-700 border border-border-subtle",
        input: "bg-void-800 border border-border-subtle",
      },
      animation: {
        pulse: "animate-pulse",
        wave: "animate-velvet-shimmer",
        shimmer: "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_ease-in-out_infinite] before:bg-gradient-to-r before:from-transparent before:via-blood-400/20 before:to-transparent",
        none: "",
      },
    },
    defaultVariants: {
      variant: "default",
      animation: "wave",
    },
  }
);

const skeletonTextVariants = cva(
  "h-4 bg-void-700 rounded-gothic-sm animate-velvet-shimmer",
  {
    variants: {
      variant: {
        default: "bg-void-700",
        blood: "bg-blood-400/20",
        wine: "bg-wine-400/20",
      },
      size: {
        xs: "h-3",
        sm: "h-4",
        md: "h-5",
        lg: "h-6",
        xl: "h-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof skeletonVariants>["variant"];
  animation?: VariantProps<typeof skeletonVariants>["animation"];
  width?: string | number;
  height?: string | number;
  className?: string;
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ variant = "default", animation = "wave", width, height, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, animation }), className)}
        style={{ width, height } as React.CSSProperties}
        {...props}
      />
    );
  }
);
Skeleton.displayName = "Skeleton";

interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof skeletonTextVariants>["variant"];
  size?: VariantProps<typeof skeletonTextVariants>["size"];
  lines?: number;
  spacing?: number;
  className?: string;
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({ variant = "default", size = "md", lines = 3, spacing = 2, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-" + spacing, className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(skeletonTextVariants({ variant, size }), i === lines - 1 && "w-3/4")}
          />
        ))}
      </div>
    );
  }
);
SkeletonText.displayName = "SkeletonText";

interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: VariantProps<typeof skeletonVariants>["variant"];
  animation?: VariantProps<typeof skeletonVariants>["animation"];
  hasImage?: boolean;
  imageAspectRatio?: string;
  lines?: number;
  className?: string;
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({ variant = "card", animation = "wave", hasImage = true, imageAspectRatio = "16/9", lines = 3, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(skeletonVariants({ variant, animation }), "overflow-hidden", className)} {...props}>
        {hasImage && (
          <div
            className={cn(skeletonVariants({ variant, animation }), "aspect-video")}
            style={{ aspectRatio: imageAspectRatio } as React.CSSProperties}
          />
        )}
        <div className="p-6 space-y-4">
          <div className={cn(skeletonTextVariants({ variant: "default", size: "lg" }), "w-1/3")} />
          <div className={cn(skeletonTextVariants({ variant: "default", size: "md" }), "w-full")} />
          <SkeletonText lines={lines} variant={variant} size={size} />
        </div>
      </div>
    );
  }
);
SkeletonCard.displayName = "SkeletonCard";

interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  variant?: VariantProps<typeof skeletonVariants>["variant"];
  animation?: VariantProps<typeof skeletonVariants>["animation"];
  className?: string;
}

const sizeMap = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
  xl: "h-16 w-16",
  "2xl": "h-20 w-20",
  "3xl": "h-24 w-24",
};

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ size = "md", variant = "avatar", animation = "wave", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, animation }), "rounded-full", sizeMap[size], className)}
        {...props}
      />
    );
  }
);
SkeletonAvatar.displayName = "SkeletonAvatar";

interface SkeletonButtonProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  variant?: VariantProps<typeof skeletonVariants>["variant"];
  animation?: VariantProps<typeof skeletonVariants>["animation"];
  className?: string;
}

const buttonSizeMap = {
  xs: "h-7 w-20",
  sm: "h-9 w-24",
  md: "h-11 w-32",
  lg: "h-13 w-40",
  xl: "h-15 w-48",
};

const SkeletonButton = React.forwardRef<HTMLDivElement, SkeletonButtonProps>(
  ({ size = "md", variant = "button", animation = "wave", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, animation }), "rounded-gothic-md", buttonSizeMap[size], className)}
        {...props}
      />
    );
  }
);
SkeletonButton.displayName = "SkeletonButton";

interface SkeletonInputProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: VariantProps<typeof skeletonVariants>["variant"];
  animation?: VariantProps<typeof skeletonVariants>["animation"];
  className?: string;
}

const inputSizeMap = {
  sm: "h-9",
  md: "h-11",
  lg: "h-13",
};

const SkeletonInput = React.forwardRef<HTMLDivElement, SkeletonInputProps>(
  ({ size = "md", variant = "input", animation = "wave", className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(skeletonVariants({ variant, animation }), "rounded-gothic-md w-full", inputSizeMap[size], className)}
        {...props}
      />
    );
  }
);
SkeletonInput.displayName = "SkeletonInput";

interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: number;
  variant?: VariantProps<typeof skeletonVariants>["variant"];
  animation?: VariantProps<typeof skeletonVariants>["animation"];
  hasAvatar?: boolean;
  hasAction?: boolean;
  lines?: number;
  className?: string;
}

const SkeletonList = React.forwardRef<HTMLDivElement, SkeletonListProps>(
  ({ items = 5, variant = "default", animation = "wave", hasAvatar = true, hasAction = false, lines = 2, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        {Array.from({ length: items }).map((_, i) => (
          <div key={i} className="flex items-start gap-4">
            {hasAvatar && <SkeletonAvatar size="md" variant={variant} animation={animation} />}
            <div className="flex-1 min-w-0 space-y-2">
              <div className={cn(skeletonTextVariants({ variant, size: "md" }), "w-1/4")} />
              <SkeletonText lines={lines} variant={variant} size="sm" />
            </div>
            {hasAction && <SkeletonButton size="sm" variant={variant} animation={animation} />}
          </div>
        ))}
      </div>
    );
  }
);
SkeletonList.displayName = "SkeletonList";

interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number;
  columns?: number;
  variant?: VariantProps<typeof skeletonVariants>["variant"];
  animation?: VariantProps<typeof skeletonVariants>["animation"];
  className?: string;
}

const SkeletonTable = React.forwardRef<HTMLDivElement, SkeletonTableProps>(
  ({ rows = 5, columns = 4, variant = "default", animation = "wave", className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("overflow-x-auto", className)} {...props}>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="p-3 text-left font-ui text-step--1 text-pallor-400 uppercase tracking-wider border-b border-border-subtle">
                  <div className={cn(skeletonTextVariants({ variant, size: "sm" }), "w-3/4")} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, row) => (
              <tr key={row}>
                {Array.from({ length: columns }).map((_, col) => (
                  <td key={col} className="p-3 border-b border-border-subtle/50">
                    <div className={cn(skeletonTextVariants({ variant, size: "sm" }), "w-full")} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);
SkeletonTable.displayName = "SkeletonTable";

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar, SkeletonButton, SkeletonInput, SkeletonList, SkeletonTable };
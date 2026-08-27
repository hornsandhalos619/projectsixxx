import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("relative w-full", {
  variants: {
    variant: {
      void: "bg-void-900",
      velvet: "bg-gradient-to-b from-void-900 via-void-800 to-void-900 texture-velvet",
      obsidian: "bg-void-950 texture-cracked-obsidian",
      "gold-leaf": "bg-void-900 texture-gold-leaf",
      blood: "bg-gradient-to-br from-void-900 via-blood-600/10 to-void-900",
      wine: "bg-gradient-to-br from-void-900 via-wine-500/10 to-void-900",
      ritual: "bg-gradient-to-b from-void-950 via-void-900 to-blood-600/5",
      sanctum: "bg-gradient-to-b from-void-900 via-void-800 to-void-700",
    },
    size: {
      xs: "py-12",
      sm: "py-16",
      md: "py-20",
      lg: "py-24",
      xl: "py-32",
      "2xl": "py-40",
      full: "min-h-screen flex items-center justify-center",
    },
    divider: {
      none: "",
      top: "border-t border-border-subtle",
      bottom: "border-b border-border-subtle",
      both: "border-y border-border-subtle",
      "blood-top": "border-t border-blood-400/30",
      "blood-bottom": "border-b border-blood-400/30",
      "wine-top": "border-t border-wine-400/30",
      "wine-bottom": "border-b border-wine-400/30",
      "ornate-top": "relative before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-24 before:h-px before:bg-gradient-to-r from-transparent via-blood-400 to-transparent",
      "ornate-bottom": "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-px after:bg-gradient-to-r from-transparent via-blood-400 to-transparent",
    },
    container: {
      true: "",
      false: "px-0",
    },
  },
  defaultVariants: {
    variant: "void",
    size: "md",
    divider: "none",
    container: true,
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLSectionElement>,
    VariantProps<typeof sectionVariants> {
  container?: boolean;
  containerSize?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "screen" | "screen-2xl";
}

const Section = React.forwardRef<HTMLSectionElement, SectionProps>(
  ({ className, variant, size, divider, container = true, containerSize = "7xl", children, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ variant, size, divider }), className)}
        {...props}
      >
        {container && (
          <div className={cn("relative z-10 mx-auto w-full", `max-w-${containerSize.replace("screen-", "screen-").replace("full", "full")}`)}>
            {children}
          </div>
        )}
        {!container && <div className="relative z-10 w-full">{children}</div>}
      </section>
    );
  }
);
Section.displayName = "Section";

export { Section, sectionVariants };

// Container component
export const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full" | "screen" | "screen-2xl" }>(
  ({ className, size = "7xl", children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "xs" && "max-w-xs",
        size === "sm" && "max-w-sm",
        size === "md" && "max-w-md",
        size === "lg" && "max-w-lg",
        size === "xl" && "max-w-xl",
        size === "2xl" && "max-w-2xl",
        size === "3xl" && "max-w-3xl",
        size === "4xl" && "max-w-4xl",
        size === "5xl" && "max-w-5xl",
        size === "6xl" && "max-w-6xl",
        size === "7xl" && "max-w-7xl",
        size === "full" && "max-w-full",
        size === "screen" && "max-w-screen-xl",
        size === "screen-2xl" && "max-w-screen-2xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
Container.displayName = "Container";
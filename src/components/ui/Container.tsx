import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "grimoire" | "scroll" | "altar" | "full" | "custom";
  customMaxWidth?: string;
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  center?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      size = "grimoire",
      customMaxWidth,
      padding = "md",
      center = true,
      children,
      ...props
    },
    ref
  ) => {
    const sizes = {
      grimoire: "max-w-4xl",
      scroll: "max-w-2xl",
      altar: "max-w-7xl",
      full: "max-w-full",
      custom: customMaxWidth ? `max-w-[${customMaxWidth}]` : "max-w-4xl",
    };

    const paddings = {
      none: "px-0",
      sm: "px-4",
      md: "px-4 md:px-8",
      lg: "px-6 md:px-12 lg:px-16",
      xl: "px-8 md:px-16 lg:px-24",
    };

    const centerStyles = center ? "mx-auto" : "";

    return (
      <div
        ref={ref}
        className={cn(
          "w-full",
          sizes[size],
          paddings[padding],
          centerStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "altar" | "sanctum" | "bazaar" | "scriptorium" | "confessional" | "default";
  padding?: "none" | "sm" | "md" | "lg" | "xl" | "ritual";
  background?: "void-950" | "void-900" | "void-800" | "void-700" | "transparent" | "velvet" | "obsidian" | "gold";
  divider?: boolean;
  dividerColor?: "blood" | "wine" | "subtle";
}

export const Section = forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      variant = "default",
      padding = "md",
      background = "transparent",
      divider = false,
      dividerColor = "subtle",
      children,
      ...props
    },
    ref
  ) => {
    const variants = {
      altar: "section-altar",
      sanctum: "section-sanctum",
      bazaar: "section-bazaar",
      scriptorium: "section-base",
      confessional: "section-base",
      default: "section-base",
    };

    const paddings = {
      none: "py-0",
      sm: "py-8 md:py-12",
      md: "py-16 md:py-24",
      lg: "py-20 md:py-32",
      xl: "py-24 md:py-40 lg:py-48",
      ritual: "py-20 md:py-32 lg:py-40",
    };

    const backgrounds = {
      "void-950": "bg-void-950",
      "void-900": "bg-void-900",
      "void-800": "bg-void-800",
      "void-700": "bg-void-700",
      transparent: "",
      velvet: "texture-velvet",
      obsidian: "texture-cracked-obsidian",
      gold: "texture-gold-leaf",
    };

    const dividerStyles = divider
      ? {
          blood: "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-blood-400 after:to-transparent",
          wine: "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-24 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-wine-400 after:to-transparent",
          subtle: "relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-32 after:h-[1px] after:bg-border-subtle",
        }[dividerColor]
      : "";

    return (
      <section
        ref={ref}
        className={cn(
          "relative",
          variants[variant],
          paddings[padding],
          backgrounds[background],
          dividerStyles,
          className
        )}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = "Section";

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  responsive?: boolean;
}

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, columns = 3, gap = "md", responsive = true, children, ...props }, ref) => {
    const columnClasses = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
      6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
      12: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6",
    };

    const gapClasses = {
      none: "gap-0",
      sm: "gap-3 md:gap-4",
      md: "gap-4 md:gap-6 lg:gap-8",
      lg: "gap-6 md:gap-8 lg:gap-12",
      xl: "gap-8 md:gap-12 lg:gap-16",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "grid",
          responsive ? columnClasses[columns] : `grid-cols-${columns}`,
          gapClasses[gap],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

export interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "row" | "col" | "row-reverse" | "col-reverse";
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
  gap?: "none" | "sm" | "md" | "lg" | "xl";
  wrap?: boolean;
  fullWidth?: boolean;
}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      direction = "row",
      align = "stretch",
      justify = "start",
      gap = "md",
      wrap = false,
      fullWidth = false,
      children,
      ...props
    },
    ref
  ) => {
    const directionClasses = {
      row: "flex-row",
      col: "flex-col",
      "row-reverse": "flex-row-reverse",
      "col-reverse": "flex-col-reverse",
    };

    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    };

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    const gapClasses = {
      none: "gap-0",
      sm: "gap-2",
      md: "gap-4",
      lg: "gap-6",
      xl: "gap-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex",
          directionClasses[direction],
          alignClasses[align],
          justifyClasses[justify],
          gapClasses[gap],
          wrap && "flex-wrap",
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";
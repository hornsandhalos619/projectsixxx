import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

const iconVariants = cva("inline-flex items-center justify-center flex-shrink-0 transition-colors duration-flutter", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
      "2xl": "h-10 w-10",
      "3xl": "h-12 w-12",
    },
    variant: {
      default: "text-pallor-300",
      primary: "text-pallor-100",
      muted: "text-pallor-400",
      accent: "text-blood-400",
      wine: "text-wine-300",
      blood: "text-blood-400",
      inverse: "text-void-950",
    },
    weight: {
      thin: "stroke-[1]",
      normal: "stroke-[1.5]",
      medium: "stroke-[2]",
      bold: "stroke-[2.5]",
    },
    animated: {
      true: "animate-blood-pulse",
      false: "",
    },
    spin: {
      true: "animate-spin",
      false: "",
    },
    pulse: {
      true: "animate-pulse",
      false: "",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "default",
    weight: "normal",
  },
});

type LucideIconName = keyof typeof LucideIcons;

interface GothicIconProps {
  name: LucideIconName | string;
  className?: string;
  size?: VariantProps<typeof iconVariants>["size"];
  variant?: VariantProps<typeof iconVariants>["variant"];
  weight?: VariantProps<typeof iconVariants>["weight"];
  animated?: boolean;
  spin?: boolean;
  pulse?: boolean;
  "aria-label"?: string;
  "aria-hidden"?: boolean;
}

const Icon = React.forwardRef<SVGSVGElement, GothicIconProps>(
  (
    {
      name,
      className,
      size = "md",
      variant = "default",
      weight = "normal",
      animated = false,
      spin = false,
      pulse = false,
      "aria-label": ariaLabel,
      "aria-hidden": ariaHidden = true,
      ...props
    },
    ref
  ) => {
    const LucideIcon = LucideIcons[name as LucideIconName];

    if (!LucideIcon) {
      console.warn(`Icon "${name}" not found in lucide-react`);
      return null;
    }

    return (
      <LucideIcon
        ref={ref}
        className={cn(iconVariants({ size, variant, weight, animated, spin, pulse }), className)}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        {...props}
      />
    );
  }
);
Icon.displayName = "Icon";

// Custom Gothic Icons as SVG components
export const WaxSeal = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-blood-400", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
      <circle cx="12" cy="12" r="3" fill="currentColor" strokeWidth="0" />
    </svg>
  )
);
WaxSeal.displayName = "WaxSeal";

export const Chalice = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-wine-300", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 22h8" />
      <path d="M12 11v11" />
      <path d="M7 11a5 5 0 0 1 10 0v11H7z" />
      <path d="M12 5v6" />
    </svg>
  )
);
Chalice.displayName = "Chalice";

export const Skull = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-pallor-300", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" strokeWidth="0" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" strokeWidth="0" />
      <path d="M9 15h6" />
      <path d="M10 15v-1" />
      <path d="M14 15v-1" />
    </svg>
  )
);
Skull.displayName = "Skull";

export const Bat = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-blood-400", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2a4 4 0 0 0-4 4c0 2.5 2 5 4 7 2-2 4-4.5 4-7a4 4 0 0 0-4-4z" />
      <path d="M8 8c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3z" />
      <path d="M16 8c1.5 0 3 1.5 3 3s-1.5 3-3 3-3-1.5-3-3 1.5-3 3-3z" />
    </svg>
  )
);
Bat.displayName = "Bat";

export const Rose = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-blood-400", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z" />
      <path d="M12 6a6 6 0 0 0-6 6c0 2.5 2 5 6 7s6-4.5 6-7a6 6 0 0 0-6-6z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
);
Rose.displayName = "Rose";

export const Dagger = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-wine-300", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2L4 10l8 8 8-8-8-8z" />
      <path d="M8 14l8-8" />
      <path d="M12 2v4" />
      <path d="M12 18v4" />
    </svg>
  )
);
Dagger.displayName = "Dagger";

export const Crown = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-wine-300", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2l3 7h6l-5 4 2 6-6-4-6 4 2-6-5-4h6z" />
    </svg>
  )
);
Crown.displayName = "Crown";

export const Pentagram = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-blood-400", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
);
Pentagram.displayName = "Pentagram";

export const Moon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-pallor-200", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
);
Moon.displayName = "Moon";

export const Candle = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-wine-300", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v20" />
      <path d="M8 22h8" />
      <path d="M10 2h4" />
      <ellipse cx="12" cy="4" rx="4" ry="2" />
      <path d="M11 4v-1a1 1 0 0 1 2 0v1" />
    </svg>
  )
);
Candle.displayName = "Candle";

export const Grimoire = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-pallor-300", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <path d="M12 8v12" />
      <path d="M8 12h8" />
      <path d="M8 16h8" />
    </svg>
  )
);
Grimoire.displayName = "Grimoire";

export const BloodDrop = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-blood-400", className)}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      {...props}
    >
      <path d="M12 2.5C7.5 2.5 4 6 4 10.5c0 5 8 11.5 8 11.5s8-6.5 8-11.5C20 6 16.5 2.5 12 2.5z" />
    </svg>
  )
);
BloodDrop.displayName = "BloodDrop";

export const VelvetRibbon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-blood-400", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 12c0-4.5 3.5-8 8-8s8 3.5 8 8-3.5 8-8 8" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  )
);
VelvetRibbon.displayName = "VelvetRibbon";

export const Ouroboros = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-wine-300", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M21 12c0 1.5-1 3-2.5 3.5L12 21l-6.5-5.5C3 15 2 13.5 2 12" />
      <path d="M3 12c0-1.5 1-3 2.5-3.5L12 3l6.5 5.5C21 9 22 10.5 22 12" />
      <circle cx="9" cy="11" r="1" fill="currentColor" strokeWidth="0" />
    </svg>
  )
);
Ouroboros.displayName = "Ouroboros";

export const Key = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-wine-300", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="16" r="4" />
      <path d="M12 12v-8" />
      <path d="M8 8l4-4 4 4" />
      <path d="M12 2v2" />
    </svg>
  )
);
Key.displayName = "Key";

export const Sigil = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg
      ref={ref}
      className={cn("text-blood-400", className)}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2v20M2 12h20" />
      <path d="M4.93 4.93l14.14 14.14M19.07 4.93l-14.14 14.14" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  )
);
Sigil.displayName = "Sigil";

export { Icon, iconVariants };
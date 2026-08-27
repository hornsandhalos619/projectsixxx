import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const typographyVariants = cva("", {
  variants: {
    element: {
      display: "font-display text-step-7 text-pallor-100 tracking-tighter leading-[1.05]",
      "display-alt": "font-display-alt text-step-6 text-pallor-100 tracking-tight leading-[1.1]",
      headline: "font-display-alt text-step-5 text-pallor-100 tracking-tight leading-[1.15]",
      subhead: "font-display-alt text-step-3 text-pallor-200 tracking-normal leading-[1.3]",
      "body-lg": "font-body text-step-1 text-pallor-100 leading-relaxed",
      body: "font-body text-step-0 text-pallor-100 leading-relaxed",
      "body-sm": "font-body text-step--1 text-pallor-200 leading-relaxed",
      caption: "font-ui text-step--1 text-pallor-300 tracking-wide uppercase leading-normal",
      label: "font-ui text-step--1 text-pallor-200 font-medium tracking-wider uppercase leading-normal",
      overline: "font-ui text-step--2 text-blood-400 font-semibold tracking-widest uppercase leading-normal",
      quote: "font-body text-step-2 text-pallor-200 italic leading-relaxed border-l-2 border-blood-400/50 pl-6",
      code: "font-mono text-step--1 text-wine-300 bg-void-700 px-1.5 py-0.5 rounded",
      "code-block": "font-mono text-step--1 text-pallor-200 bg-void-800 p-4 rounded-gothic-md overflow-x-auto border border-border-subtle",
      link: "font-ui text-step-0 text-blood-400 hover:text-blood-300 underline underline-offset-2 decoration-blood-400/30 hover:decoration-blood-400 transition-colors duration-flutter",
      muted: "font-ui text-step--1 text-pallor-400",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
      justify: "text-justify",
    },
    color: {
      default: "",
      primary: "text-pallor-100",
      secondary: "text-pallor-300",
      muted: "text-pallor-400",
      accent: "text-blood-400",
      "accent-hover": "text-blood-300",
      wine: "text-wine-300",
      "wine-hover": "text-wine-200",
      gradient: "text-gradient-velvet",
      "gradient-blood": "text-gradient-blood",
      "gradient-wine": "text-gradient-wine",
    },
  },
  defaultVariants: {
    element: "body",
    weight: "normal",
    align: "left",
    color: "default",
  },
});

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, element, weight, align, color, as: Component, children, ...props }, ref) => {
    const elementMap: Record<string, React.ElementType> = {
      display: "h1",
      "display-alt": "h2",
      headline: "h3",
      subhead: "h4",
      "body-lg": "p",
      body: "p",
      "body-sm": "p",
      caption: "span",
      label: "label",
      overline: "span",
      quote: "blockquote",
      code: "code",
      "code-block": "pre",
      link: "a",
      muted: "span",
    };

    const Element = Component || elementMap[element] || "p";

    return (
      <Element
        ref={ref as React.Ref<typeof Element>}
        className={cn(typographyVariants({ element, weight, align, color }), className)}
        {...props}
      >
        {children}
      </Element>
    );
  }
);
Typography.displayName = "Typography";

// Convenience components
export const Display = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="display" className={className} {...props}>{children}</Typography>
  )
);
Display.displayName = "Display";

export const DisplayAlt = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="display-alt" className={className} {...props}>{children}</Typography>
  )
);
DisplayAlt.displayName = "DisplayAlt";

export const Headline = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="headline" className={className} {...props}>{children}</Typography>
  )
);
Headline.displayName = "Headline";

export const Subhead = React.forwardRef<HTMLHeadingElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="subhead" className={className} {...props}>{children}</Typography>
  )
);
Subhead.displayName = "Subhead";

export const Body = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="body" className={className} {...props}>{children}</Typography>
  )
);
Body.displayName = "Body";

export const BodyLg = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="body-lg" className={className} {...props}>{children}</Typography>
  )
);
BodyLg.displayName = "BodyLg";

export const BodySm = React.forwardRef<HTMLParagraphElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="body-sm" className={className} {...props}>{children}</Typography>
  )
);
BodySm.displayName = "BodySm";

export const Caption = React.forwardRef<HTMLSpanElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="caption" className={className} {...props}>{children}</Typography>
  )
);
Caption.displayName = "Caption";

export const Label = React.forwardRef<HTMLLabelElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="label" className={className} {...props}>{children}</Typography>
  )
);
Label.displayName = "Label";

export const Overline = React.forwardRef<HTMLSpanElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="overline" className={className} {...props}>{children}</Typography>
  )
);
Overline.displayName = "Overline";

export const Quote = React.forwardRef<HTMLQuoteElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="quote" className={className} {...props}>{children}</Typography>
  )
);
Quote.displayName = "Quote";

export const Code = React.forwardRef<HTMLElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="code" className={className} {...props}>{children}</Typography>
  )
);
Code.displayName = "Code";

export const CodeBlock = React.forwardRef<HTMLPreElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="code-block" className={className} {...props}>{children}</Typography>
  )
);
CodeBlock.displayName = "CodeBlock";

export const Link = React.forwardRef<HTMLAnchorElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="link" className={className} {...props}>{children}</Typography>
  )
);
Link.displayName = "Link";

export const Muted = React.forwardRef<HTMLSpanElement, Omit<TypographyProps, "element">>(
  ({ className, children, ...props }, ref) => (
    <Typography ref={ref} element="muted" className={className} {...props}>{children}</Typography>
  )
);
Muted.displayName = "Muted";

export { Typography, typographyVariants };
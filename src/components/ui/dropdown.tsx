"use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { GothicIcons } from "./icon";

const selectTriggerVariants = cva(
  "flex w-full items-center justify-between rounded-gothic-md bg-void-800 border border-border-subtle text-step-0 text-pallor-100 transition-all duration-flutter ease-flutter focus-blood disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-void-700",
  {
    variants: {
      variant: {
        default: "hover:border-wine-400/50",
        blood: "border-blood-400/50 hover:border-blood-400 focus:border-blood-400 focus:ring-1 focus:ring-blood-400",
        wine: "border-wine-400/50 hover:border-wine-400 focus:border-wine-400 focus:ring-1 focus:ring-wine-400",
        error: "border-blood-400 focus:border-blood-400 focus:ring-1 focus:ring-blood-400 bg-blood-600/10",
        success: "border-wine-400 focus:border-wine-400 focus:ring-1 focus:ring-wine-400 bg-wine-500/10",
      },
      size: {
        sm: "h-9 px-3 text-step--1",
        md: "h-11 px-4 text-step-0",
        lg: "h-13 px-5 text-step-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const selectContentVariants = cva(
  "relative z-[600] max-h-96 w-full overflow-auto rounded-gothic-md bg-void-800 border border-border-subtle shadow-velvet-xl animate-flutter",
  {
    variants: {
      variant: {
        default: "",
        blood: "border-blood-400/30 shadow-blood-glow",
        wine: "border-wine-400/30 shadow-wine-glow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const selectItemVariants = cva(
  "relative flex w-full cursor-default select-none items-center rounded-sm py-2 px-3 text-step-0 outline-none focus:bg-blood-400/10 focus:text-blood-300 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        default: "text-pallor-200 hover:bg-void-700 hover:text-pallor-100 data-[highlighted]:bg-blood-400/10 data-[highlighted]:text-blood-300",
        blood: "text-pallor-200 hover:bg-blood-400/10 hover:text-blood-300 data-[highlighted]:bg-blood-400/20 data-[highlighted]:text-blood-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface DropdownProps {
  options: { value: string; label: string; disabled?: boolean; icon?: React.ReactNode }[];
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  required?: boolean;
  label?: string;
  error?: string;
  hint?: string;
  variant?: VariantProps<typeof selectTriggerVariants>["variant"];
  size?: VariantProps<typeof selectTriggerVariants>["size"];
  className?: string;
  name?: string;
}

const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      options,
      placeholder,
      value,
      onValueChange,
      disabled,
      required,
      label,
      error,
      hint,
      variant = "default",
      size = "md",
      className,
      name,
    },
    ref
  ) => {
    const selectId = React.useId();
    const errorId = error ? `${selectId}-error` : undefined;
    const hintId = hint ? `${selectId}-hint` : undefined;

    return (
      <div ref={ref} className={cn("w-full", className)}>
        {label && (
          <label
            htmlFor={selectId}
            className="block text-step--1 font-medium text-pallor-200 mb-1.5 after:content-['*'] after:ml-1 after:text-blood-400 after:font-display-alt"
          >
            {label}
          </label>
        )}
        <SelectPrimitive.Root value={value} onValueChange={onValueChange} disabled={disabled} required={required}>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Trigger
              id={selectId}
              className={cn(selectTriggerVariants({ variant: error ? "error" : variant, size }), "pr-10")}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={cn(errorId, hintId)}
            >
              <SelectPrimitive.Value placeholder={placeholder} />
              <SelectPrimitive.Icon>
                <GothicIcons.VelvetRibbon className="h-4 w-4 text-pallor-400" aria-hidden="true" />
              </SelectPrimitive.Icon>
            </SelectPrimitive.Trigger>
          </SelectPrimitive.Portal>
          <SelectPrimitive.Portal>
            <SelectPrimitive.Content
              className={cn(selectContentVariants({ variant }), "mt-1")}
              position="popper"
              sideOffset={4}
            >
              <SelectPrimitive.Viewport>
                {options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    className={cn(selectItemVariants({ variant }))}
                  >
                    <SelectPrimitive.ItemText>
                      {option.icon && <span className="mr-2 flex items-center">{option.icon}</span>}
                      {option.label}
                    </SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator>
                      <GothicIcons.BloodDrop className="h-3 w-3 text-blood-400" aria-hidden="true" />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.Viewport>
              <SelectPrimitive.ScrollUpButton className="flex h-6 items-center justify-center text-pallor-400">
                <GothicIcons.VelvetRibbon className="h-4 w-4 rotate-180" aria-hidden="true" />
              </SelectPrimitive.ScrollUpButton>
              <SelectPrimitive.ScrollDownButton className="flex h-6 items-center justify-center text-pallor-400">
                <GothicIcons.VelvetRibbon className="h-4 w-4" aria-hidden="true" />
              </SelectPrimitive.ScrollDownButton>
            </SelectPrimitive.Content>
          </SelectPrimitive.Portal>
        </SelectPrimitive.Root>
        {error && (
          <p id={errorId} className="mt-1.5 text-step--1 text-blood-400 flex items-center gap-1" role="alert">
            <svg className="h-3 w-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-step--1 text-pallor-400">
            {hint}
          </p>
        )}
        <input type="hidden" name={name} value={value || ""} />
      </div>
    );
  }
);
Dropdown.displayName = "Dropdown";

export { Dropdown };
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, iconLeft, iconRight, id, ...props }, ref) => {
    const inputId = id || React.useId();
    const errorId = error ? `${inputId}-error` : undefined;
    const hintId = hint ? `${inputId}-hint` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block font-ui text-sm text-pallor-200 mb-2"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-pallor-400 pointer-events-none">
              {iconLeft}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "w-full bg-void-800 border border-void-700 text-pallor-100 placeholder-pallor-400",
              "font-ui text-sm px-4 py-3 rounded-none",
              "transition-all duration-200 ease-flutter",
              "focus:outline-none focus:border-blood-400 focus:ring-1 focus:ring-blood-400",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "error:border-blood-400 error:focus:border-blood-400",
              iconLeft && "pl-10",
              iconRight && "pr-10",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={cn(errorId, hintId) || undefined}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-pallor-400 pointer-events-none">
              {iconRight}
            </div>
          )}
        </div>
        {error && (
          <p id={errorId} className="mt-1.5 font-body text-sm text-blood-400" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 font-body text-xs text-pallor-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const textareaId = id || React.useId();
    const errorId = error ? `${textareaId}-error` : undefined;
    const hintId = hint ? `${textareaId}-hint` : undefined;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block font-ui text-sm text-pallor-200 mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "w-full bg-void-800 border border-void-700 text-pallor-100 placeholder-pallor-400",
            "font-body text-sm px-4 py-3 rounded-none resize-y min-h-[100px]",
            "transition-all duration-200 ease-flutter",
            "focus:outline-none focus:border-blood-400 focus:ring-1 focus:ring-blood-400",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "error:border-blood-400 error:focus:border-blood-400",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={cn(errorId, hintId) || undefined}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 font-body text-sm text-blood-400" role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 font-body text-xs text-pallor-400">
            {hint}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn("font-ui text-sm text-pallor-200 flex items-center gap-1.5", className)}
      {...props}
    >
      {children}
      {required && <span className="text-blood-400" aria-hidden="true">*</span>}
    </label>
  )
);
Label.displayName = "Label";
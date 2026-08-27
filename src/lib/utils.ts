import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, interval: string): string {
  if (price === 0) return "Custom";
  if (interval === "custom" || interval === "revenue-share") return "Custom";
  
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  
  return formatter.format(price);
}

export function getIntervalLabel(interval: string): string {
  const labels: Record<string, string> = {
    "one-time": "one-time",
    "monthly": "/mo",
    "hourly": "/hr",
    "daily": "/day",
    "weekly": "/wk",
    "custom": "",
    "revenue-share": "rev-share",
  };
  return labels[interval] || interval;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
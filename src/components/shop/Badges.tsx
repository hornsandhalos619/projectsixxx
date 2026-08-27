"use client";

import { Badge } from "@/components/ui/badge";
import { Typography } from "@/components/ui/typography";
import { Crown, Tag, Heart, Building2, ExternalLink, Zap, Award, Sparkles, Flame, Gem } from "lucide-react";
import type { ProductSource, BloodType } from "@/types/product";
import { cn } from "@/lib/utils";

const SOURCE_CONFIG: Record<ProductSource, { icon: React.ReactNode; label: string; variant: "ritual" | "velvet" | "blood" | "wine" | "default"; color: string }> = {
  hnh: {
    icon: <Crown className="w-3 h-3" />,
    label: "Horns & Halos",
    variant: "ritual",
    color: "text-wine-300",
  },
  spreadshirt: {
    icon: <Tag className="w-3 h-3" />,
    label: "Spreadshirt",
    variant: "velvet",
    color: "text-pallor-300",
  },
  threadless: {
    icon: <Heart className="w-3 h-3" />,
    label: "Threadless",
    variant: "blood",
    color: "text-blood-400",
  },
  etsy: {
    icon: <Building2 className="w-3 h-3" />,
    label: "Etsy Curated",
    variant: "wine",
    color: "text-wine-300",
  },
  affiliate: {
    icon: <ExternalLink className="w-3 h-3" />,
    label: "Affiliate",
    variant: "default",
    color: "text-accent-primary",
  },
};

const BLOOD_TYPE_CONFIG: Record<Exclude<BloodType, null>, { icon: React.ReactNode; label: string; variant: "ritual" | "blood" | "velvet" | "wine"; color: string }> = {
  bestseller: {
    icon: <Award className="w-3 h-3" />,
    label: "Bestseller",
    variant: "ritual",
    color: "text-wine-300",
  },
  new: {
    icon: <Sparkles className="w-3 h-3" />,
    label: "New Arrival",
    variant: "velvet",
    color: "text-accent-primary",
  },
  sale: {
    icon: <Flame className="w-3 h-3" />,
    label: "On Sale",
    variant: "blood",
    color: "text-blood-400",
  },
  exclusive: {
    icon: <Gem className="w-3 h-3" />,
    label: "Exclusive",
    variant: "wine",
    color: "text-wine-300",
  },
};

interface SourceBadgeProps {
  source: ProductSource;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showIcon?: boolean;
  className?: string;
}

export function SourceBadge({
  source,
  size = "md",
  showLabel = true,
  showIcon = true,
  className,
}: SourceBadgeProps) {
  const config = SOURCE_CONFIG[source];

  if (!config) return null;

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-sm gap-1.5",
    lg: "px-3 py-1.5 text-base gap-2",
  };

  return (
    <Badge variant={config.variant} className={cn(sizeClasses[size], className)}>
      {showIcon && <span className={cn(config.color, "flex-shrink-0")}>{config.icon}</span>}
      {showLabel && <Typography element="span" className="font-ui font-medium">{config.label}</Typography>}
    </Badge>
  );
}

interface BloodTypeBadgeProps {
  bloodType: BloodType;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  showIcon?: boolean;
  className?: string;
}

export function BloodTypeBadge({
  bloodType,
  size = "md",
  showLabel = true,
  showIcon = true,
  className,
}: BloodTypeBadgeProps) {
  if (!bloodType) return null;

  const config = BLOOD_TYPE_CONFIG[bloodType];

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-2.5 py-1 text-sm gap-1.5",
    lg: "px-3 py-1.5 text-base gap-2",
  };

  return (
    <Badge variant={config.variant} className={cn(sizeClasses[size], className)}>
      {showIcon && <span className={cn(config.color, "flex-shrink-0")}>{config.icon}</span>}
      {showLabel && <Typography element="span" className="font-ui font-medium">{config.label}</Typography>}
    </Badge>
  );
}

interface SourceFilterBadgeProps {
  source: ProductSource;
  count: number;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function SourceFilterBadge({
  source,
  count,
  selected,
  onClick,
  className,
}: SourceFilterBadgeProps) {
  const config = SOURCE_CONFIG[source];

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-none transition-all duration-200 border",
        selected
          ? `border-${config.variant === "ritual" ? "blood" : config.variant === "blood" ? "blood" : config.variant}-400 bg-${config.variant === "ritual" ? "blood" : config.variant === "blood" ? "blood" : config.variant}-500/10 text-${config.variant === "ritual" ? "blood" : config.variant === "blood" ? "blood" : config.variant}-400`
          : "border-border-subtle bg-void-800 text-pallor-300 hover:border-blood-400/50 hover:text-pallor-100",
        className
      )}
      aria-pressed={selected}
    >
      <span className={cn(config.color, selected ? "text-blood-400" : "")}>{config.icon}</span>
      <Typography element="span" className="font-body text-sm">{config.label}</Typography>
      <Typography element="span" className="font-body text-xs text-pallor-400 font-mono">{count}</Typography>
    </button>
  );
}

interface BloodTypeFilterBadgeProps {
  bloodType: Exclude<BloodType, null>;
  count: number;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

export function BloodTypeFilterBadge({
  bloodType,
  count,
  selected,
  onClick,
  className,
}: BloodTypeFilterBadgeProps) {
  const config = BLOOD_TYPE_CONFIG[bloodType];

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-none transition-all duration-200 border",
        selected
          ? `border-${config.variant === "ritual" ? "blood" : config.variant === "blood" ? "blood" : config.variant}-400 bg-${config.variant === "ritual" ? "blood" : config.variant === "blood" ? "blood" : config.variant}-500/10 text-${config.variant === "ritual" ? "blood" : config.variant === "blood" ? "blood" : config.variant}-400`
          : "border-border-subtle bg-void-800 text-pallor-300 hover:border-blood-400/50 hover:text-pallor-100",
        className
      )}
      aria-pressed={selected}
    >
      <span className={cn(config.color, selected ? "text-blood-400" : "")}>{config.icon}</span>
      <Typography element="span" className="font-body text-sm">{config.label}</Typography>
      <Typography element="span" className="font-body text-xs text-pallor-400 font-mono">{count}</Typography>
    </button>
  );
}

export function SourceBadgeGroup({ sources }: { sources: ProductSource[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {sources.map((source) => (
        <SourceBadge key={source} source={source} size="sm" />
      ))}
    </div>
  );
}

export function BloodTypeBadgeGroup({ bloodTypes }: { bloodTypes: BloodType[]; className?: string }) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {bloodTypes.filter(Boolean).map((bt) => (
        <BloodTypeBadge key={bt} bloodType={bt} size="sm" />
      ))}
    </div>
  );
}
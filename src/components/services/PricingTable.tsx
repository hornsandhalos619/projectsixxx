"use client";

import { useState } from "react";
import { ReactNode } from "react";
import { cn, formatPrice, getIntervalLabel } from "@/lib/utils";
import { Check } from "lucide-react";

interface Tier {
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

interface PricingTableProps {
  tiers: Tier[];
  className?: string;
  toggleScope?: boolean;
  onCtaClick?: (tier: Tier) => void;
}

export function PricingTable({ 
  tiers, 
  className, 
  toggleScope = true,
  onCtaClick 
}: PricingTableProps) {
  const [expandedTier, setExpandedTier] = useState<string | null>(null);

  const allFeatures = Array.from(new Set(tiers.flatMap(t => t.features)));
  
  return (
    <div className={cn("w-full overflow-hidden", className)}>
      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {tiers.map((tier, index) => (
          <PricingCard
            key={tier.name}
            tier={tier}
            index={index}
            isPopular={tier.popular}
            onCtaClick={onCtaClick}
          />
        ))}
      </div>

      {/* Feature Comparison Table */}
      {toggleScope && allFeatures.length > 0 && (
        <div className="card-ritual overflow-hidden">
          <h3 className="heading-ritual-alt text-step-2 mb-6 text-center">
            Scope Comparison
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left p-4 font-ui text-step--1 uppercase tracking-wider text-text-secondary">
                    Capability
                  </th>
                  {tiers.map(tier => (
                    <th key={tier.name} className="text-center p-4 font-ui text-step--1 uppercase tracking-wider text-text-primary">
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature, i) => (
                  <tr key={feature} className={cn("border-b border-border-subtle/50", i % 2 === 0 && "bg-void-700/30")}>
                    <td className="p-4 font-body text-text-secondary">{feature}</td>
                    {tiers.map(tier => (
                      <td key={tier.name} className="text-center p-4">
                        {tier.features.includes(feature) ? (
                          <Check className="mx-auto text-accent-primary" size={20} aria-label="Included" />
                        ) : (
                          <span className="text-text-muted text-step--1">—</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function PricingCard({ 
  tier, 
  index, 
  isPopular, 
  onCtaClick 
}: { 
  tier: Tier; 
  index: number; 
  isPopular?: boolean; 
  onCtaClick?: (tier: Tier) => void;
}) {
  return (
    <div className={cn(
      "card-ritual relative flex flex-col",
      isPopular && "ring-2 ring-accent-primary/50 shadow-blood-glow"
    )} style={{ animationDelay: `${index * 100}ms` }}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="btn-ritual px-3 py-1 text-step--2">
            Most Summoned
          </span>
        </div>
      )}
      
      <div className="flex-1 flex flex-col p-6 md:p-8">
        <div className="mb-6">
          <h3 className="heading-ritual-alt text-step-3 mb-2">{tier.name}</h3>
          <p className="muted-ritual text-step-0">{tier.description}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline gap-1 mb-2">
            <span className="heading-ritual text-step-6 font-semibold">
              {formatPrice(tier.price, tier.interval)}
            </span>
            <span className="text-text-muted font-body">
              {getIntervalLabel(tier.interval)}
            </span>
          </div>
        </div>

        <ul className="space-y-3 mb-8 flex-1">
          {tier.features.map((feature, i) => (
            <li key={feature} className="flex items-start gap-3 text-text-secondary font-body text-step-0">
              <Check className="text-accent-primary flex-shrink-0 mt-0.5" size={18} aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => onCtaClick?.(tier)}
          className={cn(
            "btn-ritual w-full",
            isPopular && "bg-accent-primary text-void-950 hover:bg-blood-500"
          )}
          disabled={tier.price === 0 && tier.interval === "custom"}
        >
          <span>{tier.cta}</span>
        </button>
      </div>
    </div>
  );
}
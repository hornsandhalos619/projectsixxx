"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  confession?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  className?: string;
  title?: string;
}

export function FAQAccordion({ items, className, title = "Confessions" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className={cn("space-y-4", className)}>
      {title && (
        <h3 className="heading-ritual-alt text-step-2 mb-6 text-center">
          {title}
        </h3>
      )}
      <div className="space-y-4" role="region" aria-label="Frequently asked questions">
        {items.map((item, index) => (
          <FAQItemComponent
            key={index}
            item={item}
            index={index}
            isOpen={openIndex === index}
            onToggle={() => toggle(index)}
          />
        ))}
      </div>
    </div>
  );
}

function FAQItemComponent({ 
  item, 
  index, 
  isOpen, 
  onToggle 
}: { 
  item: FAQItem; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <details 
      className={cn(
        "card-ritual group",
        isOpen && "ring-1 ring-accent-primary/30"
      )}
      open={isOpen}
      onToggle={onToggle}
    >
      <summary className={cn(
        "flex items-center justify-between p-6 cursor-pointer list-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-primary focus-visible:ring-offset-2 focus-visible:ring-offset-void-900"
      )}>
        <span className="heading-ritual-alt text-step-1 pr-10 text-text-primary">
          {item.question}
        </span>
        <ChevronDown 
          className={cn(
            "flex-shrink-0 text-accent-secondary transition-transform duration-300 ease-caress",
            isOpen && "rotate-180"
          )} 
          size={20} 
          aria-hidden="true"
        />
      </summary>
      <div className="px-6 pb-6 animate-in">
        <div className="body-ritual text-step-0 text-text-secondary border-t border-border-subtle pt-6">
          {item.answer}
        </div>
        {item.confession && (
          <div className="mt-4 pt-4 border-t border-border-subtle/50">
            <p className="muted-ritual text-step--1 italic relative pl-4">
              <span className="font-ui text-step--2 uppercase tracking-wider text-accent-primary block mb-1">Confession:</span>
              {item.confession}
            </p>
          </div>
        )}
      </div>
    </details>
  );
}
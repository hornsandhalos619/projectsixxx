"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight, Shield, TrendingUp, Zap } from "lucide-react";

interface Metric {
  label: string;
  value: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface CaseStudyCardProps {
  title: string;
  client: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: Metric[];
  testimonial: Testimonial;
  featured?: boolean;
  className?: string;
}

export function CaseStudyCard({ 
  title, 
  client, 
  industry, 
  challenge, 
  solution, 
  results, 
  metrics, 
  testimonial,
  featured,
  className 
}: CaseStudyCardProps) {
  return (
    <article className={cn("card-ritual relative overflow-hidden", featured && "ring-1 ring-accent-primary/30", className)}>
      {featured && (
        <div className="absolute top-4 right-4 z-10">
          <span className="btn-ritual px-3 py-1 text-step--2">
            Sworn Oath
          </span>
        </div>
      )}

      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <span className="font-ui text-step--1 uppercase tracking-wider text-accent-secondary mb-2 block">
            Case Study • {industry}
          </span>
          <h3 className="heading-ritual-alt text-step-3 mb-2">{title}</h3>
          <p className="muted-ritual">Client: <span className="text-text-secondary">{client}</span></p>
        </div>

        {/* Challenge & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-void-800/50 border border-border-subtle p-5">
            <h4 className="heading-ritual-alt text-step-1 mb-3 flex items-center gap-2">
              <Zap className="text-accent-primary" size={18} />
              The Challenge
            </h4>
            <p className="body-ritual text-step-0">{challenge}</p>
          </div>
          <div className="bg-void-800/50 border border-border-subtle p-5">
            <h4 className="heading-ritual-alt text-step-1 mb-3 flex items-center gap-2">
              <Shield className="text-accent-secondary" size={18} />
              The Forge
            </h4>
            <p className="body-ritual text-step-0">{solution}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, i) => (
            <div 
              key={metric.label} 
              className="text-center p-4 bg-void-800/50 border border-border-subtle"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="heading-ritual text-step-4 font-semibold text-accent-primary mb-1">
                {metric.value}
              </div>
              <div className="font-ui text-step--2 uppercase tracking-wider text-text-muted">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Results */}
        <div className="mb-8">
          <h4 className="heading-ritual-alt text-step-1 mb-4 flex items-center gap-2">
            <TrendingUp className="text-accent-primary" size={18} />
            The Harvest
          </h4>
          <ul className="space-y-2">
            {results.map((result, i) => (
              <li key={result} className="flex items-start gap-3 text-text-secondary font-body text-step-0">
                <ArrowRight className="text-accent-primary flex-shrink-0 mt-1" size={16} aria-hidden="true" />
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Testimonial */}
        <blockquote className="relative bg-void-800/50 border border-accent-primary/20 p-6">
          <div className="absolute -top-3 left-6 bg-void-800 px-2">
            <span className="font-ui text-step--2 uppercase tracking-wider text-accent-primary">
              Sworn Oath
            </span>
          </div>
          <p className="body-ritual text-step-1 italic mb-4 relative z-10">
            &ldquo;{testimonial.quote}&rdquo;
          </p>
          <footer className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blood-400 to-blood-500 flex items-center justify-center font-display text-step-1 text-void-950">
              {testimonial.author.charAt(0)}
            </div>
            <div>
              <div className="font-body text-text-primary">{testimonial.author}</div>
              <div className="muted-ritual text-step--1">{testimonial.role}, {testimonial.company}</div>
            </div>
          </footer>
        </blockquote>
      </div>
    </article>
  );
}
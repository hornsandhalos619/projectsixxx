"use client";

import { cn } from "@/lib/utils";
import { Search, PenTool, Hammer, Truck } from "lucide-react";

interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  duration?: string;
}

const DEFAULT_STEPS: ProcessStep[] = [
  {
    number: 1,
    title: "Discovery",
    description: "We descend into your vision — auditing current state, mapping constraints, and divining the true objective. No assumptions. Only revelation.",
    icon: <Search className="w-6 h-6" />,
    duration: "Week 1",
  },
  {
    number: 2,
    title: "Design",
    description: "Architecture forged in strategy. We design the system, the flows, the interfaces — every decision documented, every trade-off declared. You approve before we build.",
    icon: <PenTool className="w-6 h-6" />,
    duration: "Week 2-3",
  },
  {
    number: 3,
    title: "Forge",
    description: "Code hammered into existence. Clean, tested, documented. Daily visibility. No black boxes. You watch the artifact take shape in real-time.",
    icon: <Hammer className="w-6 h-6" />,
    duration: "Weeks 4-8",
  },
  {
    number: 4,
    title: "Deliver",
    description: "The ritual completes. Deployment, training, documentation, handoff. We don't vanish — we ensure the thing lives and thrives in your hands.",
    icon: <Truck className="w-6 h-6" />,
    duration: "Week 9+",
  },
];

interface ProcessTimelineProps {
  steps?: ProcessStep[];
  className?: string;
  title?: string;
  subtitle?: string;
}

export function ProcessTimeline({ 
  steps = DEFAULT_STEPS, 
  className, 
  title = "The Ritual",
  subtitle = "Four phases. No shortcuts. Only mastery."
}: ProcessTimelineProps) {
  return (
    <section className={cn("relative", className)} aria-labelledby="process-title">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-accent-primary/30 to-transparent" aria-hidden="true" />
      
      <div className="text-center mb-16 relative z-10">
        <h2 id="process-title" className="heading-ritual text-step-4 mb-4">{title}</h2>
        <p className="body-ritual text-step-1 text-text-secondary max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="relative z-10">
        {steps.map((step, index) => (
          <ProcessStepComponent 
            key={step.number}
            step={step}
            index={index}
            isLast={index === steps.length - 1}
            totalSteps={steps.length}
          />
        ))}
      </div>
    </section>
  );
}

function ProcessStepComponent({ 
  step, 
  index, 
  isLast,
  totalSteps
}: { 
  step: ProcessStep; 
  index: number; 
  isLast: boolean;
  totalSteps: number;
}) {
  const isEven = index % 2 === 0;
  
  return (
    <div 
      className="relative flex mb-16 last:mb-0"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Connecting line */}
      {!isLast && (
        <div className="absolute left-1/2 top-[120px] bottom-0 w-0.5 bg-border-subtle" aria-hidden="true" />
      )}

      <div className={cn(
        "w-1/2 relative z-10",
        isEven ? "pr-12 md:pr-20 text-right" : "pl-12 md:pl-20 ml-auto"
      )}>
        {/* Step number badge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full bg-void-800 border-2 border-accent-primary flex items-center justify-center z-20">
          <span className="heading-ritual text-step-2 font-semibold text-accent-primary">
            {step.number}
          </span>
        </div>

        {/* Step content card */}
        <div className="card-ritual p-6 md:p-8 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full bg-void-800 border-2 border-border-subtle flex items-center justify-center text-accent-secondary">
            {step.icon}
          </div>
          
          <div className="pt-8">
            <div className="flex items-center justify-between mb-3">
              <h3 className="heading-ritual-alt text-step-2">{step.title}</h3>
              {step.duration && (
                <span className="font-ui text-step--2 uppercase tracking-wider text-accent-secondary">
                  {step.duration}
                </span>
              )}
            </div>
            <p className="body-ritual text-step-0 text-text-secondary">{step.description}</p>
          </div>
        </div>
      </div>

      {/* Mirror content on opposite side for visual balance */}
      <div className={cn(
        "w-1/2 relative z-10",
        isEven ? "pl-12 md:pl-20 ml-auto" : "pr-12 md:pr-20 text-right"
      )}>
        <div className="opacity-0" aria-hidden="true">
          <div className="card-ritual p-6 md:p-8 h-full border-border-subtle/50" />
        </div>
      </div>
    </div>
  );
}

// Alternative: Horizontal timeline for mobile
export function ProcessTimelineHorizontal({ 
  steps = DEFAULT_STEPS, 
  className 
}: ProcessTimelineProps) {
  return (
    <div className={cn("overflow-x-auto pb-8", className)}>
      <div className="flex gap-4 min-w-max">
        {steps.map((step, index) => (
          <div 
            key={step.number} 
            className="flex-shrink-0 w-72 md:w-80"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="card-ritual p-6 h-full flex flex-col">
              <div className="relative mb-6">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-void-800 border-2 border-accent-primary flex items-center justify-center">
                  <span className="heading-ritual text-step-3 font-semibold text-accent-primary">
                    {step.number}
                  </span>
                </div>
                <div className="w-12 h-12 mx-auto rounded-full bg-void-800 border-2 border-border-subtle flex items-center justify-center text-accent-secondary">
                  {step.icon}
                </div>
              </div>
              
              <h3 className="heading-ritual-alt text-step-2 text-center mb-3">{step.title}</h3>
              {step.duration && (
                <p className="font-ui text-step--2 uppercase tracking-wider text-accent-secondary text-center mb-4">
                  {step.duration}
                </p>
              )}
              <p className="body-ritual text-step-0 text-text-secondary text-center flex-1">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
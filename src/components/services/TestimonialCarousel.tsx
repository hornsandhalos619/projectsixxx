"use client";

import { useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  className?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export function TestimonialCarousel({ 
  testimonials, 
  className, 
  autoPlay = true, 
  autoPlayInterval = 8000 
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, testimonials.length]);

  const prev = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, testimonials.length]);

  const goTo = useCallback((index: number) => {
    if (isAnimating || index === currentIndex) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay || testimonials.length <= 1) return;
    const interval = setInterval(next, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, next, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-ritual"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <TestimonialCard testimonial={testimonial} isActive={index === currentIndex} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            disabled={isAnimating}
            className="btn-ritual-secondary p-3 rounded-full hover:bg-accent-secondary/10 transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="text-accent-secondary" size={20} />
          </button>
          
          <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  index === currentIndex
                    ? "bg-accent-primary w-6"
                    : "bg-border-subtle hover:bg-accent-primary/50"
                )}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={isAnimating}
            className="btn-ritual-secondary p-3 rounded-full hover:bg-accent-secondary/10 transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRight className="text-accent-secondary" size={20} />
          </button>
        </div>
      )}
    </div>
  );
}

function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
  return (
    <blockquote className={cn(
      "card-ritual p-6 md:p-8 text-center max-w-3xl mx-auto",
      isActive ? "ring-1 ring-accent-primary/30 shadow-blood-glow" : "opacity-60"
    )}>
      <div className="absolute -top-4 left-1/2 -translate-x-1/2">
        <Quote className="text-accent-primary/30" size={40} aria-hidden="true" />
      </div>
      
      <p className="body-ritual text-step-1 italic mb-6 relative z-10 leading-relaxed">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      
      <footer className="relative z-10">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blood-400 to-blood-500 flex items-center justify-center font-display text-step-2 text-void-950 mx-auto mb-4">
          {testimonial.author.charAt(0)}
        </div>
        <div className="font-body text-text-primary text-step-1">{testimonial.author}</div>
        <div className="muted-ritual text-step--1">{testimonial.role}, {testimonial.company}</div>
      </footer>
    </blockquote>
  );
}
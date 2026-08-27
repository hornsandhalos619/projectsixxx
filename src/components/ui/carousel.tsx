"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { GothicIcons } from "./icon";

const carouselVariants = cva(
  "relative w-full overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        blood: "",
        wine: "",
        velvet: "texture-velvet",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const carouselViewportVariants = cva(
  "relative w-full overflow-hidden",
  {
    variants: {
      variant: {
        default: "",
        snap: "snap-x snap-mandatory",
      },
    },
    defaultVariants: {
      variant: "snap",
    },
  }
);

const carouselTrackVariants = cva(
  "flex h-full transition-transform duration-sigh ease-sigh",
  {
    variants: {
      variant: {
        default: "",
        snap: "snap-x snap-mandatory",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const carouselSlideVariants = cva(
  "flex-shrink-0 w-full snap-center",
  {
    variants: {
      align: {
        center: "items-center justify-center",
        start: "items-start justify-start",
        end: "items-end justify-end",
      },
    },
    defaultVariants: {
      align: "center",
    },
  }
);

const carouselButtonVariants = cva(
  "absolute top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-void-800/80 backdrop-blur-sm border border-border-subtle text-pallor-300 transition-all duration-flutter hover:bg-blood-400/20 hover:border-blood-400/50 hover:text-blood-300 focus-blood",
  {
    variants: {
      variant: {
        default: "",
        blood: "bg-blood-400/20 border-blood-400/30 text-blood-300 hover:bg-blood-400/30",
        wine: "bg-wine-400/20 border-wine-400/30 text-wine-300 hover:bg-wine-400/30",
      },
      position: {
        prev: "left-4",
        next: "right-4",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "prev",
    },
  }
);

const carouselDotsVariants = cva(
  "absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2",
  {
    variants: {
      variant: {
        default: "",
        blood: "",
        wine: "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const carouselDotVariants = cva(
  "relative h-2 w-2 rounded-full bg-pallor-300/30 transition-all duration-flutter hover:bg-pallor-300/60 focus-blood data-[state=active]:bg-blood-400 data-[state=active]:w-6 data-[state=active]:rounded-full",
  {
    variants: {
      variant: {
        default: "data-[state=active]:bg-blood-400",
        blood: "data-[state=active]:bg-blood-400",
        wine: "data-[state=active]:bg-wine-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface CarouselProps {
  children: React.ReactNode;
  variant?: VariantProps<typeof carouselVariants>["variant"];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  infinite?: boolean;
  snap?: boolean;
  className?: string;
  onSlideChange?: (index: number) => void;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      variant = "default",
      autoPlay = false,
      autoPlayInterval = 5000,
      showArrows = true,
      showDots = true,
      infinite = true,
      snap = true,
      className,
      onSlideChange,
    },
    ref
  ) => {
    const slides = React.Children.toArray(children);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isDragging, setIsDragging] = React.useState(false);
    const [dragStart, setDragStart] = React.useState<{ x: number; index: number } | null>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);
    const autoPlayRef = React.useRef<NodeJS.Timeout | null>(null);

    const goToSlide = React.useCallback(
      (index: number) => {
        const clampedIndex = infinite
          ? ((index % slides.length) + slides.length) % slides.length
          : Math.max(0, Math.min(index, slides.length - 1));
        setCurrentIndex(clampedIndex);
        onSlideChange?.(clampedIndex);
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(-${clampedIndex * 100}%)`;
        }
      },
      [slides.length, infinite, onSlideChange]
    );

    const nextSlide = React.useCallback(() => {
      goToSlide(currentIndex + 1);
    }, [currentIndex, goToSlide]);

    const prevSlide = React.useCallback(() => {
      goToSlide(currentIndex - 1);
    }, [currentIndex, goToSlide]);

    // Auto-play
    React.useEffect(() => {
      if (autoPlay && slides.length > 1) {
        autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);
        return () => {
          if (autoPlayRef.current) clearInterval(autoPlayRef.current);
        };
      }
    }, [autoPlay, autoPlayInterval, slides.length, nextSlide]);

    // Keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") prevSlide();
        if (e.key === "ArrowRight") nextSlide();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [prevSlide, nextSlide]);

    // Touch drag
    const handleDragStart = (e: React.TouchEvent | React.MouseEvent) => {
      setIsDragging(true);
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      setDragStart({ x: clientX, index: currentIndex });
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };

    const handleDragMove = (e: React.TouchEvent | React.MouseEvent) => {
      if (!isDragging || !dragStart || !trackRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const deltaX = clientX - dragStart.x;
      const dragPercent = (deltaX / (trackRef.current.offsetWidth || 1)) * 100;
      trackRef.current.style.transform = `translateX(calc(-${dragStart.index * 100}% + ${dragPercent}%))`;
      trackRef.current.style.transition = "none";
    };

    const handleDragEnd = (e: React.TouchEvent | React.MouseEvent) => {
      if (!isDragging || !dragStart || !trackRef.current) return;
      const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
      const deltaX = clientX - dragStart.x;
      const threshold = 50; // px
      if (Math.abs(deltaX) > threshold) {
        goToSlide(dragStart.index - Math.sign(deltaX));
      } else {
        goToSlide(dragStart.index);
      }
      setIsDragging(false);
      setDragStart(null);
      trackRef.current.style.transition = "transform var(--dur-sigh) var(--ease-sigh)";
      if (autoPlay) {
        autoPlayRef.current = setInterval(nextSlide, autoPlayInterval);
      }
    };

    return (
      <div
        ref={ref}
        className={cn(carouselVariants({ variant }), className)}
        onTouchStart={handleDragStart}
        onTouchMove={handleDragMove}
        onTouchEnd={handleDragEnd}
        onMouseDown={handleDragStart}
        onMouseMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        role="region"
        aria-label="Carousel"
        aria-roledescription="carousel"
      >
        <div
          ref={trackRef}
          className={cn(carouselTrackVariants({ variant: snap ? "snap" : "default" }), "h-full")}
          style={{ transform: `translateX(-${currentIndex * 100}%)` } as React.CSSProperties}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className={cn(carouselSlideVariants({ align: "center" }), "h-full")}
              style={{ width: "100%" } as React.CSSProperties}
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${index + 1} of ${slides.length}`}
              aria-hidden={index !== currentIndex}
            >
              {slide}
            </div>
          ))}
        </div>

        {showArrows && slides.length > 1 && (
          <>
            <button
              type="button"
              className={cn(carouselButtonVariants({ variant, position: "prev" }))}
              onClick={prevSlide}
              aria-label="Previous slide"
              disabled={!infinite && currentIndex === 0}
            >
              <GothicIcons.VelvetRibbon className="h-6 w-6 rotate-180" aria-hidden="true" />
            </button>
            <button
              type="button"
              className={cn(carouselButtonVariants({ variant, position: "next" }))}
              onClick={nextSlide}
              aria-label="Next slide"
              disabled={!infinite && currentIndex === slides.length - 1}
            >
              <GothicIcons.VelvetRibbon className="h-6 w-6" aria-hidden="true" />
            </button>
          </>
        )}

        {showDots && slides.length > 1 && (
          <div className={cn(carouselDotsVariants({ variant }), "pointer-events-auto")} role="tablist" aria-label="Slide navigation">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(carouselDotVariants({ variant }), index === currentIndex && "data-[state=active]")}
                onClick={() => goToSlide(index)}
                data-state={index === currentIndex ? "active" : "inactive"}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);
Carousel.displayName = "Carousel";

export { Carousel };
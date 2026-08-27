"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, ExternalLink } from "lucide-react";

interface CalendlyEmbedProps {
  url: string;
  serviceName: string;
  className?: string;
  inline?: boolean;
  prefill?: Record<string, string>;
}

export function CalendlyEmbed({ 
  url, 
  serviceName, 
  className, 
  inline = false,
  prefill 
}: CalendlyEmbedProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const widgetRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (inline) {
      // Load Calendly inline widget
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = () => {
        if (widgetRef.current && (window as any).Calendly) {
          (window as any).Calendly.initInlineWidget({
            url: buildCalendlyUrl(url, prefill),
            parentElement: widgetRef.current,
            prefill: prefill,
            utm: {
              utm_source: "projectsixxx",
              utm_medium: "service-page",
              utm_campaign: serviceName.toLowerCase().replace(/\s+/g, "-"),
            },
          });
          setLoaded(true);
        }
      };
      script.onerror = () => setError(true);
      document.head.appendChild(script);
      return () => {
        if (widgetRef.current && (window as any).Calendly) {
          (window as any).Calendly.destroy(widgetRef.current);
        }
      };
    }
  }, [url, serviceName, prefill, inline]);

  const buildCalendlyUrl = (baseUrl: string, prefill?: Record<string, string>) => {
    if (!prefill) return baseUrl;
    const params = new URLSearchParams();
    Object.entries(prefill).forEach(([key, value]) => {
      params.append(key, value);
    });
    const separator = baseUrl.includes("?") ? "&" : "?";
    return `${baseUrl}${separator}${params.toString()}`;
  };

  const handleDirectLink = () => {
    const directUrl = buildCalendlyUrl(url, prefill);
    window.open(directUrl, "_blank", "noopener,noreferrer");
  };

  if (inline) {
    return (
      <div className={cn("w-full", className)}>
        {error && (
          <div className="card-ritual p-8 text-center border-accent-primary/50">
            <p className="body-ritual text-text-secondary mb-4">
              The ritual circle failed to manifest. The spirits are restless.
            </p>
            <button
              onClick={handleDirectLink}
              className="btn-ritual inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Open in New Tab</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        )}
        {!error && !loaded && (
          <div className="card-ritual p-8 text-center animate-pulse">
            <div className="flex items-center justify-center gap-3 text-text-muted">
              <div className="w-6 h-6 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
              <span className="font-ui text-step-0">Summoning the calendar...</span>
            </div>
          </div>
        )}
        <div ref={widgetRef} className="min-h-[600px]" style={{ minHeight: "600px" }} />
      </div>
    );
  }

  // Popup/button mode
  return (
    <div className={cn("inline-flex", className)}>
      <button
        onClick={handleDirectLink}
        className="btn-ritual inline-flex items-center gap-3"
        aria-label={`Book ${serviceName} consultation`}
      >
        <Calendar className="w-5 h-5" />
        <span>Summon This Service</span>
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );
}

// Popup widget hook for on-demand loading
export function useCalendlyPopup() {
  const open = (url: string, prefill?: Record<string, string>) => {
    const params = new URLSearchParams();
    if (prefill) {
      Object.entries(prefill).forEach(([key, value]) => {
        params.append(key, value);
      });
    }
    params.append("utm_source", "projectsixxx");
    params.append("utm_medium", "popup");
    const separator = url.includes("?") ? "&" : "?";
    const popupUrl = `${url}${separator}${params.toString()}`;
    
    window.open(popupUrl, "calendly", "width=800,height=700,noopener,noreferrer");
  };

  return { open };
}
'use client';

import { useEffect } from 'react';
import { initSentry, initPostHog, initPlausible } from '@/lib/monitoring';
import { AnalyticsEvents } from '@/lib/monitoring/posthog';
import { PlausibleEvents } from '@/lib/monitoring/plausible';
import { trackEvent } from '@/lib/monitoring/posthog';
import { trackPlausibleEvent } from '@/lib/monitoring/plausible';

export function MonitoringProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize all monitoring services
    initSentry();
    initPostHog();
    initPlausible();

    // Track initial page view
    trackEvent(AnalyticsEvents.PAGE_VIEW, {
      path: window.location.pathname,
      referrer: document.referrer,
    });

    trackPlausibleEvent(PlausibleEvents.PAGE_VIEW, {
      path: window.location.pathname,
    });

    // Track scroll depth
    let scrollDepthTracked = { 25: false, 50: false, 75: false, 100: false };
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );

      if (scrollPercent >= 25 && !scrollDepthTracked[25]) {
        trackPlausibleEvent(PlausibleEvents.SCROLL_25);
        scrollDepthTracked[25] = true;
      }
      if (scrollPercent >= 50 && !scrollDepthTracked[50]) {
        trackPlausibleEvent(PlausibleEvents.SCROLL_50);
        scrollDepthTracked[50] = true;
      }
      if (scrollPercent >= 75 && !scrollDepthTracked[75]) {
        trackPlausibleEvent(PlausibleEvents.SCROLL_75);
        scrollDepthTracked[75] = true;
      }
      if (scrollPercent >= 100 && !scrollDepthTracked[100]) {
        trackPlausibleEvent(PlausibleEvents.SCROLL_100);
        scrollDepthTracked[100] = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return <>{children}</>;
}
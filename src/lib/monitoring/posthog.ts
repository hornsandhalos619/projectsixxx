import posthog from 'posthog-js';
import { PostHog } from 'posthog-js';

let posthogInstance: PostHog | null = null;

export function initPostHog() {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthogInstance = posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      person_profiles: 'identified_only',
      capture_pageview: true,
      capture_pageleave: true,
      persistence: 'localStorage',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          posthog.debug();
        }
      },
      // Privacy-friendly settings
      disable_session_recording: false,
      session_recording: {
        maskAllText: false,
        blockAllMedia: false,
      },
    });
  }
  return posthogInstance;
}

export function getPostHog(): PostHog | null {
  return posthogInstance;
}

export function captureEvent(eventName: string, properties?: Record<string, any>) {
  if (posthogInstance) {
    posthogInstance.capture(eventName, properties);
  }
}

export function identifyUser(userId: string, traits?: Record<string, any>) {
  if (posthogInstance) {
    posthogInstance.identify(userId, traits);
  }
}

export function resetUser() {
  if (posthogInstance) {
    posthogInstance.reset();
  }
}

export function setUserProperties(properties: Record<string, any>) {
  if (posthogInstance) {
    posthogInstance.people.set(properties);
  }
}

export function setGroup(groupType: string, groupKey: string, groupProperties?: Record<string, any>) {
  if (posthogInstance) {
    posthogInstance.group(groupType, groupKey, groupProperties);
  }
}

// Feature flags
export function getFeatureFlag(flagKey: string): boolean | string | undefined {
  if (posthogInstance) {
    return posthogInstance.getFeatureFlag(flagKey);
  }
  return undefined;
}

export function getAllFeatureFlags(): Record<string, boolean | string> {
  if (posthogInstance) {
    return posthogInstance.getAllFeatureFlags() || {};
  }
  return {};
}

export function onFeatureFlags(callback: (flags: Record<string, boolean | string>) => void) {
  if (posthogInstance) {
    posthogInstance.onFeatureFlags(callback);
  }
}

// Session recording
export function startSessionRecording() {
  if (posthogInstance) {
    posthogInstance.startSessionRecording();
  }
}

export function stopSessionRecording() {
  if (posthogInstance) {
    posthogInstance.stopSessionRecording();
  }
}

// Analytics events for Projectsixxx
export const AnalyticsEvents = {
  // Page views
  PAGE_VIEW: 'page_view',
  PAGE_LEAVE: 'page_leave',

  // Shop events
  PRODUCT_VIEW: 'product_view',
  PRODUCT_ADD_TO_CART: 'product_add_to_cart',
  PRODUCT_REMOVE_FROM_CART: 'product_remove_from_cart',
  CART_VIEW: 'cart_view',
  CHECKOUT_START: 'checkout_start',
  CHECKOUT_COMPLETE: 'checkout_complete',
  ORDER_COMPLETE: 'order_complete',

  // Service events
  SERVICE_VIEW: 'service_view',
  SERVICE_INQUIRY_START: 'service_inquiry_start',
  SERVICE_INQUIRY_COMPLETE: 'service_inquiry_complete',
  CALENDLY_BOOKING_OPEN: 'calendly_booking_open',
  CALENDLY_BOOKING_COMPLETE: 'calendly_booking_complete',

  // Gallery events
  GALLERY_VIEW: 'gallery_view',
  ARTWORK_VIEW: 'artwork_view',
  LIGHTBOX_OPEN: 'lightbox_open',
  COMMISSION_INQUIRY: 'commission_inquiry',

  // Journal events
  ARTICLE_VIEW: 'article_view',
  ARTICLE_READ_COMPLETE: 'article_read_complete',
  NEWSLETTER_SIGNUP: 'newsletter_signup',

  // Contact events
  CONTACT_FORM_START: 'contact_form_start',
  CONTACT_FORM_COMPLETE: 'contact_form_complete',

  // User events
  USER_SIGNUP: 'user_signup',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',

  // Engagement
  SCROLL_DEPTH: 'scroll_depth',
  TIME_ON_PAGE: 'time_on_page',
  BUTTON_CLICK: 'button_click',
  LINK_CLICK: 'link_click',
};

export function trackEvent(eventName: string, properties?: Record<string, any>) {
  captureEvent(eventName, {
    ...properties,
    timestamp: new Date().toISOString(),
    url: typeof window !== 'undefined' ? window.location.href : undefined,
    referrer: typeof document !== 'undefined' ? document.referrer : undefined,
  });
}
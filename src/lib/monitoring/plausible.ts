// Plausible Analytics Integration
// Privacy-first, GDPR-compliant analytics

declare global {
  interface Window {
    plausible: (event: string, options?: { props?: Record<string, any> }) => void;
  }
}

export function initPlausible() {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN) {
    const script = document.createElement('script');
    script.defer = true;
    script.dataset.domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
    script.src = `${process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST || 'https://plausible.io'}/js/script.js`;
    document.head.appendChild(script);
  }
}

export function trackPageView(url?: string) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible('pageview', {
      u: url || window.location.href,
    });
  }
}

export function trackEvent(eventName: string, props?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.plausible) {
    window.plausible(eventName, { props });
  }
}

// Projectsixxx-specific events
export const PlausibleEvents = {
  // Shop
  PRODUCT_VIEW: 'product_view',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  CART_VIEW: 'cart_view',
  CHECKOUT_START: 'checkout_start',
  PURCHASE: 'purchase',

  // Services
  SERVICE_VIEW: 'service_view',
  SERVICE_INQUIRY: 'service_inquiry',
  BOOKING_START: 'booking_start',
  BOOKING_COMPLETE: 'booking_complete',

  // Gallery
  GALLERY_VIEW: 'gallery_view',
  ARTWORK_VIEW: 'artwork_view',
  COMMISSION_INQUIRY: 'commission_inquiry',

  // Journal
  ARTICLE_VIEW: 'article_view',
  NEWSLETTER_SIGNUP: 'newsletter_signup',

  // Contact
  CONTACT_FORM_SUBMIT: 'contact_form_submit',

  // User
  SIGNUP: 'signup',
  LOGIN: 'login',

  // Engagement
  SCROLL_25: 'scroll_25',
  SCROLL_50: 'scroll_50',
  SCROLL_75: 'scroll_75',
  SCROLL_100: 'scroll_100',
};

export function trackPlausibleEvent(eventName: string, props?: Record<string, any>) {
  trackEvent(eventName, props);
}
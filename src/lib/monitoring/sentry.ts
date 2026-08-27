import * as Sentry from '@sentry/nextjs';

export function initSentry() {
  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    Sentry.init({
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
      environment: process.env.NODE_ENV,
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      replaysOnErrorSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      integrations: [
        Sentry.replayIntegration({
          maskAllText: false,
          blockAllMedia: false,
        }),
        Sentry.browserTracingIntegration(),
        Sentry.httpClientIntegration(),
      ],
      beforeSend(event, hint) {
        // Filter out known non-critical errors
        if (event.exception) {
          const error = hint.originalException;
          if (error instanceof Error) {
            // Ignore network errors
            if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch')) {
              return null;
            }
            // Ignore ResizeObserver loop errors
            if (error.message.includes('ResizeObserver loop')) {
              return null;
            }
          }
        }
        return event;
      },
      ignoreErrors: [
        'NetworkError',
        'Failed to fetch',
        'ResizeObserver loop limit exceeded',
        'Non-Error promise rejection captured',
      ],
    });
  }
}

export function captureException(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  });
}

export function captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
  Sentry.captureMessage(message, level);
}

export function setUserContext(user: { id: string; email?: string; username?: string }) {
  Sentry.setUser(user);
}

export function clearUserContext() {
  Sentry.setUser(null);
}

export function addBreadcrumb(breadcrumb: Sentry.Breadcrumb) {
  Sentry.addBreadcrumb(breadcrumb);
}

export function startTransaction(name: string, op: string) {
  return Sentry.startTransaction({ name, op });
}

// Performance monitoring helpers
export function measurePerformance(name: string, fn: () => Promise<any>) {
  return Sentry.startSpan({ name, op: 'function' }, fn);
}

export function setTag(key: string, value: string) {
  Sentry.setTag(key, value);
}

export function setContext(name: string, context: Record<string, any>) {
  Sentry.setContext(name, context);
}
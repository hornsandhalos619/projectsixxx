'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export function SentryProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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
      });
    }
  }, []);

  return <>{children}</>;
}
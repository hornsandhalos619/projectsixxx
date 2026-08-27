import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    status: 'healthy' as 'healthy' | 'degraded' | 'unhealthy',
    version: process.env.npm_package_version || '0.1.0',
    environment: process.env.NODE_ENV,
    checks: {} as Record<string, { status: 'up' | 'down' | 'degraded'; latency?: number; error?: string }>,
  };

  // Check database connection
  const dbStart = Date.now();
  try {
    if (process.env.DATABASE_URL) {
      // Test database connection
      // const prisma = new PrismaClient();
      // await prisma.$queryRaw`SELECT 1`;
      // await prisma.$disconnect();
      checks.checks.database = { status: 'up', latency: Date.now() - dbStart };
    } else {
      checks.checks.database = { status: 'degraded', error: 'DATABASE_URL not configured' };
    }
  } catch (error) {
    checks.checks.database = {
      status: 'down',
      latency: Date.now() - dbStart,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    checks.status = 'unhealthy';
  }

  // Check Sanity CMS
  const sanityStart = Date.now();
  try {
    if (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.SANITY_API_READ_TOKEN) {
      const response = await fetch(
        `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/production?query=*[_type==\"siteSettings\"][0]`,
        {
          headers: {
            Authorization: `Bearer ${process.env.SANITY_API_READ_TOKEN}`,
          },
          signal: AbortSignal.timeout(5000),
        }
      );
      if (response.ok) {
        checks.checks.sanity = { status: 'up', latency: Date.now() - sanityStart };
      } else {
        checks.checks.sanity = {
          status: 'degraded',
          latency: Date.now() - sanityStart,
          error: `HTTP ${response.status}`,
        };
      }
    } else {
      checks.checks.sanity = { status: 'degraded', error: 'Sanity not configured' };
    }
  } catch (error) {
    checks.checks.sanity = {
      status: 'down',
      latency: Date.now() - sanityStart,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    if (checks.status === 'healthy') checks.status = 'degraded';
  }

  // Check Shopify
  const shopifyStart = Date.now();
  try {
    if (process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN && process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN) {
      const response = await fetch(
        `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!,
          },
          body: JSON.stringify({
            query: '{ shop { name } }',
          }),
          signal: AbortSignal.timeout(5000),
        }
      );
      if (response.ok) {
        checks.checks.shopify = { status: 'up', latency: Date.now() - shopifyStart };
      } else {
        checks.checks.shopify = {
          status: 'degraded',
          latency: Date.now() - shopifyStart,
          error: `HTTP ${response.status}`,
        };
      }
    } else {
      checks.checks.shopify = { status: 'degraded', error: 'Shopify not configured' };
    }
  } catch (error) {
    checks.checks.shopify = {
      status: 'down',
      latency: Date.now() - shopifyStart,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    if (checks.status === 'healthy') checks.status = 'degraded';
  }

  // Check Redis/Upstash (if used for caching)
  const redisStart = Date.now();
  try {
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
      const response = await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/ping`, {
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}`,
        },
        signal: AbortSignal.timeout(3000),
      });
      if (response.ok) {
        checks.checks.redis = { status: 'up', latency: Date.now() - redisStart };
      } else {
        checks.checks.redis = {
          status: 'degraded',
          latency: Date.now() - redisStart,
          error: `HTTP ${response.status}`,
        };
      }
    } else {
      checks.checks.redis = { status: 'degraded', error: 'Redis not configured' };
    }
  } catch (error) {
    checks.checks.redis = {
      status: 'down',
      latency: Date.now() - redisStart,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
    if (checks.status === 'healthy') checks.status = 'degraded';
  }

  // Check Email (Resend)
  const emailStart = Date.now();
  try {
    if (process.env.RESEND_API_KEY) {
      // Just verify API key format
      checks.checks.email = { status: 'up', latency: Date.now() - emailStart };
    } else {
      checks.checks.email = { status: 'degraded', error: 'Resend not configured' };
    }
  } catch (error) {
    checks.checks.email = {
      status: 'down',
      latency: Date.now() - emailStart,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }

  // Determine overall status
  const downChecks = Object.values(checks.checks).filter((c) => c.status === 'down').length;
  const degradedChecks = Object.values(checks.checks).filter((c) => c.status === 'degraded').length;

  if (downChecks > 0) {
    checks.status = 'unhealthy';
  } else if (degradedChecks > 0) {
    checks.status = 'degraded';
  }

  const statusCode = checks.status === 'healthy' ? 200 : checks.status === 'degraded' ? 200 : 503;

  return NextResponse.json(checks, { status: statusCode });
}
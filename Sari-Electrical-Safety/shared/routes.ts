import { z } from 'zod';
import { insertReadingSchema, insertAlertSchema, readings, alerts } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  readings: {
    latest: {
      method: 'GET' as const,
      path: '/api/readings/latest',
      responses: {
        200: z.custom<typeof readings.$inferSelect>(),
      },
    },
    history: {
      method: 'GET' as const,
      path: '/api/readings/history',
      input: z.object({
        limit: z.coerce.number().optional().default(50),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof readings.$inferSelect>()),
      },
    },
    stats: {
        method: 'GET' as const,
        path: '/api/readings/stats',
        responses: {
            200: z.object({
                averagePower: z.number(),
                peakCurrent: z.number(),
                totalAlerts: z.number()
            })
        }
    }
  },
  alerts: {
    list: {
      method: 'GET' as const,
      path: '/api/alerts',
      responses: {
        200: z.array(z.custom<typeof alerts.$inferSelect>()),
      },
    },
    markRead: {
      method: 'PATCH' as const,
      path: '/api/alerts/:id/read',
      responses: {
        200: z.custom<typeof alerts.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  simulation: {
    status: {
      method: 'GET' as const,
      path: '/api/simulation',
      responses: {
        200: z.object({
          isRunning: z.boolean(),
          scenario: z.enum(["NORMAL", "LEAKAGE_FAULT", "OVERLOAD", "OVERHEATING"]),
        }),
      },
    },
    toggle: {
      method: 'POST' as const,
      path: '/api/simulation',
      input: z.object({
        isRunning: z.boolean(),
        scenario: z.enum(["NORMAL", "LEAKAGE_FAULT", "OVERLOAD", "OVERHEATING"]).optional(),
      }),
      responses: {
        200: z.object({
            message: z.string()
        }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

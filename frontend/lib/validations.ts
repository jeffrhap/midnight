import { z } from 'zod';

// Enhanced email regex with length validation
// RFC 5321: Email local part max 64 chars, domain max 255 chars, total max 320 chars
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const subscribeSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .max(320, 'Email address is too long')
    .trim()
    .toLowerCase()
    .refine((val) => emailRegex.test(val), {
      message: 'Please enter a valid email address',
    })
    .refine((val) => !val.includes('..'), {
      message: 'Email address contains invalid characters',
    })
    .refine((val) => !val.startsWith('.') && !val.endsWith('.'), {
      message: 'Email address cannot start or end with a dot',
    }),
});

export type SubscribeInput = z.infer<typeof subscribeSchema>;


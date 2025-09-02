import { z } from 'zod'

// Instagram Reel URL validation schema
export const transcribeSchema = z.object({
  reelUrl: z
    .string()
    .url('Please enter a valid URL')
    .regex(
      /instagram\.com\/reel/,
      'Please enter a valid Instagram Reel URL'
    ),
  email: z
    .string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required')
})

export type TranscribeFormData = z.infer<typeof transcribeSchema>

// Rate limit response schema
export const rateLimitSchema = z.object({
  remainingRequests: z.number(),
  resetTime: z.number().optional(),
  isExceeded: z.boolean()
})

export type RateLimitData = z.infer<typeof rateLimitSchema>
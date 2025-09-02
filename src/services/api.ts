import axios from 'axios'
import { TranscribeFormData, transcribeSchema, rateLimitSchema } from '../lib/validators'

// Create axios instance with default headers
const api = axios.create({
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_N8N_AUTH_TOKEN}`,
    'Content-Type': 'application/json',
  }
})

// API response types
export interface TranscriptionResponse {
  success: boolean
  message: string
  requestId?: string
}

export interface RateLimitResponse {
  remainingRequests: number
  resetTime?: number
  isExceeded: boolean
}

// Transcription request
export const transcribeReel = async (data: TranscribeFormData): Promise<TranscriptionResponse> => {
  // Validate data before sending
  const validated = transcribeSchema.parse(data)
  
  const response = await api.post<TranscriptionResponse>(
    import.meta.env.VITE_N8N_WEBHOOK_URL,
    validated
  )
  
  return response.data
}

// Check rate limit
export const checkRateLimit = async (identifier: string): Promise<RateLimitResponse> => {
  const response = await api.get<RateLimitResponse>(
    `${import.meta.env.VITE_N8N_RATE_LIMIT_URL}?id=${identifier}`
  )
  
  // Validate response
  const validated = rateLimitSchema.parse(response.data)
  return validated
}

// Error handler for API responses
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 429) {
      return 'Rate limit exceeded. Please wait before trying again.'
    }
    if (error.response?.status === 400) {
      return 'Invalid request. Please check your Instagram Reel URL.'
    }
    if (error.response?.status >= 500) {
      return 'Server error. Please try again later.'
    }
    return error.response?.data?.message || 'Network error occurred'
  }
  
  return 'An unexpected error occurred. Please try again.'
}
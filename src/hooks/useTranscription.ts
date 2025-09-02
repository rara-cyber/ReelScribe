import { useMutation, useQuery } from '@tanstack/react-query'
import { transcribeReel, checkRateLimit, handleApiError } from '../services/api'
import type { TranscribeFormData } from '../lib/validators'
import { toast } from 'sonner'

// Hook for transcribing reels
export const useTranscribeReel = () => {
  return useMutation({
    mutationFn: transcribeReel,
    onSuccess: (data) => {
      if (data.success) {
        toast.success('Transcription request sent! Check your email soon.')
      } else {
        toast.error(data.message || 'Failed to process transcription')
      }
    },
    onError: (error) => {
      const errorMessage = handleApiError(error)
      toast.error(errorMessage)
    }
  })
}

// Hook for checking rate limits
export const useRateLimit = (userId: string, enabled = true) => {
  return useQuery({
    queryKey: ['rateLimit', userId],
    queryFn: () => checkRateLimit(userId),
    refetchInterval: 60000, // Refresh every minute
    enabled: enabled && !!userId,
    retry: false,
    staleTime: 30000, // Consider data stale after 30 seconds
    onError: (error) => {
      console.error('Rate limit check failed:', error)
    }
  })
}

// Hook to get user identifier (IP-based for now)
export const useUserIdentifier = () => {
  // Simple fallback - in production you might use a proper UUID or IP detection
  const getUserId = () => {
    let userId = localStorage.getItem('reelscribe-user-id')
    if (!userId) {
      userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('reelscribe-user-id', userId)
    }
    return userId
  }

  return getUserId()
}
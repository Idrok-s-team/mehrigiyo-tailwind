import { baseUrl } from '@/constants'
import { getCookie } from '@/utils'
import { ApiError } from './error'

// Utility function to perform API requests
export const authorizedApiFetch = async <T, R = T>(
  path: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET',
  bodyParams?: T,
): Promise<R> => {
  const url = `${baseUrl}${path}`
  const token = getCookie('access_token')

  if (!token) {
    throw new Error('No access token available.')
  }

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  }

  const response = await fetch(url, {
    method: method,
    headers: headers,
    body: bodyParams ? JSON.stringify(bodyParams) : null,
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new ApiError(`Request failed: ${errorData.detail}`, { ...errorData, statusCode: response.status })
  }

  return response.json()
}

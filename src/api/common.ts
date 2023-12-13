import { baseUrl } from '@/constants'
import { getCookie, queryStringUrl } from '@/utils'
import { ApiError } from './error'
import { QueryParamsType } from '@/types'

export const fetchApi = async <T>(path: string, params?: QueryParamsType): Promise<T> => {
  const url = queryStringUrl(`${baseUrl}${path}`, params)
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

// Authorized fetch API
export const authorizedFetchApi = async <T, R = T>(
  path: string,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET',
  bodyParams?: T,
  withAuth: boolean = true,
): Promise<R> => {
  const url = `${baseUrl}${path}`
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (withAuth) {
    const token = getCookie('access_token')
    if (!token) throw new Error('No access token available.')
    headers['Authorization'] = `Bearer ${token}`
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

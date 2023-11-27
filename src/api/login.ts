import { baseUrl } from '@/constants'
import { IApiErrorData, ILoginParams, ILoginResponse } from '@/types'
import { ApiError } from './error'

export const loginPostApi = async (params: ILoginParams): Promise<ILoginResponse> => {
  const url = `${baseUrl}/login/`
  const response = await fetch(url, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })
  const statusCode = response.status

  if (!response.ok) {
    const errorData = await response.json()
    throw new ApiError(`Login failed: ${errorData.detail}`, { ...errorData, statusCode })
  }

  return response.json()
}

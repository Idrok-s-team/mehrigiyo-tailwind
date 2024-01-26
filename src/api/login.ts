import { ILoginParams, ILoginResponse } from '@/types'
import { fetchApi } from './common'

export const loginApi = async (body: ILoginParams): Promise<ILoginResponse> => {
  return fetchApi('/login/', 'POST', { body })
}

export const refreshTokenApi = async (body: Pick<ILoginResponse, 'refresh'>): Promise<ILoginResponse> => {
  return fetchApi('/refresh/', 'POST', { body })
}

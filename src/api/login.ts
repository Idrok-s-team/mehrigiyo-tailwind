import { ILoginParams, ILoginResponse } from '@/types'
import { authorizedFetchApi } from './common'

export const loginApi = async (body: ILoginParams): Promise<ILoginResponse> => {
  return authorizedFetchApi('/login/', 'POST', { body, withAuth: false })
}

export const refreshTokenApi = async (body: Pick<ILoginResponse, 'refresh'>): Promise<ILoginResponse> => {
  return authorizedFetchApi('/refresh/', 'POST', { body, withAuth: false })
}

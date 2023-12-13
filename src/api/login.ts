import { ILoginParams, ILoginResponse } from '@/types'
import { authorizedFetchApi } from './common'

export const loginApi = async (params: ILoginParams): Promise<ILoginResponse> => {
  return authorizedFetchApi('/login/', 'POST', params, false)
}

export const refreshTokenApi = async (params: Pick<ILoginResponse, 'refresh'>): Promise<ILoginResponse> => {
  return authorizedFetchApi('/refresh/', 'POST', params, false)
}

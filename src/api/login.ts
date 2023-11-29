import { ILoginParams, ILoginResponse } from '@/types'
import { authorizedApiFetch } from './common'

export const loginApi = async (params: ILoginParams): Promise<ILoginResponse> => {
  return authorizedApiFetch('/login/', 'POST', params, false)
}

export const refreshTokenApi = async (params: Pick<ILoginResponse, 'refresh'>): Promise<ILoginResponse> => {
  return authorizedApiFetch('/refresh/', 'POST', params, false)
}

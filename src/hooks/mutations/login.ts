import { loginApi, refreshTokenApi } from '@/api/login'
import { ILoginParams, ILoginResponse } from '@/types'
import { useCustomMutation } from './common'

export const useLoginMutation = () => useCustomMutation<ILoginParams, ILoginResponse>(loginApi)

export const useRefreshTokenMutation = () =>
  useCustomMutation<Pick<ILoginResponse, 'refresh'>, ILoginResponse>(refreshTokenApi)

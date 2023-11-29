import { useMutation } from '@tanstack/react-query'
import { loginApi, refreshTokenApi } from '@/api/login'
import { IApiErrorData, ILoginParams, ILoginResponse } from '@/types'

export const useLoginMutation = () => {
  const mutation = useMutation<ILoginResponse, IApiErrorData, ILoginParams>({
    mutationFn: (params: ILoginParams) => {
      return loginApi(params)
    },
  })
  return mutation
}

export const useRefreshTokenMutation = () => {
  const mutation = useMutation<ILoginResponse, IApiErrorData, Pick<ILoginResponse, 'refresh'>>({
    mutationFn: (params: Pick<ILoginResponse, 'refresh'>) => {
      return refreshTokenApi(params)
    },
  })
  return mutation
}

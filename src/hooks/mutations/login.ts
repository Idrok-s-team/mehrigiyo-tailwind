import { useMutation } from '@tanstack/react-query'
import { loginPostApi } from '@/api/login'
import { IApiErrorData, ILoginParams, ILoginResponse } from '@/types'

export const useLoginMutation = () => {
  const mutation = useMutation<ILoginResponse, IApiErrorData, ILoginParams>({
    mutationFn: (params: ILoginParams) => {
      return loginPostApi(params)
    },
  })
  return mutation
}

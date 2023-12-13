import { useMutation, UseMutationOptions } from '@tanstack/react-query'
import { IApiErrorData } from '@/types'

export type MutationProps<TVariables, TResult> = {
  options?: UseMutationOptions<TResult, IApiErrorData, TVariables>
}

export function useCustomMutation<TVariables, TResult>(
  mutationFn: (variables: TVariables) => Promise<TResult>,
  props?: MutationProps<TVariables, TResult>,
) {
  const { options = {} } = props ?? {}
  return useMutation<TResult, IApiErrorData, TVariables>({ ...options, mutationFn })
}

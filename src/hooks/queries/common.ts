import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { QueryParamsType } from '@/types'

export type QueryProps<T> = {
  params?: QueryParamsType
  options?: Omit<UseQueryOptions<T>, 'queryKey'>
}

export function useGetQuery<T>(key: string, queryFn: (params?: QueryParamsType) => Promise<T>, props?: QueryProps<T>) {
  const { params, options = {} } = props ?? {}
  return useQuery<T>({
    queryKey: [key, params],
    queryFn: () => queryFn(params),
    ...options,
  })
}

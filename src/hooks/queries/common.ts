import { useQuery, UseQueryOptions } from '@tanstack/react-query'
import { IErrorResponse, QueryParamsType } from '@/types'

export type QueryProps<T> = {
  params?: QueryParamsType
  options?: UseQueryOptions<T>
}

export function useGetQuery<T>(key: string, queryFn: (params?: QueryParamsType) => Promise<T>, props?: QueryProps<T>) {
  const { params, options = {} } = props ?? {}
  return useQuery<T, IErrorResponse>({
    queryKey: [key, params],
    queryFn: () => queryFn(params),
    ...options,
  })
}

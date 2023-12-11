import { GetResponseWithStatusType, ICard } from '@/types'
import { getCardApi } from '@/api'
import { QueryProps, useGetQuery } from './common'

export const useGetCardQuery = (props?: QueryProps<GetResponseWithStatusType<ICard[]>>) =>
  useGetQuery('card', getCardApi, props)

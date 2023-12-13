import { getCardApi } from '@/api'
import { useGetQuery } from './common'
import { GetResponseWithStatusType, ICard } from '@/types'

export const useGetCardQuery = () => useGetQuery<GetResponseWithStatusType<ICard[]>>('card', getCardApi)

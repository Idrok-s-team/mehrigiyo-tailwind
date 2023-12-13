import { getCardApi } from '@/api'
import { useGetQuery } from './common'

export const useGetCardQuery = () => useGetQuery('card', getCardApi)

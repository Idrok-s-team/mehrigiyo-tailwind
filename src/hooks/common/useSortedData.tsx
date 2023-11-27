import { useMemo } from 'react'
import { IShopMedicines, SortCriteriaType } from '@/types'

function useSortedData<T extends IShopMedicines>(data: T[] | undefined, sortCriteria: SortCriteriaType) {
  return useMemo(() => {
    if (!data || data.length === 0) {
      return []
    }

    let sorted = [...data]

    switch (sortCriteria) {
      case 'price_high_to_low':
        return sorted.sort((a, b) => b.discount - a.discount)
      case 'price_low_to_high':
        return sorted.sort((a, b) => a.discount - b.discount)
      case 'newest':
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      default:
        return sorted
    }
  }, [data, sortCriteria])
}

export default useSortedData

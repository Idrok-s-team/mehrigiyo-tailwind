import { useMemo } from 'react'
import { IDoctor, IShopMedicines, SortCriteriaType } from '@/types'

function useSortedData<T extends IShopMedicines | IDoctor>(data: T[] | undefined, sortCriteria: SortCriteriaType) {
  return useMemo(() => {
    if (!data || data.length === 0) {
      return []
    }

    let sorted = [...data]

    switch (sortCriteria) {
      case 'price_high_to_low':
        return sorted.sort((a: any, b: any) => b.discount - a.discount)
      case 'price_low_to_high':
        return sorted.sort((a: any, b: any) => a.discount - b.discount)
      case 'newest':
        return sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
      case 'top':
        return sorted.sort((a, b) => Number(b.rate) - Number(a.rate))
      default:
        return sorted
    }
  }, [data, sortCriteria])
}

export default useSortedData

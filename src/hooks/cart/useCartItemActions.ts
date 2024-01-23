import { useCallback, useState } from 'react'
import { useShopCartQuery } from '@/hooks/queries'
import { useDeleteShopCartMutation, useUpdateShopCartMutation } from '@/hooks/mutations'
import { useAuthStore } from '@/store'

const useCartItemActions = (id: number, initialAmount: number = 1) => {
  const [countValue, setCountValue] = useState<number>(initialAmount)
  const { isUserRegistered } = useAuthStore()

  const { refetch } = useShopCartQuery({ options: { enabled: isUserRegistered } })
  const { mutateAsync: updateShopCartAsync } = useUpdateShopCartMutation()
  const { mutateAsync: deleteShopCartAsync } = useDeleteShopCartMutation()

  const updateCart = useCallback(async (newAmount: number) => {
    await updateShopCartAsync({ id, amount: newAmount })
    await refetch()
  }, [id, refetch, updateShopCartAsync])

  const decreaseCount = useCallback(async () => {
    const newCount = countValue > 1 ? countValue - 1 : countValue
    setCountValue(newCount)
    await updateCart(newCount)
  }, [countValue, updateCart])

  const increaseCount = useCallback(async () => {
    const newCount = countValue + 1
    setCountValue(newCount)
    await updateCart(newCount)
  }, [countValue, updateCart])

  const handleDelete = useCallback(async () => {
    await deleteShopCartAsync({ id })
    await refetch()
  }, [deleteShopCartAsync, id, refetch])

  return {
    countValue,
    decreaseCount,
    increaseCount,
    handleDelete,
  }
}

export default useCartItemActions

import { useState } from 'react'
import { useShopCartQuery } from '@/hooks/queries'
import { useDeleteShopCartMutation, useUpdateShopCartMutation } from '@/hooks/mutations'

const useCartItemActions = (id: number, initialAmount: number) => {
  const [countValue, setCountValue] = useState<number>(initialAmount)
  const { refetch } = useShopCartQuery()
  const { mutateAsync: updateShopCartAsync } = useUpdateShopCartMutation()
  const { mutateAsync: deleteShopCartAsync } = useDeleteShopCartMutation()

  const updateCart = async (newAmount: number) => {
    await updateShopCartAsync({ id, amount: newAmount })
    await refetch()
  }

  const handleDecreaseCount = async () => {
    const newCount = countValue > 1 ? countValue - 1 : countValue
    setCountValue(newCount)
    await updateCart(newCount)
  }

  const handleIncreaseCount = async () => {
    const newCount = countValue + 1
    setCountValue(newCount)
    await updateCart(newCount)
  }

  const handleDelete = async () => {
    await deleteShopCartAsync({ id })
    await refetch()
  }

  return {
    countValue,
    handleDecreaseCount,
    handleIncreaseCount,
    handleDelete,
  }
}

export default useCartItemActions

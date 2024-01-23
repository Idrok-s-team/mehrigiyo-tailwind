import { useAuthStore } from '@/store'
import { useAddUserFavoriteMedicinesMutation, useDeleteUserFavoriteMedicinesMutation } from '../mutations/user'
import { useUserFavoriteMedicinesQuery } from '../queries'

const useChangeFavoriteProducts = (productId: number) => {
  const { isUserRegistered } = useAuthStore()
  const { data, refetch } = useUserFavoriteMedicinesQuery({ options: { enabled: isUserRegistered } })
  const isProductInFavorite = data?.results.some((item) => item.id === productId)

  const { mutateAsync: addFavoriteAsync } = useAddUserFavoriteMedicinesMutation()
  const { mutateAsync: deleteFavoriteAsync } = useDeleteUserFavoriteMedicinesMutation()

  const onChangeFavorite = async () => {
    try {
      if (isProductInFavorite) {
        await deleteFavoriteAsync({ pk: productId })
      } else {
        await addFavoriteAsync({ pk: productId }).catch((err) => console.log(err))
      }
      await refetch()
    } catch (error) { }
  }

  return { isProductInFavorite, onChangeFavorite }
}

export default useChangeFavoriteProducts

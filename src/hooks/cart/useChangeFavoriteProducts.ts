import { useAddUserFavoriteMedicinesMutation, useDeleteUserFavoriteMedicinesMutation } from '../mutations/user'
import { useUserFavoriteMedicinesQuery } from '../queries'

const useChangeFavoriteProducts = (productId: number) => {
  const { data, refetch } = useUserFavoriteMedicinesQuery()
  const isProductInFavorite = data?.results.some((item) => item.id === productId)

  const { mutateAsync: addFavoriteAsync } = useAddUserFavoriteMedicinesMutation()
  const { mutateAsync: deleteFavoriteAsync } = useDeleteUserFavoriteMedicinesMutation()

  const onChangeFavorite = async () => {
    try {
      if (isProductInFavorite) {
        await deleteFavoriteAsync({ pk: productId })
      } else {
        await addFavoriteAsync({ pk: productId })
      }
      await refetch()
    } catch (error) {}
  }

  return { isProductInFavorite, onChangeFavorite }
}

export default useChangeFavoriteProducts

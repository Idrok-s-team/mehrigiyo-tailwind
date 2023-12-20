import { useAddUserFavoriteMedicineMutation, useDeleteUserFavoriteMedicineMutation } from '../mutations/user'
import { useUserFavoriteMedicinesQuery } from '../queries'

const useChangeFavorite = (productId: number) => {
  const { data, refetch } = useUserFavoriteMedicinesQuery()
  const isProductInFavorite = data?.results.some((item) => item.id === productId)

  const { mutateAsync: addFavoriteAsync } = useAddUserFavoriteMedicineMutation()
  const { mutateAsync: deleteFavoriteAsync } = useDeleteUserFavoriteMedicineMutation()

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

export default useChangeFavorite

import { useAuthStore } from '@/store'
import toast from 'react-hot-toast'
import { useAddUserFavoriteMedicinesMutation, useDeleteUserFavoriteMedicinesMutation } from '../mutations/user'
import { useUserFavoriteMedicinesQuery } from '../queries'
import { WARNING_TEXTS } from '@/constants'

const useChangeFavoriteProducts = (productId: number) => {
  const { isUserRegistered } = useAuthStore()
  const { data, refetch } = useUserFavoriteMedicinesQuery({ options: { enabled: isUserRegistered } })
  const isProductInFavorite = data?.results.some((item) => item.id === productId)

  const { mutateAsync: addFavoriteAsync } = useAddUserFavoriteMedicinesMutation()
  const { mutateAsync: deleteFavoriteAsync } = useDeleteUserFavoriteMedicinesMutation()

  const onChangeFavorite = async () => {
    try {
      if (isUserRegistered) {
        if (isProductInFavorite) {
          await deleteFavoriteAsync({ pk: productId })
        } else {
          await addFavoriteAsync({ pk: productId }).catch((err) => console.log(err))
        }
        await refetch()
      } else {
        toast.error(WARNING_TEXTS.PLEASE_REGISTER_FIRST)
      }
    } catch (error) { }
  }

  return { isProductInFavorite, onChangeFavorite }
}

export default useChangeFavoriteProducts

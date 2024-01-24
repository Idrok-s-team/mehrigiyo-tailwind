import { useAuthStore } from '@/store'
import toast from 'react-hot-toast'
import { useAddUserFavoriteDoctorsMutation, useDeleteUserFavoriteDoctorsMutation } from '../mutations/user'
import { useUserFavoriteDoctorsQuery } from '../queries'
import { WARNING_TEXTS } from '@/constants'

const useChangeFavoriteDoctors = (doctorId: number) => {
  const { isUserRegistered } = useAuthStore()
  const { data, refetch } = useUserFavoriteDoctorsQuery({ options: { enabled: isUserRegistered } })
  const isDoctorInFavorite = data?.results.some((doctor) => doctor.id === doctorId)

  const { mutateAsync: addFavoriteAsync } = useAddUserFavoriteDoctorsMutation()
  const { mutateAsync: deleteFavoriteAsync } = useDeleteUserFavoriteDoctorsMutation()

  const onChangeFavorite = async () => {
    try {
      if (isUserRegistered) {
        if (isDoctorInFavorite) {
          await deleteFavoriteAsync({ pk: doctorId })
        } else {
          await addFavoriteAsync({ pk: doctorId })
        }
        await refetch()
      } else {
        toast.error(WARNING_TEXTS.PLEASE_REGISTER_FIRST)
      }
    } catch (error) { }
  }

  return { isDoctorInFavorite, onChangeFavorite }
}

export default useChangeFavoriteDoctors

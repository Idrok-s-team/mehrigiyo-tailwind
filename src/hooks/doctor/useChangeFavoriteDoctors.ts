import { useAuthStore } from '@/store'
import { useAddUserFavoriteDoctorsMutation, useDeleteUserFavoriteDoctorsMutation } from '../mutations/user'
import { useUserFavoriteDoctorsQuery } from '../queries'

const useChangeFavoriteDoctors = (doctorId: number) => {
  const { isUserRegistered } = useAuthStore()
  const { data, refetch } = useUserFavoriteDoctorsQuery({ options: { enabled: isUserRegistered } })
  const isDoctorInFavorite = data?.results.some((doctor) => doctor.id === doctorId)

  const { mutateAsync: addFavoriteAsync } = useAddUserFavoriteDoctorsMutation()
  const { mutateAsync: deleteFavoriteAsync } = useDeleteUserFavoriteDoctorsMutation()

  const onChangeFavorite = async () => {
    try {
      if (isDoctorInFavorite) {
        await deleteFavoriteAsync({ pk: doctorId })
      } else {
        await addFavoriteAsync({ pk: doctorId })
      }
      await refetch()
    } catch (error) { }
  }

  return { isDoctorInFavorite, onChangeFavorite }
}

export default useChangeFavoriteDoctors

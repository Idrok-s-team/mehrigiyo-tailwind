import toast from 'react-hot-toast'
import { useShopCartQuery } from '../queries'
import { useAddShopCartMutation } from '../mutations/shop'
import { ApiErrorDetail } from '@/types'
import { useAuthStore } from '@/store'

const useAddToCart = (productId: number, amount: number = 1) => {
  const { isUserRegistered } = useAuthStore()
  const { data, refetch } = useShopCartQuery({ options: { enabled: isUserRegistered } })
  const { mutateAsync } = useAddShopCartMutation()

  const isProductInCart = data?.data.some((item) => item.product.id === productId)

  const addToBasket = () => {
    if (isProductInCart) {
      toast.error(`Ushbu mahsulot allaqachon savatga qo'shilgan`)
    } else {
      const cartAddPromise = mutateAsync({
        product: productId,
        amount,
      })

      toast
        .promise(cartAddPromise, {
          loading: `savatga qo'shilmoqda`,
          success: `muvaffaqqiyatli qo'shildi`,
          error: (err: ApiErrorDetail) =>
            err.statusCode === 401 ? `Iltimos avval ro'yxatdan o'ting` : JSON.stringify(err.detail),
        })
        .then(() => refetch())
    }
  }

  return { isProductInCart, addToBasket }
}

export default useAddToCart

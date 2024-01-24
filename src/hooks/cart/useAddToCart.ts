import toast from 'react-hot-toast'
import { useShopCartQuery } from '../queries'
import { useAddShopCartMutation } from '../mutations/shop'
import { ApiErrorDetail } from '@/types'
import { useAuthStore } from '@/store'
import { WARNING_TEXTS } from '@/constants'

const useAddToCart = (productId: number, amount: number = 1) => {
  const { isUserRegistered } = useAuthStore()
  const { data, refetch } = useShopCartQuery({ options: { enabled: isUserRegistered } })
  const { mutateAsync } = useAddShopCartMutation()

  const isProductInCart = data?.data.some((item) => item.product.id === productId)

  const addToBasket = () => {
    if (isUserRegistered) {
      if (isProductInCart) {
        toast.error(WARNING_TEXTS.PRODUCT_ALREADY_IN_CART)
      } else {
        const cartAddPromise = mutateAsync({
          product: productId,
          amount,
        })

        toast
          .promise(cartAddPromise, {
            loading: `savatga qo'shilmoqda`,
            success: `muvaffaqqiyatli qo'shildi`,
            error: (err: ApiErrorDetail) => JSON.stringify(err.detail),
          })
          .then(() => refetch())
      }
    } else {
      toast.error(WARNING_TEXTS.PLEASE_REGISTER_FIRST)
    }
  }

  return { isProductInCart, addToBasket }
}

export default useAddToCart

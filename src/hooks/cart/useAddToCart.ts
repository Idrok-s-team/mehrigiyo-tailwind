import toast from 'react-hot-toast'
import { useShopCartQuery } from '../queries'
import { useAddShopCartMutation } from '../mutations/shop'

const useAddToCart = (productId: number, amount: number = 1) => {
  const { data, refetch } = useShopCartQuery()
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
          error: ({ data }) => data.detail,
        })
        .then(() => refetch())
    }
  }

  return { isProductInCart, addToBasket }
}

export default useAddToCart

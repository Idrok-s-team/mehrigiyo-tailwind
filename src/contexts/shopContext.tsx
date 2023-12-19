import { Dispatch, ReactNode, SetStateAction, createContext, useMemo, useState } from 'react'
import { ICard, IShopCheckout, IUserDeliverAddress } from '@/types'

interface IProps {
  children: ReactNode
}

interface IShopContext {
  selectedOrder: IShopCheckout | null
  setSelectedOrder: Dispatch<SetStateAction<IShopCheckout | null>>
  selectedAddress: IUserDeliverAddress | null
  setSelectedAddress: Dispatch<SetStateAction<IUserDeliverAddress | null>>
  selectedPaymentCard: ICard | null
  setSelectedPaymentCard: Dispatch<SetStateAction<ICard | null>>
}

const ShopContext = createContext<IShopContext>()

export const ShopContextProvider = ({ children }: IProps) => {
  const [selectedOrder, setSelectedOrder] = useState<IShopCheckout | null>(null)
  const [selectedAddress, setSelectedAddress] = useState<IUserDeliverAddress | null>(null)
  const [selectedPaymentCard, setSelectedPaymentCard] = useState<ICard | null>(null)

  const value = useMemo(
    () => ({
      selectedOrder,
      setSelectedOrder,
      selectedAddress,
      setSelectedAddress,
      selectedPaymentCard,
      setSelectedPaymentCard,
    }),
    [selectedAddress, selectedOrder, selectedPaymentCard],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

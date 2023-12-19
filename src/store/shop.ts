import { create } from 'zustand'
import { ICard, IShopCheckout, IUserDeliverAddress, Nullable } from '@/types'

interface IShopStore {
  selectedAddress: IUserDeliverAddress
  setSelectedAddress: (selectedAddress: IUserDeliverAddress) => void
  selectedOrder: IShopCheckout
  setSelectedOrder: (selectedOrder: IShopCheckout) => void
  selectedPaymentCard: ICard
  setSelectedPaymentCard: (selectedPaymentCard: ICard) => void
}

const useShopStore = create<Nullable<IShopStore>>((set) => ({
  selectedAddress: null,
  setSelectedAddress: (selectedAddress) => set({ selectedAddress }),
  selectedOrder: null,
  setSelectedOrder: (selectedOrder) => set({ selectedOrder }),
  selectedPaymentCard: null,
  setSelectedPaymentCard: (selectedPaymentCard) => set({ selectedPaymentCard }),
}))

export default useShopStore

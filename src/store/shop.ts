import { create } from 'zustand'
import { ICard, IShopCheckout, IUserDeliverAddress, Nullable } from '@/types'

interface IShopStore {
  selectedAddress: IUserDeliverAddress | null
  setSelectedAddress: (selectedAddress: IUserDeliverAddress | null) => void
  selectedOrder: IShopCheckout | null
  setSelectedOrder: (selectedOrder: IShopCheckout | null) => void
  selectedPaymentCard: ICard | null
  setSelectedPaymentCard: (selectedPaymentCard: ICard | null) => void
  isOpenModal: boolean
  setIsOpenModal: (isOpenModal: boolean) => void
}

const useShopStore = create<IShopStore>((set) => ({
  selectedAddress: null,
  setSelectedAddress: (selectedAddress) => set({ selectedAddress }),
  selectedOrder: null,
  setSelectedOrder: (selectedOrder) => set({ selectedOrder }),
  selectedPaymentCard: null,
  setSelectedPaymentCard: (selectedPaymentCard) => set({ selectedPaymentCard }),
  isOpenModal: false,
  setIsOpenModal: (isOpenModal) => set({ isOpenModal }),
}))

export default useShopStore

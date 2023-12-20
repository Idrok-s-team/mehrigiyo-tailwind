import { create } from 'zustand'
import { ICard, IShopCheckout, IUserDeliverAddress } from '@/types'

interface IShopStore {
  selectedAddress: IUserDeliverAddress | null
  selectedOrder: IShopCheckout | null
  selectedPaymentCard: ICard | null
  updateShopState: <K extends keyof Omit<IShopStore, 'updateShopState'>>(key: K, value: IShopStore[K]) => void
}

const useShopStore = create<IShopStore>((set) => ({
  selectedAddress: null,
  selectedOrder: null,
  selectedPaymentCard: null,
  updateShopState: (key, value) => set({ [key]: value }),
}))

export default useShopStore

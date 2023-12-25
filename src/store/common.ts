import { create } from 'zustand'

type ModalType = 'auth' | 'address' | 'order' | 'cart' | 'addressConfirm' | 'orderConfirm' | 'cartConfirm' | 'drawer'

interface ICommonStore {
  activeModal: ModalType | null
  setActiveModal: (modalType: ModalType | null) => void
}

const useShopStore = create<ICommonStore>((set) => ({
  activeModal: null,
  setActiveModal: (modalType) => set({ activeModal: modalType }),
}))

export default useShopStore

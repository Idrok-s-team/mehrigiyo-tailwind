import { create } from 'zustand'

interface IAuthStore {
  selectedAuthImage: File | null
  isUserRegistered: boolean
  updateAuthState: <K extends keyof Omit<IAuthStore, 'updateAuthState'>>(key: K, value: IAuthStore[K]) => void
}

const useAuthStore = create<IAuthStore>((set) => ({
  selectedAuthImage: null,
  isUserRegistered: false,
  updateAuthState: (key, value) => set({ [key]: value }),
}))

export default useAuthStore

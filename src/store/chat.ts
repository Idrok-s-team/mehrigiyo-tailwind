import { IChatMessage } from '@/types'
import { create } from 'zustand'

interface IChatStore {
  messages?: IChatMessage[] | null
  updateChatState: <K extends keyof Omit<IChatStore, 'updateChatState'>>(key: K, value: IChatStore[K]) => void
}

const useChatStore = create<IChatStore>((set) => ({
  messages: null,
  updateChatState: (key, value) => set({ [key]: value }),
}))

export default useChatStore

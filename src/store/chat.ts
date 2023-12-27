import { IChatMessage, IChatRoom } from '@/types'
import { create } from 'zustand'

interface IChatStore {
  chatMessages: IChatMessage[]
  selectedChatRoom: IChatRoom | null
  selectedChatFile: File | null
  updateChatState: <K extends keyof Omit<IChatStore, 'updateChatState'>>(key: K, value: IChatStore[K]) => void
  setChatMessages: (newMessages: IChatMessage[] | ((prevMessages: IChatMessage[]) => IChatMessage[])) => void
}

const useChatStore = create<IChatStore>((set) => ({
  chatMessages: [],
  selectedChatRoom: null,
  selectedChatFile: null,
  updateChatState: (key, value) => set({ [key]: value }),
  setChatMessages: (newMessages) =>
    set((state) => ({
      chatMessages: typeof newMessages === 'function' ? newMessages(state.chatMessages) : newMessages,
    })),
}))

export default useChatStore

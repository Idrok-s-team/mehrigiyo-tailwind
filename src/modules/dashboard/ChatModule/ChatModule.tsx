'use client'

import { FC } from 'react'
import { ChatFooter, ChatHeader, ChatMessage } from './components'
import { useChatStore } from '@/store'
import { useUserMeQuery } from '@/hooks/queries'

const ChatModule: FC = () => {
  const { messages } = useChatStore()
  const { data: userMeData } = useUserMeQuery()

  return (
    <div className="w-full flex flex-col justify-between h-[75vh] rounded-2xl overflow-hidden shadow-card-secondary">
      <ChatHeader />
      <main className="flex-1 bg-white px-6 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
        {messages?.map((message) => <ChatMessage key={message.id} message={message} currentUser={userMeData} />)}
      </main>
      <ChatFooter />
    </div>
  )
}

export default ChatModule

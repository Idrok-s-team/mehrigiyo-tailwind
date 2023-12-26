'use client'

import { FC } from 'react'
import { ChatFooter, ChatHeader } from './components'

const ChatModule: FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between min-h-[75vh] rounded-2xl overflow-hidden shadow-card-secondary">
      <ChatHeader />
      <main className="flex-1 bg-white"></main>
      <ChatFooter />
    </div>
  )
}

export default ChatModule

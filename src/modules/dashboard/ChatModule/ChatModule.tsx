'use client'

import { FC, useEffect, useRef } from 'react'
import { ChatFooter, ChatHeader, ChatMessage } from './components'
import { useInfiniteChatMessagesQuery, useUserMeQuery } from '@/hooks/queries'
import { useChatStore } from '@/store'
import { useParams } from 'next/navigation'
import { Button } from '@/components/common'

const ChatModule: FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { chat_id } = useParams()
  const { data: userMeData } = useUserMeQuery()

  const { fetchNextPage, hasNextPage, data: messagesData } = useInfiniteChatMessagesQuery(Number(chat_id), {})

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    const chatContainer = chatContainerRef.current
    const handleScroll = () => {
      // Yuqoriga scroll qilganda, `scrollTop` qiymati 0 ga yaqin bo'ladi
      if (chatContainer && chatContainer.scrollTop < 50 && hasNextPage) {
        fetchNextPage()
      }
    }

    chatContainer?.addEventListener('scroll', handleScroll)

    return () => {
      chatContainer?.removeEventListener('scroll', handleScroll)
    }
  }, [fetchNextPage, hasNextPage])

  return (
    <div className="-mt-12 w-full flex flex-col justify-between h-[83vh] rounded-2xl overflow-hidden shadow-card-secondary">
      <ChatHeader />
      <main ref={chatContainerRef} className="flex-1 bg-white px-6 overflow-y-auto">
        <Button onClick={() => fetchNextPage()}>Load more</Button>
        {messagesData?.pages?.map((message) => (
          <ChatMessage key={message.id} message={message} currentUser={userMeData} />
        ))}
      </main>
      <ChatFooter />
    </div>
  )
}

export default ChatModule

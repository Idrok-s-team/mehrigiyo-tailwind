'use client'

import { FC, useRef } from 'react'
import { ChatFooter, ChatHeader, ChatMessage } from './components'
import { useInfiniteChatMessagesQuery, useUserMeQuery } from '@/hooks/queries'
import { useParams } from 'next/navigation'
import { Button, Loader } from '@/components/common'

const ChatModule: FC = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const { chat_id } = useParams()
  const { data: userMeData } = useUserMeQuery()
  const { fetchNextPage, data: messagesData, isFetchingNextPage } = useInfiniteChatMessagesQuery(Number(chat_id), {})

  return (
    <div className="-mt-12 w-full flex flex-col justify-between h-[83vh] rounded-2xl overflow-hidden shadow-card-secondary">
      <ChatHeader />
      <main ref={chatContainerRef} className="flex-1 bg-white px-6 overflow-y-auto">
        {Number(messagesData?.pages.length) > 0 && (
          <div className="flex justify-center my-2">
            {isFetchingNextPage ? (
              <Loader />
            ) : (
              <div className="w-[150px]">
                <button
                  onClick={() => fetchNextPage()}
                  className="px-4 py-2 bg-gray-primary/20 rounded-md hover:shadow-card"
                >
                  Yana ko'proq...
                </button>
              </div>
            )}
          </div>
        )}
        {messagesData?.pages
          ?.flatMap((page) => page)
          .reverse()
          .map((message) => <ChatMessage key={message.id} message={message} currentUser={userMeData} />)}
      </main>
      <ChatFooter />
    </div>
  )
}

export default ChatModule

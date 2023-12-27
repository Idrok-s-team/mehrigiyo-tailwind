import React, { ChangeEventHandler, FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { PlusBlackIcon, VoiceChatIcon } from '@/assets/icons'
import { ActionButton } from '@/components'
import { ChatInput } from './'
import { useChatMessagesQuery, useInfiniteChatMessagesQuery } from '@/hooks/queries'
import { IChatMessage } from '@/types'
import { useChatWebSocket } from '../hooks'
import { useChatStore } from '@/store'

const ChatFooter = () => {
  const [text, setText] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { chat_id } = useParams()
  const { setChatMessages, updateChatState } = useChatStore()
  // const [params, setParams] = useState({ limit: 10, offset: 0 })
  const { data: messagesData, isSuccess } = useInfiniteChatMessagesQuery(Number(chat_id), {})

  const handleNewMessage = useCallback(
    (messageData: IChatMessage) => {
      setChatMessages((prevMessages) => [...prevMessages, messageData])
    },
    [setChatMessages],
  )

  const { sendWebSocketMessage } = useChatWebSocket({
    chat_id: Number(chat_id),
    onMessage: handleNewMessage,
  })

  useEffect(() => {
    if (messagesData) {
      // setChatMessages(messagesData.pages.sort((a: any, b: any) => a.id - b.id))
      // messagesData.pages.forEach((page) => {
      //   setChatMessages(page?.results?.sort((a, b) => a.id - b.id))
      // })
      // const newMessages = messagesData.results.flatMap((page) => page.results).sort((a, b) => a.id - b.id)
      // setChatMessages(newMessages)
    }
  }, [messagesData])

  const handleSubmit = (e: FormEvent<HTMLFormElement | HTMLInputElement>) => {
    e.preventDefault()
    const msg = {
      chat_id,
      message: { text },
    }
    sendWebSocketMessage(msg)
    setText('')
  }

  const handleFileSelect = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      updateChatState('selectedChatFile', file)
      console.log('Tanlangan fayl:', file)
    }
  }

  const handlePlusClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex items-center gap-6 w-full px-5 py-[13px] shadow-chat-footer">
      <section>
        <ActionButton isHoverable onClick={handlePlusClick}>
          <PlusBlackIcon />
        </ActionButton>
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
      </section>
      <section className="flex-1 h-[34px]">
        <ChatInput
          placeholder="Xabar yozing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSubmit={(e) => handleSubmit(e)}
        />
      </section>
      {/* <section>
        <ActionButton isHoverable>
          <VoiceChatIcon />
        </ActionButton>
      </section> */}
    </div>
  )
}

export default ChatFooter

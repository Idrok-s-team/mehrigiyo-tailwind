import React, { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { PlusBlackIcon } from '@/assets/icons'
import { ActionButton } from '@/components/common'
import { ChatInput } from './'
import { useInfiniteChatMessagesQuery } from '@/hooks/queries'
import { IChatMessage } from '@/types'
import { useChatWebSocket } from '../hooks'
import { useChatStore } from '@/store'

const ChatFooter = () => {
  const [text, setText] = useState('')
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { chat_id } = useParams()
  const { setChatMessages, updateChatState, selectedChatFile } = useChatStore()
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
      const newMessages = messagesData.pages.flatMap((page) => page).sort((a, b) => a.id - b.id)
      setChatMessages(newMessages)
    }
  }, [messagesData])

  const handleSubmit = (e: FormEvent<HTMLFormElement | HTMLInputElement>) => {
    e.preventDefault()

    if (text.length > 0) {
      const msg = {
        chat_id,
        message: { text, file: selectedChatFile },
      }
      sendWebSocketMessage(msg)
      setText('')
    }
  }
  const handleFileSelect = (e: any) => {
    const file = e.target.files[0]

    if (file) {
      updateChatState('selectedChatFile', file)
    }
  }

  const handlePlusClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="flex items-end gap-4 w-full px-5 py-[13px] bg-[#F1F4F7] shadow-chat-footer">
      <section>
        <ActionButton isHoverable onClick={handlePlusClick}>
          <PlusBlackIcon />
        </ActionButton>
        <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
      </section>
      <section className="flex-1">
        <ChatInput value={text} onChange={(e) => setText(e.target.value)} onSubmit={(e) => handleSubmit(e)} />
      </section>
    </div>
  )
}

export default ChatFooter

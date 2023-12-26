import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { PlusBlackIcon, VoiceChatIcon } from '@/assets/icons'
import { ActionButton } from '@/components'
import { ChatInput } from './'
import { baseSocketUrl } from '@/constants'
import Cookies from 'js-cookie'
import { useChatMessagesQuery, useUserMeQuery } from '@/hooks/queries'
import { useChatStore } from '@/store'
import { GetResponseWithStatusType, IChatMessage } from '@/types'

const ChatFooter = () => {
  const [text, setText] = useState('')
  const socketRef = useRef<WebSocket | null>(null)
  const { chat_id } = useParams()

  const { messages, updateChatState } = useChatStore()

  const { data: chatMessagesData, isSuccess } = useChatMessagesQuery({ chat_id: Number(chat_id) })
  const { data: userMeData } = useUserMeQuery()
  const currentUserId = userMeData?.id
  console.log(messages)

  useEffect(() => {
    if (isSuccess) {
      updateChatState('messages', chatMessagesData?.results)
    }

    const token = Cookies.get('access_token')
    if (!token) {
      console.error('Access token not found')
      return
    }

    const webSocketUrl = `${baseSocketUrl}/chat/37/?token=${token}`
    const socket = new WebSocket(webSocketUrl)

    socket.onopen = () => {
      console.log('WebSocket Connected')
      socketRef.current = socket
    }
    socket.onerror = (error: Event) => console.error('WebSocket Error:', error)
    socket.onclose = () => {
      console.log('WebSocket Disconnected')
    }

    socketRef.current = socket

    socketRef.current.onmessage = (event: any) => {
      const messageData = JSON.parse(event.data) as GetResponseWithStatusType<IChatMessage>
      if (messageData.status === 'success') {
        const currentMessages = messages || []
        const newMessages = [...currentMessages, messageData.data]
        updateChatState('messages', newMessages)
      }
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.close()
        console.log('WebSocket Connection Closed')
      }
    }
  }, [isSuccess, messages, updateChatState])

  const sendMessage = (e: FormEvent<HTMLFormElement | HTMLInputElement>) => {
    e.preventDefault()
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.error('WebSocket not connected')
      return
    }

    const msg = {
      chat_id,
      message: {
        text,
      },
    }

    socketRef.current.send(JSON.stringify(msg))
    setText('')
  }

  return (
    <div className="flex items-center gap-6 w-full px-5 py-[13px] shadow-chat-footer">
      <section>
        <ActionButton isHoverable>
          <PlusBlackIcon />
        </ActionButton>
      </section>
      <section className="flex-1 h-[34px]">
        <ChatInput
          placeholder="Xabar yozing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSubmit={(e) => sendMessage(e)}
        />
      </section>
      <section>
        <ActionButton isHoverable>
          <VoiceChatIcon />
        </ActionButton>
      </section>
    </div>
  )
}

export default ChatFooter

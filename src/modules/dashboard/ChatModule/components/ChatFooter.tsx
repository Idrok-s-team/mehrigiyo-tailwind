import React, { useEffect } from 'react'
import { PlusBlackIcon, VoiceChatIcon } from '@/assets/icons'
import { ActionButton } from '@/components'
import { ChatInput } from './'
import { baseSocketUrl } from '@/constants'
import Cookies from 'js-cookie'
import { useChatRoomsQuery } from '@/hooks/queries'

const ChatFooter = () => {
  const { data } = useChatRoomsQuery({})
  console.log(data)
  useEffect(() => {
    const token = Cookies.get('access_token')
    if (!token) {
      console.error('Access token not found')
      return
    }

    const webSocketUrl = `${baseSocketUrl}/chat/2/?token=${token}`
    const socket = new WebSocket(webSocketUrl)

    socket.onopen = () => console.log('WebSocket Connected')
    socket.onerror = (error) => console.error('WebSocket Error:', error)
    socket.onclose = () => console.log('WebSocket Disconnected')

    return () => {
      socket.close()
      console.log('WebSocket Connection Closed')
    }
  }, [])

  return (
    <div className="flex items-center gap-6 w-full px-5 py-[13px] shadow-chat-footer">
      <section>
        <ActionButton isHoverable>
          <PlusBlackIcon />
        </ActionButton>
      </section>
      <section className="flex-1 h-[34px]">
        <ChatInput placeholder="Xabar yozing..." />
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

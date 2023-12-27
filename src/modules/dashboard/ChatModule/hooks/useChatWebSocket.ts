import { useEffect, useRef, useCallback } from 'react'
import Cookies from 'js-cookie'
import { GetResponseWithStatusType, IChatMessage } from '@/types'
import { baseSocketUrl } from '@/constants'

interface Props {
  chat_id: number
  onMessage: (message: IChatMessage) => void
}

const useChatWebSocket = ({ chat_id, onMessage }: Props) => {
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const token = Cookies.get('access_token')
    if (!token) {
      console.error('Access token not found')
      return
    }

    const webSocketUrl = `${baseSocketUrl}/chat/${chat_id}/?token=${token}`
    const socket = new WebSocket(webSocketUrl)
    socket.onmessage = (event: MessageEvent) => {
      const messageData = JSON.parse(event.data) as GetResponseWithStatusType<IChatMessage>
      onMessage(messageData.data)
    }
    socketRef.current = socket

    return () => {
      socket.close()
    }
  }, [chat_id, onMessage])

  const sendWebSocketMessage = useCallback((message: Object) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(message))
    }
  }, [])

  return { sendWebSocketMessage }
}

export default useChatWebSocket

import React from 'react'
import { BackGreenIcon, CallIcon, VideoCallIcon } from '@/assets/icons'
import { ActionButton } from '@/components/common'
import { useParams, useRouter } from 'next/navigation'
import { useChatStore } from '@/store'

const ChatHeader = () => {
  const router = useRouter()
  const { chat_id } = useParams()
  const { selectedChatRoom } = useChatStore()

  const openCallStreamPage = () => {
    router.push(`/dashboard/consultation/chat/${chat_id}/call`)
    // window.open(`/dashboard/consultation/chat/${chat_id}/call`)
  }

  return (
    <div className="h-[70px] flex items-center justify-between px-6 border-b bg-white">
      <section className="flex items-center gap-5">
        <ActionButton isHoverable className="p-3" onClick={() => router.back()}>
          <BackGreenIcon />
        </ActionButton>
        <div>
          <h6>{selectedChatRoom?.doktor.name}</h6>
          <p className="text-green-primary text-sm">online</p>
        </div>
      </section>
      <section className="flex items-center gap-5">
        <ActionButton isHoverable onClick={openCallStreamPage}>
          <CallIcon />
        </ActionButton>
        <ActionButton isHoverable>
          <VideoCallIcon />
        </ActionButton>
      </section>
    </div>
  )
}

export default ChatHeader

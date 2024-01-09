import {
  CallActionBgIcon,
  CallCallIcon,
  CallChatIcon,
  CallDisableIcon,
  CallEndIcon,
  CallRecordIcon,
  CallVideoIcon,
  CallVoiceIcon,
} from '@/assets/icons'
import { ActionButton } from '@/components/common'
import { baseUrl } from '@/constants'
import { IChatRoom } from '@/types'
import Image from 'next/image'
import { FC } from 'react'

interface CallActionsProps {
  isCameraOn: boolean
  isMicOn: boolean
  toggleCamera: () => void
  toggleMic: () => void
  micButtonClasses: string
  videoCallButtonClasses: string
}

const CallActions: FC<CallActionsProps> = ({
  isCameraOn,
  isMicOn,
  toggleCamera,
  toggleMic,
  micButtonClasses,
  videoCallButtonClasses,
}) => {
  const selectedStorageChatRoom: IChatRoom = JSON.parse(String(window.localStorage.getItem('selectedChatRoom')))
  return (
    <div className="absolute top-[30%] w-full h-full flex flex-col gap-20 bg-[#2E6743]">
      {selectedStorageChatRoom && (
        <section className="flex flex-col items-center justify-center z-40">
          <Image
            src={`${baseUrl}/${selectedStorageChatRoom.doktor.image}`}
            alt={selectedStorageChatRoom.doktor.name}
            width={125}
            height={125}
            className="rounded-[30px]"
          />
          <h2 className="text-white">{selectedStorageChatRoom.doktor.name}</h2>
          <p className="text-[22px] uppercase text-gray-primary">{selectedStorageChatRoom.doktor.type}</p>
        </section>
      )}
      <section className="flex flex-col items-center just gap-10 z-50">
        <div className="w-[130px] h-[43px] flex items-center justify-center gap-2 rounded-[20px] bg-[#8E9AAB]/20">
          <CallRecordIcon />
          <h6 className="text-white">00:29:12</h6>
        </div>
        <div>
          <div className="relative">
            <CallActionBgIcon />
            <ActionButton size="lg" className={micButtonClasses} onClick={toggleMic}>
              <CallVoiceIcon color={isMicOn ? '#112950' : 'white'} />
              {!isMicOn && (
                <div className="absolute">
                  <CallDisableIcon color={isMicOn ? '#112950' : 'white'} />
                </div>
              )}
            </ActionButton>
            <ActionButton size="lg" className="absolute top-4 left-[84px] bg-white border border-[#F2F4F5]">
              <CallChatIcon />
            </ActionButton>
            <button className="absolute -bottom-2 left-[35%] z-50">
              <CallEndIcon />
            </button>
            <ActionButton size="lg" className={videoCallButtonClasses} onClick={toggleCamera}>
              <CallVideoIcon color={isCameraOn ? '#112950' : 'white'} />
              {!isCameraOn && (
                <div className="absolute">
                  <CallDisableIcon color={isCameraOn ? '#112950' : 'white'} />
                </div>
              )}
            </ActionButton>
            <ActionButton size="lg" className="absolute top-4 right-6 bg-white border border-[#F2F4F5]">
              <CallCallIcon />
            </ActionButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CallActions

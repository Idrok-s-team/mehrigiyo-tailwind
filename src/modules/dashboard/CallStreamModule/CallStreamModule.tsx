'use client'

import { FC } from 'react'
import Image from 'next/image'
import { CallStream } from './components'
import callBackground from '@/assets/icons/dashboard/consultation/callBackground.png'
import { useChatStore } from '@/store'
import { baseUrl } from '@/constants'
import {
  CallActionBgIcon,
  CallCallIcon,
  CallChatIcon,
  CallEndIcon,
  CallRecordIcon,
  CallVideoIcon,
  CallVoiceIcon,
} from '@/assets/icons'
import { ActionButton } from '@/components'
import { IChatRoom } from '@/types'

const CallStreamModule: FC = () => {
  const selectedStorageChatRoom: IChatRoom = JSON.parse(String(window.localStorage.getItem('selectedChatRoom')))

  return (
    <CallStream />
    // <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-white">
    //   <Image src={callBackground} alt="" className="absolute select-none z-10" />
    //   <div className="absolute top-[30%] w-full h-full flex flex-col gap-20 bg-[#2E6743]">
    //     {selectedStorageChatRoom && (
    //       <section className="flex flex-col items-center justify-center z-50">
    //         <Image
    //           src={`${baseUrl}/${selectedStorageChatRoom.doktor.image}`}
    //           alt={selectedStorageChatRoom.doktor.name}
    //           width={125}
    //           height={125}
    //           className="rounded-[30px]"
    //         />
    //         <h2 className="text-white">{selectedStorageChatRoom.doktor.name}</h2>
    //         <p className="text-[22px] uppercase text-gray-primary">{selectedStorageChatRoom.doktor.type}</p>
    //       </section>
    //     )}
    //     <section className="flex flex-col items-center just gap-10">
    //       <div className="w-[130px] h-[43px] flex items-center justify-center gap-2 rounded-[20px] bg-[#8E9AAB]/20">
    //         <CallRecordIcon />
    //         <h6 className="text-white">00:29:12</h6>
    //       </div>
    //       <div>
    //         <div className="relative">
    //           <CallActionBgIcon />
    //           <ActionButton size="lg" className="absolute top-4 left-6 bg-white border border-[#F2F4F5]">
    //             <CallVoiceIcon />
    //           </ActionButton>
    //           <ActionButton size="lg" className="absolute top-4 left-[84px] bg-white border border-[#F2F4F5]">
    //             <CallChatIcon />
    //           </ActionButton>
    //           <button className="absolute -bottom-2 left-[35%]">
    //             <CallEndIcon />
    //           </button>
    //           <ActionButton size="lg" className="absolute top-4 right-[84px] bg-white border border-[#F2F4F5]">
    //             <CallVideoIcon />
    //           </ActionButton>
    //           <ActionButton size="lg" className="absolute top-4 right-6 bg-white border border-[#F2F4F5]">
    //             <CallCallIcon />
    //           </ActionButton>
    //         </div>
    //       </div>
    //     </section>

    //   </div>
    // </div>
  )
}

export default CallStreamModule

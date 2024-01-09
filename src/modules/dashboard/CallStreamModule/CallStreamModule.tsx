'use client'

import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CallActions, CallStream, DoctorInfo, MiniVideoStream, VideoStream } from './components'
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
  CallDisableIcon,
} from '@/assets/icons'
import { ActionButton } from '@/components/common'
import { IChatRoom } from '@/types'
import clsx from 'clsx'

const CallStreamModule: FC = () => {
  const selectedStorageChatRoom: IChatRoom = JSON.parse(String(window.localStorage.getItem('selectedChatRoom')))
  const webcamVideoRef = useRef<HTMLVideoElement>(null)
  const webcamVideo1Ref = useRef<HTMLVideoElement>(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [isMicOn, setIsMicOn] = useState(false)

  const toggleCamera = async () => {
    if (!isCameraOn) {
      // Start the webcam
      const constraints = {
        width: { ideal: 1280 },
        height: { ideal: 720 },
        frameRate: { ideal: 60 },
      }
      const stream = await navigator.mediaDevices.getUserMedia({ video: constraints, audio: isMicOn })
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = stream
      }
      if (webcamVideo1Ref.current) {
        webcamVideo1Ref.current.srcObject = stream
      }
      setIsCameraOn(true)
    } else {
      // Turn off the camera
      const stream = webcamVideoRef.current?.srcObject as MediaStream
      // const stream1 = webcamVideo1Ref.current?.srcObject as MediaStream
      stream.getVideoTracks().forEach((track) => track.stop())
      setIsCameraOn(false)
    }
  }

  const toggleMic = async () => {
    if (!isMicOn) {
      // Turn on the microphone
      const stream = await navigator.mediaDevices.getUserMedia({ video: isCameraOn, audio: true })
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = stream
      }
      setIsMicOn(true)
    } else {
      // Turn off the microphone
      const stream = webcamVideoRef.current?.srcObject as MediaStream
      stream.getAudioTracks().forEach((track) => track.stop())
      setIsMicOn(false)
    }
  }

  useEffect(() => {
    toggleCamera()
  }, [])

  const micButtonClasses = clsx('absolute top-4 left-6 bg-white border border-[#F2F4F5]', {
    'bg-[#E64C3C]': !isMicOn,
    'bg-white': isMicOn,
  })

  const videoCallButtonClasses = clsx('absolute top-4 right-[84px] bg-white border border-[#F2F4F5]', {
    'bg-[#E64C3C]': !isCameraOn,
    'bg-white': isCameraOn,
  })

  return (
    // <CallStream />
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-white">
      <DoctorInfo selectedDoctor={selectedStorageChatRoom.doktor} />
      <VideoStream ref={webcamVideoRef} />
      <MiniVideoStream ref={webcamVideo1Ref} />

      <Image src={callBackground} alt="" className="absolute select-none z-10" />
      <CallActions
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
        toggleCamera={toggleCamera}
        toggleMic={toggleMic}
        micButtonClasses={micButtonClasses}
        videoCallButtonClasses={videoCallButtonClasses}
      />
    </div>
  )
}

export default CallStreamModule

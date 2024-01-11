'use client'

import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CallActions, CallStream, DoctorInfo, MiniVideoStream, VideoStream } from './components'
import callBackground from '@/assets/icons/dashboard/consultation/callBackground.png'
import { IChatRoom } from '@/types'
import clsx from 'clsx'
import { useWebRTC } from './hooks'

interface VideoStreams {
  main: MediaStream | null
  mini: MediaStream | null
}

const CallStreamModule: FC = () => {
  const selectedStorageChatRoom: IChatRoom = JSON.parse(String(window.localStorage.getItem('selectedChatRoom'))) || {}
  const webcamVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)

  const [isCameraOn, setIsCameraOn] = useState(false)
  const [isMicOn, setIsMicOn] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)

  const { localStream, remoteStream, isWebcamActive, startWebcam, handleMakeCall, handleAnswerCall } = useWebRTC()
  console.log('localStream', localStream)
  console.log('remoteStream', remoteStream)

  useEffect(() => {
    console.log('startWebcam effect')
    setIsCallActive(true)
    startWebcam().catch((error) => console.error('Webcamni yoqishda xato:', error))
  }, [startWebcam])

  useEffect(() => {
    console.log('localStream, remoteStream')
    if (webcamVideoRef.current) {
      webcamVideoRef.current.srcObject = localStream
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [localStream, remoteStream])

  const toggleCamera = async () => {
    setIsCameraOn((prev) => !prev)
    if (!isCameraOn) {
      await startWebcam()
    } else {
      if (localStream) {
        localStream.getTracks().forEach((track) => (track.enabled = !track.enabled))
      }
    }
  }

  const toggleMic = () => {
    // Mikrofonni yoqish/o'chirish logikasi
    setIsMicOn((prev) => !prev)
  }

  return (
    // <CallStream />
    <div className="fixed inset-0 z-50 w-screen h-screen overflow-hidden bg-white">
      <DoctorInfo selectedDoctor={selectedStorageChatRoom.doktor} />
      <VideoStream ref={webcamVideoRef} />
      <MiniVideoStream ref={remoteVideoRef} stream={remoteStream} />

      <Image src={callBackground} alt="" className="absolute select-none z-10" />
      <CallActions
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
        toggleCamera={toggleCamera}
        toggleMic={toggleMic}
        isCallActive={isCallActive}
      />
    </div>
  )
}

export default CallStreamModule

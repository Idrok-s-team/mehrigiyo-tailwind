'use client'

import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { CallActions, DoctorInfo, MiniVideoStream, VideoStream } from './components'
import callBackground from '@/assets/icons/dashboard/consultation/callBackground.png'
import { IChatRoom } from '@/types'
import clsx from 'clsx'

interface VideoStreams {
  main: MediaStream | null
  mini: MediaStream | null
}

const CallStreamModule: FC = () => {
  const selectedStorageChatRoom: IChatRoom = JSON.parse(String(window.localStorage.getItem('selectedChatRoom')))
  const webcamVideoRef = useRef<HTMLVideoElement>(null)
  const webcamVideo1Ref = useRef<HTMLVideoElement>(null)
  const [isCameraOn, setIsCameraOn] = useState(false)
  const [isMicOn, setIsMicOn] = useState(false)
  const [isCallActive, setIsCallActive] = useState(false)
  const [videoStreams, setVideoStreams] = useState<VideoStreams>({ main: null, mini: null })

  useEffect(() => {
    setIsCallActive(true)
  }, [])

  // useEffect(() => {
  //   toggleDevice('camera')
  // }, [])

  const toggleDevice = async (device: 'camera' | 'mic') => {
    const isEnabled = device === 'camera' ? isCameraOn : isMicOn
    if (!isEnabled) {
      const constraints =
        device === 'camera'
          ? { video: { width: 1280, height: 720, frameRate: 60 }, audio: isMicOn }
          : { audio: true, video: isCameraOn }
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      setVideoStreams({ main: stream, mini: stream })
      if (webcamVideoRef.current) {
        webcamVideoRef.current.srcObject = stream
      }
      device === 'camera' ? setIsCameraOn(true) : setIsMicOn(true)
    } else {
      const stream = webcamVideoRef.current?.srcObject as MediaStream
      const tracks = device === 'camera' ? stream.getVideoTracks() : stream.getAudioTracks()
      tracks.forEach((track) => track.stop())
      device === 'camera' ? setIsCameraOn(false) : setIsMicOn(false)
      if (device === 'camera') {
        setVideoStreams({ main: null, mini: null })
      }
    }
  }

  const switchVideos = () => {
    setVideoStreams((streams) => ({ main: streams.mini, mini: streams.main }))
  }

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
      <VideoStream ref={webcamVideoRef} stream={videoStreams.main} />
      <MiniVideoStream ref={webcamVideo1Ref} stream={videoStreams.mini} onDoubleClick={switchVideos} />

      <Image src={callBackground} alt="" className="absolute select-none z-10" />
      <CallActions
        isCameraOn={isCameraOn}
        isMicOn={isMicOn}
        toggleCamera={() => toggleDevice('camera')}
        toggleMic={() => toggleDevice('mic')}
        micButtonClasses={micButtonClasses}
        videoCallButtonClasses={videoCallButtonClasses}
        isCallActive={isCallActive}
      />
    </div>
  )
}

export default CallStreamModule

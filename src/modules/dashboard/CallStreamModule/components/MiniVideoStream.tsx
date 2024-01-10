import React, { forwardRef, useEffect, useState } from 'react'

interface MiniVideoStreamProps {
  stream: MediaStream | null
  onDoubleClick: () => void
}

const MiniVideoStream = forwardRef<HTMLVideoElement, MiniVideoStreamProps>(({ stream, onDoubleClick }, ref) => {
  const videoRef = ref as React.RefObject<HTMLVideoElement>

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream, videoRef])

  return (
    <div className="absolute top-10 right-10 z-[60] cursor-pointer" onDoubleClick={onDoubleClick}>
      <video
        ref={ref}
        id="webcamVideo"
        autoPlay
        playsInline
        className="w-[146px] h-[200px] rounded-xl object-cover scale-x-[-1]"
      />
      {stream && <p className="absolute top-0 text-white">{stream.id}</p>}
    </div>
  )
})

export default MiniVideoStream

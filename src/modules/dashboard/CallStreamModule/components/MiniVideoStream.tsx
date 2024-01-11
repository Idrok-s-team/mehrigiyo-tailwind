import React, { forwardRef, useEffect, useState } from 'react'

interface MiniVideoStreamProps {
  stream: MediaStream | null
  // onDoubleClick: () => void
}

const MiniVideoStream = forwardRef<HTMLVideoElement, MiniVideoStreamProps>(({ stream }, ref) => {
  useEffect(() => {
    if (ref && 'current' in ref && ref.current && stream) {
      ref.current.srcObject = stream
    }
  }, [stream, ref])

  return (
    <div className="absolute top-10 right-10 z-[60] cursor-pointer">
      <h1 className="text-white text-3xl">Mini video stream</h1>
      <video
        ref={ref}
        id="webcamVideo"
        autoPlay
        playsInline
        className="w-[146px] h-[200px] rounded-xl object-cover scale-x-[-1]"
      />
      {/* {stream && <p className="absolute top-0 text-white">{stream.id}</p>} */}
    </div>
  )
})

export default MiniVideoStream

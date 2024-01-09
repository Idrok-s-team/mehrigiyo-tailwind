import React, { forwardRef } from 'react'

interface VideoStreamProps {}

const VideoStream = forwardRef<any, VideoStreamProps>((_, ref) => {
  return (
    <div className="absolute w-full h-full z-50">
      <video ref={ref} id="webcamVideo" autoPlay playsInline className="w-full !h-full object-cover scale-x-[-1]" />
    </div>
  )
})

export default VideoStream

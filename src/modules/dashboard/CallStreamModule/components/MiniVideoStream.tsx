import React, { forwardRef } from 'react'

interface VideoStreamProps {}

const MiniVideoStream = forwardRef<any, VideoStreamProps>((_, ref) => {
  return (
    <div className="absolute top-10 right-10 z-[60]">
      <video
        ref={ref}
        id="webcamVideo"
        autoPlay
        playsInline
        className="w-[146px] h-[200px] rounded-xl object-cover scale-x-[-1]"
      />
    </div>
  )
})

export default MiniVideoStream

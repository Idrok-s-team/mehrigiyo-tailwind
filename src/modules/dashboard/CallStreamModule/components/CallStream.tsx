import React, { useEffect, useRef } from 'react'
import { useWebRTC } from '../hooks'

const CallStream: React.FC = () => {
  const webcamVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const callInputRef = useRef<HTMLInputElement>(null)
  const hangupButtonRef = useRef<HTMLButtonElement>(null)

  const { localStream, remoteStream, isWebcamActive, startWebcam, handleMakeCall, handleAnswerCall } = useWebRTC()

  useEffect(() => {
    if (webcamVideoRef.current) {
      webcamVideoRef.current.srcObject = localStream
    }
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [localStream, remoteStream])

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="flex flex-col items-center space-y-4">
        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
          <video ref={webcamVideoRef} id="webcamVideo" autoPlay playsInline className="object-cover"></video>
        </div>
        <div className="aspect-w-16 aspect-h-9 bg-gray-200">
          <video ref={remoteVideoRef} id="remoteVideo" autoPlay playsInline className="object-cover"></video>
        </div>
        <div className="w-full">
          <input
            ref={callInputRef}
            id="callInput"
            placeholder="Enter Call ID"
            className="p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="flex justify-between w-full">
          <button
            onClick={() => startWebcam()}
            disabled={isWebcamActive}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Start webcam
          </button>
          <button
            onClick={() => handleMakeCall(callInputRef, hangupButtonRef)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Create Call (offer)
          </button>
          <button
            onClick={() => handleAnswerCall(callInputRef)}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 disabled:opacity-50"
          >
            Answer
          </button>
          <button
            ref={hangupButtonRef}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
          >
            Hangup
          </button>
        </div>
      </div>
    </div>
  )
}

export default CallStream

import { baseUrl } from '@/constants'
import { ChatRoomDoctorType } from '@/types'
import Image from 'next/image'
import { useWebRTC } from '../hooks'
import { useRef } from 'react'

interface DoctorInfoProps {
  selectedDoctor: ChatRoomDoctorType
}

const DoctorInfo: React.FC<DoctorInfoProps> = ({ selectedDoctor }) => {
  const callInputRef = useRef<HTMLInputElement>(null)
  const hangupButtonRef = useRef<HTMLButtonElement>(null)

  const { localStream, remoteStream, isWebcamActive, startWebcam, handleMakeCall, handleAnswerCall } = useWebRTC()

  if (!selectedDoctor) return null

  return (
    <div>
      <div className="absolute top-1/2 left-10 z-[60] flex items-center gap-5 px-5 py-2 rounded-md bg-white/50">
        <input
          ref={callInputRef}
          id="callInput"
          placeholder="Enter Call ID"
          className="p-2 border border-gray-300 rounded w-full"
        />
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

      <div className="absolute top-10 left-10 z-[60] flex items-center gap-5 px-5 py-2 rounded-md bg-white/50">
        <Image
          src={`${baseUrl}/${selectedDoctor.image}`}
          alt={selectedDoctor.name}
          width={56}
          height={56}
          className="rounded-full"
        />
        <div>
          <h4>{selectedDoctor.name}</h4>
          <p className="text-sm uppercase">{selectedDoctor.type}</p>
        </div>
      </div>
    </div>
  )
}

export default DoctorInfo

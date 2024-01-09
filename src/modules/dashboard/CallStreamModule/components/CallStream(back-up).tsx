import React, { useEffect, useRef, useState } from 'react'

interface ICandidate {
  candidate: string
  sdpMid: string | null
  sdpMLineIndex: number | null
}

const App: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteSdp, setRemoteSdp] = useState<string>('')
  const [localOffer, setLocalOffer] = useState<string>('')
  const [localAnswer, setLocalAnswer] = useState<string>('')
  const [localIceCandidates, setLocalIceCandidates] = useState<ICandidate[]>([])
  const [remoteIceCandidate, setRemoteIceCandidate] = useState<string>('')

  useEffect(() => {
    const getLocalMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        localVideoRef.current!.srcObject = stream
        setLocalStream(stream)
      } catch (error) {
        console.error('Media olishda xato:', error)
      }
    }

    getLocalMedia()
  }, [])

  useEffect(() => {
    if (!localStream) return

    const peerConnection = new RTCPeerConnection({ iceServers: [{ urls: 'stun:stun1.l.google.com:19302' }] })
    peerConnectionRef.current = peerConnection
    localStream.getTracks().forEach((track) => peerConnection.addTrack(track, localStream))

    peerConnection.ontrack = (event) => {
      remoteVideoRef.current!.srcObject = event.streams[0]
    }

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        setLocalIceCandidates((prev) => [
          ...prev,
          {
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
          },
        ])
      }
    }
  }, [localStream])

  const createOffer = async () => {
    if (!peerConnectionRef.current) return

    const offer = await peerConnectionRef.current.createOffer()
    await peerConnectionRef.current.setLocalDescription(offer)
    setLocalOffer(offer.sdp)
  }

  const createAnswer = async () => {
    if (!peerConnectionRef.current) return

    const offer = new RTCSessionDescription({ type: 'offer', sdp: remoteSdp })
    await peerConnectionRef.current.setRemoteDescription(offer)
    const answer = await peerConnectionRef.current.createAnswer()
    await peerConnectionRef.current.setLocalDescription(answer)
    setLocalAnswer(answer.sdp)
  }

  const handleSetAnswer = async () => {
    if (!peerConnectionRef.current) return

    const answer = new RTCSessionDescription({ type: 'answer', sdp: remoteSdp })
    await peerConnectionRef.current.setRemoteDescription(answer)
  }

  const addRemoteIceCandidate = async () => {
    if (!peerConnectionRef.current || !remoteIceCandidate) return

    try {
      const candidateObj = JSON.parse(remoteIceCandidate)
      if (candidateObj.candidate && (candidateObj.sdpMid !== null || candidateObj.sdpMLineIndex !== null)) {
        const candidate = new RTCIceCandidate(candidateObj)
        await peerConnectionRef.current.addIceCandidate(candidate)
      } else {
        console.error("ICE kandidat ma'lumotlari noto'g'ri formatda yoki to'liq emas")
      }
    } catch (error) {
      console.error("ICE kandidatini qo'shishda xato:", error)
    }
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="video-container">
          <video ref={localVideoRef} autoPlay muted className="w-full h-auto bg-black" />
        </div>
        <div className="video-container">
          <video ref={remoteVideoRef} autoPlay className="w-full h-auto bg-black" />
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <section>
          <button
            onClick={createOffer}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Offer
          </button>
          <div className="mt-2">
            <textarea value={localOffer} readOnly placeholder="Local Offer" className="textarea-style" />
          </div>
          <div className="mt-2">
            <textarea
              value={remoteSdp}
              onChange={(e) => setRemoteSdp(e.target.value)}
              placeholder="Remote SDP"
              className="textarea-style"
            />
          </div>
          <div className="mt-2">
            <button
              onClick={createAnswer}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Answer
            </button>
          </div>
          <div className="mt-2">
            <button
              onClick={handleSetAnswer}
              className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Set Answer
            </button>
          </div>
        </section>
        <section>
          <div className="mt-2">
            <textarea value={localAnswer} readOnly placeholder="Local Answer" className="textarea-style" />
          </div>
          <div className="mt-2">
            <label htmlFor="">Local ICE Candidates</label>
            <textarea
              value={JSON.stringify(localIceCandidates)}
              readOnly
              placeholder="Local ICE Candidates"
              className="textarea-style"
            />
          </div>
          <div className="mt-2">
            <textarea
              value={remoteIceCandidate}
              onChange={(e) => setRemoteIceCandidate(e.target.value)}
              placeholder="Remote ICE Candidate"
              className="textarea-style"
            />
          </div>
          <div className="mt-2">
            <button
              onClick={addRemoteIceCandidate}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Add Remote ICE Candidate
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App

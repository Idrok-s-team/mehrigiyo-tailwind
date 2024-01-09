import React, { useEffect, useRef, useState } from 'react'
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore'
import firestore from '@/config/firebaseConfig'

interface ICandidate {
  candidate: string
  sdpMid: string | null
  sdpMLineIndex: number | null
}

interface ISignalingData {
  type: 'offer' | 'answer' | 'candidate'
  sdp?: string
  candidate?: RTCIceCandidateInit
  to: string // Bu yerga qabul qiluvchi foydalanuvchining identifikatori kiradi
}

const App: React.FC = () => {
  const localVideoRef = useRef<HTMLVideoElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null)
  const signalingRef = useRef<string>('')
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteSdp, setRemoteSdp] = useState<string>('')
  const [localIceCandidates, setLocalIceCandidates] = useState<ICandidate[]>([])
  const [isCalling, setIsCalling] = useState(false)

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
        const newCandidate = {
          candidate: event.candidate.candidate,
          sdpMid: event.candidate.sdpMid,
          sdpMLineIndex: event.candidate.sdpMLineIndex,
        }
        setLocalIceCandidates((prev) => [...prev, newCandidate])
        sendIceCandidate(newCandidate)
      }
    }

    const signalingQuery = query(collection(firestore, 'signaling'), where('to', '==', signalingRef.current))
    const unsubscribe = onSnapshot(signalingQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const data = change.doc.data() as ISignalingData
          if (data.type === 'offer' && data.sdp) {
            handleRemoteOffer(data.sdp)
          } else if (data.type === 'answer' && data.sdp) {
            handleRemoteAnswer(data.sdp)
          } else if (data.type === 'candidate' && data.candidate) {
            addRemoteIceCandidate(data.candidate)
          }
        }
      })
    })

    return () => unsubscribe()
  }, [localStream])

  const handleRemoteOffer = async (sdp: string) => {
    if (!peerConnectionRef.current) return

    const offer = new RTCSessionDescription({ type: 'offer', sdp })
    await peerConnectionRef.current.setRemoteDescription(offer)
    const answer = await peerConnectionRef.current.createAnswer()
    await peerConnectionRef.current.setLocalDescription(answer)
    sendAnswer(answer.sdp)
  }

  const handleRemoteAnswer = async (sdp: string) => {
    if (!peerConnectionRef.current) return

    const answer = new RTCSessionDescription({ type: 'answer', sdp })
    await peerConnectionRef.current.setRemoteDescription(answer)
  }

  const sendOffer = async (sdp?: string) => {
    await addDoc(collection(firestore, 'signaling'), { type: 'offer', sdp, to: 'someOtherUser' })
  }

  const sendAnswer = async (sdp?: string) => {
    await addDoc(collection(firestore, 'signaling'), { type: 'answer', sdp, to: 'someOtherUser' })
  }

  const sendIceCandidate = async (candidate: RTCIceCandidateInit) => {
    await addDoc(collection(firestore, 'signaling'), { type: 'candidate', candidate, to: 'someOtherUser' })
  }

  const addRemoteIceCandidate = async (candidate: RTCIceCandidateInit) => {
    if (!peerConnectionRef.current) return

    try {
      const iceCandidate = new RTCIceCandidate(candidate)
      await peerConnectionRef.current.addIceCandidate(iceCandidate)
    } catch (error) {
      console.error("ICE kandidatini qo'shishda xato:", error)
    }
  }

  const createOffer = async () => {
    if (!peerConnectionRef.current) return

    try {
      const offer = await peerConnectionRef.current.createOffer()
      await peerConnectionRef.current.setLocalDescription(offer)
      sendOffer(offer.sdp)
    } catch (error) {
      console.error('Offer yaratishda xato:', error)
    }
  }

  const startCall = () => {
    setIsCalling(true)
    createOffer() // Offer yaratish funksiyasini chaqirish
  }

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="video-container">
          <video ref={localVideoRef} autoPlay muted className="w-full h-auto bg-black" />
          {!isCalling && (
            <button
              onClick={startCall}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Call qilish
            </button>
          )}
        </div>
        {isCalling && (
          <div className="video-container">
            <video ref={remoteVideoRef} autoPlay className="w-full h-auto bg-black" />
          </div>
        )}
      </div>
    </div>
  )
}

export default App

import React, { useEffect, useRef, useState } from 'react'
import { collection, addDoc, onSnapshot, query, where, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore'
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

const CallStream: React.FC = () => {
  const webcamButtonRef = useRef<HTMLButtonElement>(null)
  const webcamVideoRef = useRef<HTMLVideoElement>(null)
  const callButtonRef = useRef<HTMLButtonElement>(null)
  const callInputRef = useRef<HTMLInputElement>(null)
  const answerButtonRef = useRef<HTMLButtonElement>(null)
  const remoteVideoRef = useRef<HTMLVideoElement>(null)
  const hangupButtonRef = useRef<HTMLButtonElement>(null)

  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [isWebcamActive, setIsWebcamActive] = useState(false)

  const servers = {
    iceServers: [{ urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }],
    iceCandidatePoolSize: 10,
  }
  const pc = useRef(new RTCPeerConnection(servers)).current

  useEffect(() => {
    // Initialize or set up anything
    return () => {
      localStream?.getTracks().forEach((track) => track.stop())
      remoteStream?.getTracks().forEach((track) => track.stop())
      pc.close()
    }
  }, [])

  const startWebcam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    })
    setLocalStream(stream)
    const newRemoteStream = new MediaStream()
    setRemoteStream(newRemoteStream)

    stream.getTracks().forEach((track) => {
      pc.addTrack(track, stream)
    })

    pc.ontrack = (event) => {
      event.streams[0].getTracks().forEach((track) => {
        newRemoteStream.addTrack(track)
      })
    }

    if (webcamVideoRef.current && remoteVideoRef.current) {
      webcamVideoRef.current.srcObject = stream
      remoteVideoRef.current.srcObject = newRemoteStream
    }

    setIsWebcamActive(true) // You can use this state to enable or disable buttons
  }

  const handleMakeCall = async () => {
    // Reference to the 'rooms' collection instead of 'calls'
    const roomDocRef = doc(collection(firestore, 'rooms'))
    const callerCandidatesCollection = collection(roomDocRef, 'callerCandidates')

    // Store the new room ID in the input field so it can be shared with the other user
    if (callInputRef.current) {
      callInputRef.current.value = roomDocRef.id
    }

    // Listen for ICE candidates and add them to the 'callerCandidates' sub-collection
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(callerCandidatesCollection, event.candidate.toJSON())
      }
    }

    // Create an offer and set the local description
    const offerDescription = await pc.createOffer()
    await pc.setLocalDescription(offerDescription)

    // Save the offer in the 'rooms' document
    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    }

    await setDoc(roomDocRef, { offer })

    // Listen for changes to the room document and update the remote description when an answer is added
    onSnapshot(roomDocRef, (snapshot) => {
      const data = snapshot.data()
      if (!pc.currentRemoteDescription && data?.answer) {
        const answerDescription = new RTCSessionDescription(data.answer)
        pc.setRemoteDescription(answerDescription)
      }
    })

    // If there is a UI element to represent hang up or disconnect, enable it
    if (hangupButtonRef.current) {
      hangupButtonRef.current.disabled = false
    }
  }

  const handleAnswerCall = async () => {
    if (callInputRef.current) {
      const callId = callInputRef.current.value
      // Ensure we're using 'rooms' collection to match your Firestore structure
      const roomDocRef = doc(firestore, 'rooms', callId)
      const answerCandidatesCollection = collection(roomDocRef, 'callerCandidates') // Use 'callerCandidates' if that's the correct sub-collection name

      pc.onicecandidate = (event) => {
        if (event.candidate) {
          addDoc(answerCandidatesCollection, event.candidate.toJSON())
        }
      }

      const callDocSnapshot = await getDoc(roomDocRef)
      if (callDocSnapshot.exists()) {
        const callData = callDocSnapshot.data()
        const offerDescription = callData.offer
        await pc.setRemoteDescription(new RTCSessionDescription(offerDescription))

        const answerDescription = await pc.createAnswer()
        await pc.setLocalDescription(new RTCSessionDescription(answerDescription))

        const answer = {
          type: answerDescription.type,
          sdp: answerDescription.sdp,
        }

        await updateDoc(roomDocRef, { answer })

        // Listen to 'callerCandidates' collection for ICE candidates added by the caller
        const offerCandidatesCollection = collection(roomDocRef, 'callerCandidates') // Assuming this is the correct name
        onSnapshot(offerCandidatesCollection, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
            if (change.type === 'added') {
              const candidateData = change.doc.data()
              pc.addIceCandidate(new RTCIceCandidate(candidateData))
            }
          })
        })
      } else {
        console.log('Document does not exist!')
      }
    }
  }

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
            ref={webcamButtonRef}
            onClick={startWebcam}
            disabled={isWebcamActive}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Start webcam
          </button>
          <button
            ref={callButtonRef}
            onClick={handleMakeCall}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
          >
            Create Call (offer)
          </button>
          <button
            ref={answerButtonRef}
            onClick={handleAnswerCall}
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

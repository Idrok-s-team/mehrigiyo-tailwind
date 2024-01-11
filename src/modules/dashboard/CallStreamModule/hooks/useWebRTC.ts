import { useRef, useState, useEffect, useCallback } from 'react'
import { collection, addDoc, onSnapshot, doc, setDoc, updateDoc, getDoc, Firestore } from 'firebase/firestore'
import firestore from '@/config/firebaseConfig'

interface UseWebRTCHook {
  localStream: MediaStream | null
  remoteStream: MediaStream | null
  isWebcamActive: boolean
  startWebcam: () => Promise<void>
  handleMakeCall: (
    callInputRef: React.RefObject<HTMLInputElement>,
    hangupButtonRef: React.RefObject<HTMLButtonElement>,
  ) => Promise<void>
  handleAnswerCall: (callInputRef: React.RefObject<HTMLInputElement>) => Promise<void>
}

const useWebRTC = (): UseWebRTCHook => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)
  const [isWebcamActive, setIsWebcamActive] = useState(false)
  const pc = useRef<RTCPeerConnection | null>(null)

  useEffect(() => {
    if (!pc.current) {
      pc.current = new RTCPeerConnection({
        iceServers: [{ urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] }],
        iceCandidatePoolSize: 10,
      })
    }

    return () => {
      if (pc.current) {
        pc.current.close()
        pc.current = null
      }
    }
  }, [])

  const startWebcam = useCallback(async (): Promise<void> => {
    if (!pc.current) return

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
      setLocalStream(stream)
      const newRemoteStream = new MediaStream()
      setRemoteStream(newRemoteStream)

      stream.getTracks().forEach((track) => {
        pc.current!.addTrack(track, stream)
      })

      pc.current!.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
          newRemoteStream.addTrack(track)
        })
      }
    } catch (error) {
      console.error('Webcamni yoqishda xato:', error)
    }

    setIsWebcamActive(true)
  }, [])

  const handleMakeCall = async (
    callInputRef: React.RefObject<HTMLInputElement>,
    hangupButtonRef: React.RefObject<HTMLButtonElement>,
  ): Promise<void> => {
    if (!pc.current) return

    const roomDocRef = doc(collection(firestore, 'rooms'))
    const callerCandidatesCollection = collection(roomDocRef, 'callerCandidates')

    pc.current!.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(callerCandidatesCollection, event.candidate.toJSON())
          .then((res) => console.log(`callerCandidatesCollection response: ${res}`))
          .catch((err) => console.log(`callerCandidatesCollection error: ${err}`))
      }
    }

    const offerDescription = await pc.current!.createOffer()
    await pc.current!.setLocalDescription(offerDescription)

    const offer = {
      sdp: offerDescription.sdp,
      type: offerDescription.type,
    }

    await setDoc(roomDocRef, { offer })

    onSnapshot(roomDocRef, (snapshot) => {
      const data = snapshot.data()
      if (data?.answer && pc.current && !pc.current.currentRemoteDescription) {
        const answerDescription = new RTCSessionDescription(data.answer)
        pc.current!.setRemoteDescription(answerDescription)
      }
    })

    if (callInputRef.current) {
      callInputRef.current.value = roomDocRef.id
    }
    if (hangupButtonRef.current) {
      hangupButtonRef.current.disabled = false
    }
  }

  const handleAnswerCall = async (callInputRef: React.RefObject<HTMLInputElement>): Promise<void> => {
    if (!pc.current || !callInputRef.current) return

    const callId = callInputRef.current.value
    const roomDocRef = doc(firestore, 'rooms', callId)
    const answerCandidatesCollection = collection(roomDocRef, 'answerCandidates')

    pc.current!.onicecandidate = (event) => {
      if (event.candidate) {
        addDoc(answerCandidatesCollection, event.candidate.toJSON())
          .then((res) => console.log(`answerCandidatesCollection response: ${res}`))
          .catch((err) => console.log(`answerCandidatesCollection error: ${err}`))
      }
    }

    const callDocSnapshot = await getDoc(roomDocRef)
    if (callDocSnapshot.exists()) {
      const callData = callDocSnapshot.data()
      const offerDescription = callData.offer
      await pc.current!.setRemoteDescription(new RTCSessionDescription(offerDescription))

      const answerDescription = await pc.current!.createAnswer()
      await pc.current!.setLocalDescription(answerDescription)

      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      }

      await updateDoc(roomDocRef, { answer })

      const offerCandidatesCollection = collection(roomDocRef, 'callerCandidates')
      onSnapshot(offerCandidatesCollection, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const candidateData = change.doc.data()
            pc.current!.addIceCandidate(new RTCIceCandidate(candidateData))
          }
        })
      })
      console.log('Call answered!')
    } else {
      console.log('Document does not exist!')
    }
  }

  return { localStream, remoteStream, isWebcamActive, startWebcam, handleMakeCall, handleAnswerCall }
}

export default useWebRTC

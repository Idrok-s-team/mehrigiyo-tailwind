import React, { useState, useEffect, useRef } from 'react';

const CallStream: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Kamera va mikrofon oqimini olish
    const getMedia = async () => {
      try {
        const currentStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(currentStream);
        if (videoRef.current) {
          videoRef.current.srcObject = currentStream;
        }
      } catch (error) {
        console.error('MediaDevices oqimini olishda xato: ', error);
      }
    };

    getMedia();

    // Komponent yo'qolganda oqimni to'xtatish
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
    </div>
  );
};

export default CallStream;

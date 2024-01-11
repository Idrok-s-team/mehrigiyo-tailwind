import { FC, memo, useEffect, useState } from 'react'

interface IProps {
  isCallActive: boolean
}

const Timer: FC<IProps> = memo(({ isCallActive }) => {
  const [timer, setTimer] = useState<number>(0)

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isCallActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1)
      }, 1000)
    } else {
      setTimer(0)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isCallActive])

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, '0')
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, '0')
    const seconds = (totalSeconds % 60).toString().padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }
  return <h6 className="text-white">{formatTime(timer)}</h6>
})

export default Timer

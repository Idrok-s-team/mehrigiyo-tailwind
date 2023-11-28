import { useEffect, useRef, useState } from 'react'

const useAnimatedCounter = (endValue: number, animationDurationMs: number = 200): number => {
  const [currentValue, setCurrentValue] = useState<number>(0)
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    const startTime = Date.now()

    const animateCount = () => {
      const elapsedTime = Date.now() - startTime
      const progress = Math.min(elapsedTime / animationDurationMs, 1) // Ensure progress does not exceed 1
      const newValue = currentValue + (endValue - currentValue) * progress

      setCurrentValue(newValue)

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animateCount)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animateCount)

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [endValue, animationDurationMs])

  return Math.round(currentValue)
}

export default useAnimatedCounter

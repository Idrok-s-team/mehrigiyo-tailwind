import { useEffect, useRef, useState } from 'react';

const useCountUp = (endValue: number, duration: number = 1.5): number => {
  const [count, setCount] = useState<number>(0);
  const frameRef = useRef<number | null>(null);

  const formatNumber = (number: number): string => {
    return number?.toFixed();
  };
  useEffect(() => {
    const startValue = count;
    const startTime = Date.now();

    const updateCount = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;

      if (elapsedTime < duration * 200) {
        const progress = elapsedTime / (duration * 1000);
        const value = startValue + (endValue  - startValue) * progress;
        setCount(value);
        frameRef.current = requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };
    frameRef.current = requestAnimationFrame(updateCount);
    return () => {
      cancelAnimationFrame(frameRef.current as number);
    };
  }, [endValue, duration]);

  return Number(formatNumber(count));
};

export default useCountUp;

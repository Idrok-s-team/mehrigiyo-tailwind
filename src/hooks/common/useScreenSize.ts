import { useMediaQuery } from 'usehooks-ts';

const useScreenSize = () => {
  const isMin2xl = useMediaQuery('(min-width: 1400px)');
  const isMinXl = useMediaQuery('(min-width: 1280px)');
  const isMinLg = useMediaQuery('(min-width: 1024px)');
  const isMinMd = useMediaQuery('(min-width: 768px)');
  const isMinSm = useMediaQuery('(min-width: 640px)');
  const isMinXs = useMediaQuery('(min-width: 480px)');
  const isMin2xs = useMediaQuery('(min-width: 360px)');

  const isMax2xl = useMediaQuery('(max-width: 1400px)');
  const isMaxXl = useMediaQuery('(max-width: 1280px)');
  const isMaxLg = useMediaQuery('(max-width: 1024px)');
  const isMaxMd = useMediaQuery('(max-width: 768px)');
  const isMaxSm = useMediaQuery('(max-width: 640px)');
  const isMaxXs = useMediaQuery('(max-width: 480px)');
  const isMax2xs = useMediaQuery('(max-width: 360px)');

  return {
    isMin2xl,
    isMinXl,
    isMinLg,
    isMinMd,
    isMinSm,
    isMinXs,
    isMin2xs,
    isMax2xl,
    isMaxXl,
    isMaxLg,
    isMaxMd,
    isMaxSm,
    isMaxXs,
    isMax2xs,
  };
};

export default useScreenSize;

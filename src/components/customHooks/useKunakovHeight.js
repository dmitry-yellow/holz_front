import { useCallback } from 'react';

const BASE_WINDOW_HEIGHT = 1080;

export const useKunakovHeight = (stageHeight) => {
  const calcHeight = useCallback((someHeight) => {
    const heightRatio = stageHeight / BASE_WINDOW_HEIGHT;
    return someHeight * heightRatio;
  }, [stageHeight]);

  return [calcHeight];
};

import { masonryColumnWidth } from '../constants';

export const calculateGridItemHeight = (width: number, height: number) => {
  const aspectRatio = height / width;
  return masonryColumnWidth * aspectRatio;
}

export const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
          func(...args);
      }, delay);
  };
}
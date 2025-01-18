import { masonryColumnWidth } from '../constants';

export const calculateGridItemHeight = (width: number, height: number) => {
  const aspectRatio = height / width;
  return masonryColumnWidth * aspectRatio;
}
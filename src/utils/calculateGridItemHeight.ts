import { MASONRY_COLUMN_WIDTH } from "../constants";

export const calculateGridItemHeight = (width: number, height: number) => {
  const aspectRatio = height / width; 
  return MASONRY_COLUMN_WIDTH * aspectRatio;
};
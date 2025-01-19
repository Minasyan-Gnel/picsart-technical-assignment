import { GRID_ITEMS_GAP } from "../constants";
import { Photo, PhotoWithTop } from "../types";
import { calculateGridItemHeight } from "./calculateGridItemHeight";

type GetColumnsParams = {
    columns: Array<Array<PhotoWithTop>>,
    columnsHeights: Array<number>,
}

export const getColumns = (photos: Array<Photo>, columnCount: number): GetColumnsParams => {
  const columns = Array.from<Photo, PhotoWithTop[]>({ length: columnCount }, () => []);
  const columnsHeights = new Array<number>(columnCount).fill(0);
  
  photos.forEach((photo) => {
    const minHeight = Math.min(...columnsHeights);
    const photoHeight = calculateGridItemHeight(photo.width, photo.height);
    const columnIndex = columnsHeights.indexOf(minHeight);
  
    columns[columnIndex].push({
      ...photo,
      height: photoHeight,
      top: columnsHeights[columnIndex]
    });
  
    columnsHeights[columnIndex]+= photoHeight + GRID_ITEMS_GAP;
  });
  
  return { columns, columnsHeights };
};
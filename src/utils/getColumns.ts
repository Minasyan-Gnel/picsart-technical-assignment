import { GRID_ITEMS_GAP } from "../constants";
import { Photo, PhotoWithTop } from "../types";
import { calculateGridItemHeight } from "./calculateGridItemHeight";

type GetColumnsResult = {
    columns: Array<Array<PhotoWithTop>>,
    columnsHeights: Array<number>,
}

type GetColumnsFn = (
  photos: Array<Photo>,
  columnCount: number,
  prevState?: { columns: Array<Array<PhotoWithTop>>, columnsHeights: Array<number> }
) => GetColumnsResult;

export const getColumns: GetColumnsFn = (photos, columnCount, prevState) => {
  let columns: Array<Array<PhotoWithTop>>;
  let columnsHeights: Array<number>;

  if (prevState) {
    columns = [...prevState.columns];
    columnsHeights = [...prevState.columnsHeights];
  } else {
    columns = Array.from<Photo, PhotoWithTop[]>({ length: columnCount }, () => []);
    columnsHeights = new Array<number>(columnCount).fill(0);
  }
  
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
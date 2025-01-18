import React, { useEffect, useState, useRef, useCallback } from 'react';

import { MasonryStyled, MasonryContainer } from './styles';
import { MasonryColumn } from './MasonryColumn';
import { fetchPhotos } from '../../api';
import { Photo } from 'pexels';
import { PhotoWithTop } from '../../types';
import { calculateGridItemHeight } from '../../utils';
import { GRID_ITEMS_GAP } from '../../constants';
import { LoadMore } from './LoadMore';

const distributePhotos = (images: Array<Photo>, columnCount: number, prevState: {
  columns: Array<Array<PhotoWithTop>>,
  columnsHeights: Array<number>,
}): {
  columns: Array<Array<PhotoWithTop>>,
  columnsHeights: Array<number>,
} => {
  const columns = prevState.columns.length ? [...prevState.columns] : Array.from<Photo, PhotoWithTop[]>({ length: columnCount }, () => []);
  const columnsHeights = prevState.columnsHeights.length ? [...prevState.columnsHeights] : new Array<number>(columnCount).fill(0);

  images.forEach((image) => {
    const minHeight = Math.min(...columnsHeights)
    const imageHeight = calculateGridItemHeight(image.width, image.height);
    const columnIndex = columnsHeights.indexOf(minHeight);

    columns[columnIndex].push({
      ...image,
      height: imageHeight,
      top: columnsHeights[columnIndex]
    });

    columnsHeights[columnIndex]+= imageHeight + GRID_ITEMS_GAP
  });

  return { columns, columnsHeights };
};

export const Masonry = () => {
  const [columns, setColumns] = useState<PhotoWithTop[][]>([]);
  const [columnsHeights, setColumnsHeights] = useState<Array<number>>([]);
  const [page, setPage] = useState(1);

  const ref = useRef<HTMLDivElement>(null);

  const onLoadMore = useCallback(() => {
    setPage(page => page + 1);
  }, [])

  useEffect(() => {
    fetchPhotos(page).then(photos => {
      const {columns: newColumns, columnsHeights: newColumnsHeights} = distributePhotos(photos, 6, {columns, columnsHeights})
      setColumns(newColumns);
      setColumnsHeights(newColumnsHeights)
    }).catch(error => console.error(error));
  }, [page])

  return <MasonryContainer ref={ref}>
    <MasonryStyled>
    {columns.map((column, index) => (
      column.length ? <MasonryColumn masonryRef={ref} photos={column} key={index} height={columnsHeights[index]}/> : null
    ))}
  </MasonryStyled>
  {columnsHeights.length ? <LoadMore onLoadMore={onLoadMore} /> : null}
  </MasonryContainer>;
};

import React, { useEffect, useState, useRef } from 'react';
import { Photo } from 'pexels';
import { useSearchParams } from 'react-router-dom';

import { Search } from '../Search';
import { LoadMore } from './LoadMore';
import { PhotoWithTop } from '../../types';
import { MasonryColumn } from './MasonryColumn';
import { calculateGridItemHeight } from '../../utils';
import { usePhotoStore } from '../../stores/PhotoStore';
import { MasonryStyled, MasonryContainer } from './styles';
import { GRID_ITEMS_GAP, MASONRY_COLUMN_WIDTH } from '../../constants';

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
  const [columnsCount, setColumnsCount] = useState(Math.round(window.innerWidth / MASONRY_COLUMN_WIDTH));

  const { photos, getPhotos, searchPhotos } = usePhotoStore();
  const [searchParams] = useSearchParams();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const search = searchParams.get('q');
    if (search) {
      searchPhotos(search)
    } else {
      getPhotos()
    }
}, [searchParams, searchPhotos, getPhotos])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setColumnsCount(Math.round(window.innerWidth / MASONRY_COLUMN_WIDTH))
    })

    if (ref.current) {
      resizeObserver.observe(ref.current)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (photos.length) {
      const {columns: newColumns, columnsHeights: newColumnsHeights} = distributePhotos(photos, columnsCount, {columns: [], columnsHeights: []})
      setColumns(newColumns);
      setColumnsHeights(newColumnsHeights)
    }
  }, [columnsCount, photos])

  return <>
    <Search/>
    <MasonryContainer ref={ref}>
    <MasonryStyled>
      {columns.map((column, index) => (
        column.length ? <MasonryColumn photos={column} key={index} height={columnsHeights[index]}/> : null
      ))}
    </MasonryStyled>
  {columnsHeights.length ? <LoadMore /> : null}
  </MasonryContainer>
  </>
};

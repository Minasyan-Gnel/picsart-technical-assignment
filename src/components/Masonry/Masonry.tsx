import React, { useEffect, useState, useRef } from 'react';

import { MasonryStyled } from './styles';
import { MasonryColumn } from './MasonryColumn/MasonryColumn';
import { fetchPhotos } from '../../api';
import { Photo } from 'pexels';
import { PhotoWithTop } from '../../types';
import { calculateGridItemHeight } from '../../utils';
import { GRID_ITEMS_GAP } from '../../constants';

const distributePhotos = (images: Array<Photo>, columnCount: number): {
  columns: Array<Array<PhotoWithTop>>,
  columnsHeights: Array<number>,
} => {
  const columns = Array.from<Photo, PhotoWithTop[]>({ length: columnCount }, () => []);
  const columnsHeights = new Array(columnCount).fill(0);

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
  const [columns, setColumns] = useState<PhotoWithTop[][]>([[]]);
  const [columnsHeights, setColumnsHeights] = useState<Array<number>>([]);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchPhotos().then(photos => {
      const {columns, columnsHeights} = distributePhotos(photos, 6)
      setColumns(columns);
      setColumnsHeights(columnsHeights)
    }).catch(error => console.error(error));
  }, [])

  return <MasonryStyled ref={ref}>
    {columns.map((column, index) => (
      column.length ? <MasonryColumn masonryRef={ref} photos={column} key={index}  height={columnsHeights[index]}/> : null
    ))}
  </MasonryStyled>;
};

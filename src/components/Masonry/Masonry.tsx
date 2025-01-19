import React, { useEffect, useState, useRef, useCallback } from 'react';

import { MasonryStyled, MasonryContainer } from './styles';
import { MasonryColumn } from './MasonryColumn';
import { fetchPhotos, searchPhotos } from '../../api';
import { Photo } from 'pexels';
import { PhotoWithTop } from '../../types';
import { calculateGridItemHeight } from '../../utils';
import { GRID_ITEMS_GAP, masonryColumnWidth } from '../../constants';
import { LoadMore } from './LoadMore';
import { Search } from '../Search';

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
  const [photos, setPhotos] = useState<Array<Photo>>([]);
  const [columns, setColumns] = useState<PhotoWithTop[][]>([]);
  const [columnsHeights, setColumnsHeights] = useState<Array<number>>([]);
  const [page, setPage] = useState(1);
  const [columnsCount, setColumnsCount] = useState(Math.round(window.innerWidth / masonryColumnWidth));

  const ref = useRef<HTMLDivElement>(null);

  const onLoadMore = useCallback(() => {
    setPage(page => page + 1);
  }, [])

  const onSearch = useCallback((search: string) => {
    if (search) {
      searchPhotos(search).then(photos => {
        setPhotos(photos)
      }).catch(error => console.error(error));
    } else {
      fetchPhotos().then(photos => {
        setPhotos(photos)
      }).catch(error => console.error(error));
    }
  }, [])

  useEffect(() => {
    fetchPhotos(page).then(photos => {
      setPhotos(prevState => [...prevState, ...photos])
    }).catch(error => console.error(error));
  }, [page])

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setColumnsCount(Math.round(window.innerWidth / masonryColumnWidth))
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
    <Search onSearch={onSearch}/>
    <MasonryContainer ref={ref}>
    <MasonryStyled>
      {columns.map((column, index) => (
        column.length ? <MasonryColumn masonryRef={ref} photos={column} key={index} height={columnsHeights[index]}/> : null
      ))}
    </MasonryStyled>
  {columnsHeights.length ? <LoadMore onLoadMore={onLoadMore} /> : null}
  </MasonryContainer>
  </>
};

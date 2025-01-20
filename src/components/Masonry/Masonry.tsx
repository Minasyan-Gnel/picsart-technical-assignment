import React, { useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Search } from '../Search';
import { Loader } from '../Loader';
import { LoadMore } from './LoadMore';
import { NoResult } from '../NoResult';
import { usePhotoStore } from '../../stores';
import { MasonryColumn } from './MasonryColumn';
import { MASONRY_COLUMN_WIDTH } from '../../constants';
import { MasonryStyled, MasonryContainer } from './styles';
 
export const Masonry = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();
  const {columns, isLoading, columnsHeights, redistributePhotos, getPhotos, searchPhotos} = usePhotoStore();

  useEffect(() => {
    if (searchParams.get('q')) {
      searchPhotos(searchParams.get('q') || '');
    } else {
      getPhotos();
    }
  }, [searchParams, searchPhotos, getPhotos]);

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      redistributePhotos(Math.round(window.innerWidth / MASONRY_COLUMN_WIDTH));
    });
    
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, redistributePhotos]);

  return <>
    <Search/> 
    <MasonryContainer ref={ref}>
      {isLoading ? <Loader/> : columns.length ? <MasonryStyled>
        {columns.map((column, index) => (
          column.length ? <MasonryColumn photos={column} key={index} height={columnsHeights[index]}/> : null
        ))}
      </MasonryStyled> : <NoResult/>}
      {columnsHeights.length || !isLoading ? <LoadMore /> : null}
    </MasonryContainer>
  </>;
};

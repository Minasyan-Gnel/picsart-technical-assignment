import React, { useRef } from 'react';

import { Search } from '../Search';
import { Loader } from '../Loader';
import { LoadMore } from './LoadMore';
import { NoResult } from '../NoResult';
import { useGetColumns } from '../../hooks';
import { MasonryColumn } from './MasonryColumn';
import { MasonryStyled, MasonryContainer } from './styles';
 
export const Masonry = () => {
  const ref = useRef<HTMLDivElement>(null);

  const {columns, isLoading, columnsHeights} = useGetColumns(ref);

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

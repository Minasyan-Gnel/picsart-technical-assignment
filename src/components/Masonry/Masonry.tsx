import React from 'react';

import { MasonryItem } from './MasonryItem';
import { useColumnsWithPhotos } from '../../hooks';
import { MasonryStyled, MasonryColumnStyled } from './styles';


export const Masonry = () => {
  const { columns } = useColumnsWithPhotos();

  return <MasonryStyled>
    {columns.map((column, index) => (
      <MasonryColumnStyled key={index}>
        {column.map((photo, index) => {
          const itemWidth = 200;
          const aspectRatio = photo.width / photo.height;
          const itemHeight = itemWidth * aspectRatio;

          return <MasonryItem key={index} height={itemHeight} width={itemWidth} image={photo.src.medium}/>
        })}
      </MasonryColumnStyled>
    ))}
  </MasonryStyled>;
};

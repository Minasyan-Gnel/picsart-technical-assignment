import React, { FC, useMemo } from 'react';

import { MasonryItem } from '../MasonryItem';
import { PhotoWithTop } from '../../../types';
import { MasonryColumnStyled } from './styles';
import { useVisiblePhotos } from '../../../hooks';

type MasonryColumnProps = {
  height: number;
  photos: Array<PhotoWithTop>;
}

export const MasonryColumn: FC<MasonryColumnProps> = ({photos, height}) => {
  const {visiblePhotos} = useVisiblePhotos(photos); 

  const columnContent = useMemo(() => (
    visiblePhotos.map((photo) => <MasonryItem photo={photo} key={photo.id}/>)
  ), [visiblePhotos]);

  return <MasonryColumnStyled style={{ height }}>
    {columnContent}
  </MasonryColumnStyled>;
};
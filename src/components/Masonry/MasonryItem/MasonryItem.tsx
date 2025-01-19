import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { PhotoWithTop } from '../../../types';
import { MasonryItemStyled, Image } from './styles';

interface IMasonryItemProps {
  photo: PhotoWithTop;
}

export const MasonryItem: FC<IMasonryItemProps> = ({ photo }) => {
  return <MasonryItemStyled height={photo.height} top={photo.top} color={photo.avg_color || ""}>
    <Link to={`/photo/${photo.id}`}>
      <Image src={photo.src.medium} alt={photo.alt || ""}/>
    </Link>
  </MasonryItemStyled>;
}

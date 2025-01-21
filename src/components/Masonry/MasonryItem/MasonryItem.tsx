import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { PhotoWithTop } from '../../../types';
import { MasonryItemStyled, Image } from './styles';

interface IMasonryItemProps {
  photo: PhotoWithTop;
}

export const MasonryItem: FC<IMasonryItemProps> = ({ photo }) => (
  <MasonryItemStyled height={photo.height} top={photo.top} color={photo.avg_color || ""}>
    <Link to={`/photo/${photo.id}`}>
      <picture>
        <source media="(min-width: 768px)" srcSet={photo.src.large} />
        <source media="(min-width: 590px)" srcSet={photo.src.medium} />
        <Image src={photo.src.medium} alt={photo.alt || ""} />
      </picture>
    </Link>
  </MasonryItemStyled>
);

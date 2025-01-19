import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Photo } from '../../../types';
import { MasonryItemStyled, Image } from './styles';

interface IMasonryItemProps {
  src: Photo['src'];
  id: number;
  alt: string;
  width: number;
  height: number;
  top: number;
}

export const MasonryItem: FC<IMasonryItemProps> = ({ width, height, top, src, alt, id }) => {
  return <MasonryItemStyled width={width} height={height} top={top}>
    <Link to={`/photo/${id}`}>
      <Image src={src.medium} alt={alt} />
    </Link>
  </MasonryItemStyled>;
}

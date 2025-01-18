import React, { FC } from 'react';
import { Photo } from 'pexels';

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
  return <MasonryItemStyled data-id={id} width={width} height={height} top={top}>
    <Image src={src.medium} alt={alt} />
  </MasonryItemStyled>;
}

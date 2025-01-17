import React from 'react';
import { MasonryItemStyled } from './styles';

interface IMasonryItemProps {
  image: string;
  width: number;
  height: number;
}

export const MasonryItem = ({ width, height }: IMasonryItemProps) => {
  return <MasonryItemStyled width={width} height={height}>
    Item
  </MasonryItemStyled>;
};

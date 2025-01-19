import React from 'react';

import NoResultImage from '../../assets/no-result.png';
import { NoResultStyled, NoResultImageStyled } from './styles';

export const NoResult = () => <NoResultStyled>
  <h1>No result</h1> 
  <NoResultImageStyled src={NoResultImage} alt="No result" />
</NoResultStyled>;
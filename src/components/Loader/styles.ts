import styled, { keyframes } from 'styled-components';

export const LoaderContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const spin = keyframes`
  to {
    transform: rotate(0.5turn);
  }
`;

export const LoaderStyled = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid;
  border-color: #000 #0000;
  animation: ${spin} 1s infinite;
`;

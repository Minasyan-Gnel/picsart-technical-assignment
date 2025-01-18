import styled from 'styled-components';

export const MasonryContainer = styled.div`
  overflow: auto;
  max-height: 100vh;
`

export const MasonryStyled = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
`;

export const MasonryColumnStyled = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

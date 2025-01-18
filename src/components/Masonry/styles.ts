import styled from 'styled-components';

export const MasonryStyled = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px;
  overflow: auto;
  max-height: 100vh;
`;

export const MasonryColumnStyled = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

import styled from 'styled-components';

export const MasonryColumnStyled = styled.div<{ width: number; height: number }>`
    width: ${({ width }) => `${width}px`};
    height: ${({ height }) => `${height}px`};
    position: relative;
`;

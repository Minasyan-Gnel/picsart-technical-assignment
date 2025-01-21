import styled from 'styled-components';

export const MasonryItemStyled = styled.div<{ height: number, top: number, color: string }>`
    width: 100%;
    overflow: hidden;
    position: absolute;
    border-radius: 8px;
    height: ${({ height }) => `${height}px`};
    background: ${({ color }) => color};
    transform: translateY(${({ top }) => `${top}px`});
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover; 
`;

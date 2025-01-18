import styled from 'styled-components';

export const MasonryItemStyled = styled.div<{ width: number, height: number, top: number }>`
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: ${({ top }) => `${top}px`};
    border-radius: 8px;
    background: #f0f0f0;
    height: ${({ height }) => `${height}px`};
    :hover {
        transform: translateY(-10px);
    }
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

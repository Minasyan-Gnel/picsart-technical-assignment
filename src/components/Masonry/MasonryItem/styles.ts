import styled from 'styled-components';

export const MasonryItemStyled = styled.div<{ width: number, height: number }>`
    width: 100%;
    position: relative;
    border-radius: 8px;
    background: #f0f0f0;
    height: ${({ height }) => height};
    padding-bottom: ${({ width, height }) => (height / width) * 100};
    :hover {
        transform: translateY(-10px);
    }
`;

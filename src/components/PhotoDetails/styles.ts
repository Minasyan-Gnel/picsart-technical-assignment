import styled from 'styled-components';

export const PhotoDetailsHeaderStyled = styled.div`
  padding: 20px 20px;
`;

export const PhotoDetailsContainerStyled = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 79px);
`;

export const PhotoDetailsStyled = styled.div`
  width: 70%;
  padding: 20px;
  display: flex;
  border-radius: 10px;
  background-color: #f3f3f3;
  box-shadow: 0px 0px 10px 0px #aaaaaa;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 590px) {
    width: 90%;
    flex-direction: column-reverse;
  }
`;

export const PhotoDetailsInfoStyled = styled.div`
  display: flex;
  gap: 10px;
  font-size: 18px;
  flex-direction: column;

  @media (max-width: 590px) { 
    margin-top: 10px;
  }
`;

export const BackButtonStyled = styled.div`
  border: none;
  cursor: pointer;
  border-radius: 5px;
  display: inline-block;
  background-color: transparent;
  box-shadow: 0px 0px 5px 0px #929090;
  &:hover {
    box-shadow: 0px 0px 5px 0px #929090 inset;
  }
  > a {
    color: black;
    padding: 10px 20px;
    display: inline-block;
    text-decoration: none;
  }
`;

export const PhotoDetailsImageInfoStyled = styled.div`
  flex: 1;
`;

export const PhotoDetailsImageWrapperStyled = styled.div<{ width: number, height: number }>`
  display: flex;
  max-width: 50%;
  overflow: hidden;
  max-height: 600px;
  border-radius: 10px;
  justify-content: center;
  aspect-ratio: ${({ width, height }) => width / height};
  img {
    width: 100%;
  }

  @media (max-width: 590px) {
    max-width: 100%;
    picture {
      width: 100%;
    }
  }
`;

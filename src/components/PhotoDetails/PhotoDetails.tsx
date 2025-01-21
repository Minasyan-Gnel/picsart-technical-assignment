import React, { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { Loader } from '../Loader';
import { Photo } from '../../types';
import { NoResult } from '../NoResult';
import { fetchPhotoById } from '../../api';

import {
  BackButtonStyled,
  PhotoDetailsStyled,
  PhotoDetailsInfoStyled,
  PhotoDetailsHeaderStyled,
  PhotoDetailsContainerStyled,
  PhotoDetailsImageInfoStyled,
  PhotoDetailsImageWrapperStyled,
} from './styles';

const PhotoDetails = () => {
  const { id } = useParams();

  const [photo, setPhoto] = useState<Photo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { width, height } = useMemo(() => {
    if (!photo) return { width: 0, height: 0 };

    const maxWidth = 1200;
    const width = Math.min(photo.width, maxWidth);
    const aspectRatio = photo.height / photo.width;
    const height = width * aspectRatio;

    return { width, height };
  }, [photo]);

  useEffect(() => {
    setIsLoading(true);
    fetchPhotoById(Number(id)).then(setPhoto).finally(() => setIsLoading(false));
  }, [id]);

  return <>
    <PhotoDetailsHeaderStyled>
      <BackButtonStyled>
        <Link to="/">Go Back</Link>
      </BackButtonStyled>
    </PhotoDetailsHeaderStyled>
    {isLoading ? (
      <Loader />
    ) : photo ? (
      <PhotoDetailsContainerStyled>
        <PhotoDetailsStyled>
          <PhotoDetailsImageInfoStyled>
            <PhotoDetailsInfoStyled>
              <p><b>Author:</b> {photo.photographer}</p>
              <p><b>Resolution:</b> {photo.width} x {photo.height}</p>
              {photo.alt && <p><b>Description:</b> {photo.alt}</p>}
            </PhotoDetailsInfoStyled>
          </PhotoDetailsImageInfoStyled>
          <PhotoDetailsImageWrapperStyled width={width} height={height}>
            <picture>
              <source media="(min-width: 768px)" srcSet={photo.src.original} />
              <source media="(max-width: 590px)" srcSet={photo.src.medium} />
              <img src={photo.src.original} alt={photo.alt || ""} />
            </picture>
          </PhotoDetailsImageWrapperStyled>
        </PhotoDetailsStyled>
      </PhotoDetailsContainerStyled>
    ) : (
      <NoResult />
    )}
  </>;
};

PhotoDetails.displayName = 'PhotoDetails';

export default PhotoDetails;
import React, { FC, useEffect, useState } from 'react';
import { MasonryColumnStyled } from './styles';
import { MasonryItem } from '../MasonryItem';
import { Photo } from 'pexels';
import { masonryColumnWidth } from '../../../constants';
import { PhotoWithTop } from '../../../types';

type MasonryColumnProps = {
  photos: Array<PhotoWithTop>;
  height: number;
  masonryRef: React.RefObject<HTMLDivElement | null>;
}

const getVisiblePhotosCount = (photos: Array<Photo>) => {
  const viewportHeight = window.innerHeight;
  let currHeight = 0;
  let visiblePhotosCount = 0;
  for(const photo of photos) {
    if(viewportHeight > currHeight) {
      visiblePhotosCount += 1;
      currHeight += photo.height;
      continue
    }
    currHeight += photo.height;
    visiblePhotosCount += 1;
    break
  }

  return visiblePhotosCount;
}

export const MasonryColumn: FC<MasonryColumnProps> = ({photos, height, masonryRef}) => {
  const [visiblePhotos, setVisiblePhotos] = useState<Array<PhotoWithTop>>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);


  useEffect(() => {
    const masonryContainer = masonryRef.current;
    const threshold = 100;
    const handleScroll = (e) => {
      requestAnimationFrame(() => {
        const firstPhoto = visiblePhotos[0];
        const lastPhoto = visiblePhotos[visiblePhotos.length - 1];

        if (e.target.scrollTop - threshold > firstPhoto.top + firstPhoto.height) {
          setStartIndex((prevState) => {
            return prevState + 1
          })
        }

        if (e.target.scrollTop < firstPhoto.top + threshold) {
          setStartIndex((prevState) => {
            if (prevState > 0) {
              return prevState - 1
            }
            return prevState
          })
        }

        if (e.target.scrollTop + e.target.clientHeight + threshold > lastPhoto.top + lastPhoto.height) {
          setEndIndex((prevState) => {
            if (prevState < photos.length) {
              return prevState + 1
            }
            return prevState
          })
        }

        if (e.target.scrollTop + e.target.clientHeight + threshold < lastPhoto.top) {
          setEndIndex((prevState) => {
            return prevState - 1
          })
        }
      })
    }

    if (masonryContainer) {
      masonryContainer.addEventListener('scroll', handleScroll)
    }

    return () => {
      masonryContainer.removeEventListener('scroll', handleScroll)
    }
  }, [masonryRef, visiblePhotos])

  useEffect(() => {
    const visiblePhotosCount = getVisiblePhotosCount(photos);
    setEndIndex(visiblePhotosCount - 1)
  }, []);

  useEffect(() => {
    setVisiblePhotos(photos.slice(startIndex, endIndex + 1));
  }, [startIndex, endIndex]);

  return <MasonryColumnStyled width={masonryColumnWidth} height={height}>
    {
      visiblePhotos.map((photo) => <MasonryItem src={photo.src} id={photo.id} alt={photo.alt || ""} width={masonryColumnWidth} height={photo.height} top={photo.top} key={photo.id}/>)
    }
  </MasonryColumnStyled>
}
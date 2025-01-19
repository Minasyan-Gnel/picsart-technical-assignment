import React, { FC, useEffect, useState, useRef } from 'react';
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

export const MasonryColumn: FC<MasonryColumnProps> = ({photos, height}) => {
  const [visiblePhotos, setVisiblePhotos] = useState<Array<PhotoWithTop>>([]);

  const startIndexRef = useRef<number>(0);
  const endIndexRef = useRef<number>(0);

  useEffect(() => {
    const threshold = 100;
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const firstPhoto = visiblePhotos[0];
        const lastPhoto = visiblePhotos[visiblePhotos.length - 1];
        let nextStartIndex = startIndexRef.current;
        let nextEndIndex = endIndexRef.current;

        if (window.pageYOffset - threshold > firstPhoto.top + firstPhoto.height) {
          nextStartIndex += 1
        }

        if (window.pageYOffset < firstPhoto.top + threshold) {
          if (nextStartIndex > 0) {
            nextStartIndex -= 1
          }
        }

        if (window.pageYOffset + document.documentElement.clientHeight + threshold > lastPhoto.top + lastPhoto.height) {
          if (nextEndIndex < photos.length) {
            nextEndIndex += 1
          }
        }

        if (window.pageYOffset + document.documentElement.clientHeight + threshold < lastPhoto.top) {
          nextEndIndex -= 1
        }

        setVisiblePhotos((prevState) => {
          if ((nextStartIndex !== startIndexRef.current || nextEndIndex !== endIndexRef.current)) {
            startIndexRef.current = nextStartIndex;
            endIndexRef.current = nextEndIndex;
            return photos.slice(nextStartIndex, nextEndIndex)
          }
          return prevState;
        });
      })
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [visiblePhotos])

  useEffect(() => {
    const startIndex = photos.findIndex((photo) => {
      return window.pageYOffset <= photo.top + photo.height
    })

    const endIndex = photos.findIndex((photo) => {
      return window.pageYOffset + window.innerHeight <= photo.top
    })
    
    setVisiblePhotos(photos.slice(startIndex, endIndex))
    startIndexRef.current = startIndex;
    endIndexRef.current = endIndex;
  }, [photos])

  return <MasonryColumnStyled style={{ height }}>
    {
      visiblePhotos.map((photo) => <MasonryItem src={photo.src} id={photo.id} alt={photo.alt || ""} width={masonryColumnWidth} height={photo.height} top={photo.top} key={photo.id}/>)
    }
  </MasonryColumnStyled>
}
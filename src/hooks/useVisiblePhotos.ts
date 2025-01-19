import { useEffect, useRef, useState } from "react";

import { PhotoWithTop } from "../types";

export const useVisiblePhotos = (photos: Array<PhotoWithTop>) => {
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
          nextStartIndex += 1;
        }

        if (window.pageYOffset < firstPhoto.top + threshold) {
          if (nextStartIndex > 0) {
            nextStartIndex -= 1;
          }
        }

        if (window.pageYOffset + document.documentElement.clientHeight + threshold > lastPhoto.top + lastPhoto.height) {
          if (nextEndIndex < photos.length) {
            nextEndIndex += 1;
          }
        }

        if (window.pageYOffset + document.documentElement.clientHeight + threshold < lastPhoto.top) {
          nextEndIndex -= 1;
        }

        setVisiblePhotos((prevState) => {
          if ((nextStartIndex !== startIndexRef.current || nextEndIndex !== endIndexRef.current)) {
            startIndexRef.current = nextStartIndex;
            endIndexRef.current = nextEndIndex;
            return photos.slice(nextStartIndex, nextEndIndex);
          }
          return prevState;
        });
      });
    };

    window.addEventListener('scroll', handleScroll); 

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visiblePhotos, photos]);

  useEffect(() => {
    const startIndex = photos.findIndex((photo) => window.pageYOffset <= photo.top + photo.height);

    const endIndex = photos.findIndex((photo) => window.pageYOffset + window.innerHeight <= photo.top);
    
    setVisiblePhotos(photos.slice(startIndex, endIndex));
    startIndexRef.current = startIndex;
    endIndexRef.current = endIndex;
  }, [photos]);

  return {visiblePhotos};
};
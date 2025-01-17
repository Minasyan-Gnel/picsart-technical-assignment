import { useEffect, useState } from 'react';
import { getPhotos } from '../api';
import { Photo } from 'pexels';

const arrangePhotosInColumns = (images: Photo[], columnCount: number) => {
  const columns = Array.from<Photo, Photo[]>({ length: columnCount }, () => []);

  images.forEach((image, index) => {
    columns[index % columnCount].push(image);
  });

  return columns;
};

export const useColumnsWithPhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [columnCount, setColumnCount] = useState(0);
  const [columns, setColumns] = useState<Photo[][]>([]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      switch (true) {
        case width > 1200:
          setColumnCount(6);
          break;
        case width > 800:
          setColumnCount(4);
          break;
        case width > 600:
          setColumnCount(3);
          break;
        default:
          setColumnCount(2);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getPhotos().then(photos => {
      setPhotos(photos);
    }).catch(error => console.error(error));
  }, [])

  useEffect(() => {
    setColumns(arrangePhotosInColumns(photos, columnCount));
  }, [columnCount, photos]);

  return { columns }
}
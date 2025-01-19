import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { getColumns } from "../utils";
import { PhotoWithTop } from "../types";
import { usePhotoStore } from "../stores";
import { MASONRY_COLUMN_WIDTH } from "../constants";

export const useGetColumns = (ref: React.RefObject<HTMLDivElement | null>) => {
  const [columns, setColumns] = useState<PhotoWithTop[][]>([]);
  const [columnsHeights, setColumnsHeights] = useState<Array<number>>([]);
  const [columnsCount, setColumnsCount] = useState(Math.round(window.innerWidth / MASONRY_COLUMN_WIDTH));

  const { photos, isLoading, getPhotos, searchPhotos } = usePhotoStore();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('q');

    if (columns.length && columnsHeights.length) {
      setColumns([]);
      setColumnsHeights([]); 
    }

    if (query) {
      searchPhotos(query);
    } else {
      getPhotos(); 
    }
    // Because this hook must be called only when query changes or in the first render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, searchPhotos, getPhotos]);
    
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setColumnsCount(Math.round(window.innerWidth / MASONRY_COLUMN_WIDTH));
    });
    
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [ref]);
    
  useEffect(() => {
    if (photos.length) {
      const {columns: newColumns, columnsHeights: newColumnsHeights} = getColumns(photos, columnsCount);
      setColumns(newColumns);
      setColumnsHeights(newColumnsHeights);
    }
  }, [columnsCount, photos]);

  return {columns, isLoading, columnsHeights};
    
};
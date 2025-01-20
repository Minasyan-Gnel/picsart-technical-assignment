import { createWithEqualityFn } from 'zustand/traditional';

import { getColumns } from '../utils';
import { Photo, PhotoWithTop } from '../types';
import { fetchPhotos, fetchSearchPhotos } from '../api';
import { MASONRY_COLUMN_WIDTH, PER_PAGE_COUNT } from '../constants';

type PhotoStore = {
  page: number;
  photos: Photo[];
  isLoading: boolean;
  columnsCount: number;
  noMorePhotos: boolean;
  columns: PhotoWithTop[][];
  columnsHeights: number[];
  getPhotos: () => Promise<void>;
  loadMore: (query?: string | null) => Promise<void>;
  redistributePhotos: (newColumnsCount: number) => void;
  searchPhotos: (query: string, page?: number) => Promise<void>;
}

export const usePhotoStore = createWithEqualityFn<PhotoStore>((set, get) => ({
  page: 1,
  photos: [],
  columns: [],
  columnsCount: 0,
  isLoading: false,
  columnsHeights: [],
  noMorePhotos: false,
  getPhotos: async () => {
    set({ isLoading: true });

    const photos = await fetchPhotos(1, PER_PAGE_COUNT);
    const {columns, columnsHeights} = getColumns(photos, Math.round(window.innerWidth / MASONRY_COLUMN_WIDTH));

    set({ photos, columns, columnsHeights, page: 1, isLoading: false });
  },
  searchPhotos: async (query) => {
    set({ isLoading: true });

    const photos = await fetchSearchPhotos(query, 1, PER_PAGE_COUNT);
    const {columns, columnsHeights} = photos.length ? getColumns(photos, Math.round(window.innerWidth / MASONRY_COLUMN_WIDTH)) : { columns: [], columnsHeights: [] };

    set({ photos, columns, columnsHeights, page: 1, isLoading: false, noMorePhotos: photos.length < PER_PAGE_COUNT });
  },
  redistributePhotos: (newColumnsCount) => {
    const { photos, columnsCount } = get();
  
    if (photos.length && columnsCount !== newColumnsCount) {
      const {columns, columnsHeights} = getColumns(photos, newColumnsCount);
      
      set({ columns, columnsHeights, columnsCount: newColumnsCount });
    }
  },
  loadMore: async (query) => {
    const { page, columns, columnsHeights, columnsCount } = get();
    const newPage = page + 1;
    const photos = query
      ? await fetchSearchPhotos(query, newPage)
      : await fetchPhotos(newPage);

    const {columns: newColumns, columnsHeights: newColumnsHeights} = getColumns(photos, columnsCount, { columns, columnsHeights });

    set((prevState) => ({
      ...prevState,
      page: newPage,
      columns: newColumns,
      columnsHeights: newColumnsHeights,
      photos: [...prevState.photos, ...photos],
      noMorePhotos: photos.length < PER_PAGE_COUNT,
    }));
  }
}));

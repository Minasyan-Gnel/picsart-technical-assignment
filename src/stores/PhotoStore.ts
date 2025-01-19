import { createWithEqualityFn } from 'zustand/traditional';

import { Photo } from '../types';
import { PER_PAGE_COUNT } from '../constants';
import { fetchPhotos, fetchSearchPhotos } from '../api';

type PhotoStore = {
  page: number;
  photos: Photo[];
  isLoading: boolean;
  noMorePhotos: boolean;
  getPhotos: () => Promise<void>;
  loadMore: (query?: string | null) => Promise<void>;
  searchPhotos: (query: string, page?: number) => Promise<void>;
}

export const usePhotoStore = createWithEqualityFn<PhotoStore>((set, get) => ({
  page: 1,
  photos: [],
  isLoading: false,
  noMorePhotos: false,
  getPhotos: async () => {
    set({ isLoading: true });
    const photos = await fetchPhotos(1, PER_PAGE_COUNT);

    set({ photos, page: 1, isLoading: false });
  },
  searchPhotos: async (query) => {
    set({ isLoading: true });
    const photos = await fetchSearchPhotos(query, 1, PER_PAGE_COUNT);

    set({ photos, page: 1, isLoading: false, noMorePhotos: photos.length < PER_PAGE_COUNT });
  },
  loadMore: async (query) => {
    const { page } = get();
    const newPage = page + 1;
    const photos = query
      ? await fetchSearchPhotos(query, newPage)
      : await fetchPhotos(newPage);

    set((prevState) => ({
      ...prevState,
      page: newPage,
      noMorePhotos: photos.length < PER_PAGE_COUNT,
      photos: [...prevState.photos, ...photos],
    }));
  }
}));

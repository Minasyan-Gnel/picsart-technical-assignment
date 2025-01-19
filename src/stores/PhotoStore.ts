
import { Photo } from '../types';
import { fetchPhotos, fetchSearchPhotos } from '../api';
import { createWithEqualityFn } from 'zustand/traditional';


type PhotoStore = {
  page: number;
  photos: Photo[];
  loadMore: () => Promise<void>;
  fetchPhotos: (page?: number, count?: number) => Promise<void>;
  searchPhotos: (query: string, page?: number, perPageCount?: number) => Promise<void>;
}

export const usePhotoStore = createWithEqualityFn<PhotoStore>((set, get) => ({
  page: 1,
  photos: [],
  fetchPhotos: async (page = 1, count = 80) => {
    const photos = await fetchPhotos(page, count);

    set({ photos });
  },
  searchPhotos: async (query: string, page = 1, perPageCount = 80) => {
    const photos = await fetchSearchPhotos(query, page, perPageCount);

    set({ photos });
  },
  loadMore: async () => {
    const { page } = get();
    const newPage = page + 1;
    const photos = await fetchPhotos(newPage);

    set((prevState) => ({
      page: newPage,
      photos: [...prevState.photos, ...photos],
    }))
  }
}));


import { Photo } from '../types';
import { fetchPhotos, fetchSearchPhotos } from '../api';
import { createWithEqualityFn } from 'zustand/traditional';


type PhotoStore = {
  page: number;
  photos: Photo[];
  loadMore: (query?: string | null) => Promise<void>;
  getPhotos: (page?: number, count?: number) => Promise<void>;
  searchPhotos: (query: string, page?: number, perPageCount?: number) => Promise<void>;
}

export const usePhotoStore = createWithEqualityFn<PhotoStore>((set, get) => ({
  page: 1,
  photos: [],
  getPhotos: async (count = 80) => {
    const photos = await fetchPhotos(1, count);

    set({ photos, page: 1 });
  },
  searchPhotos: async (query, perPageCount = 80) => {
    const photos = await fetchSearchPhotos(query, 1, perPageCount);

    set({ photos, page: 1 });
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
      photos: [...prevState.photos, ...photos],
    }))
  }
}));

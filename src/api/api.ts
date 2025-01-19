import { Photo } from "../types";
import { PEXEL_BASE_URL } from "../constants";

export const fetchPhotos = async (page = 1, perPageCount = 80): Promise<Photo[]> => {
  const res = await fetch(`${PEXEL_BASE_URL}/curated?per_page=${perPageCount}&page=${page}`, {
    headers: {
      Authorization: import.meta.env.VITE_PEXEL_API_KEY
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch photos');
  }

  const data = await res.json();
  return data.photos;
}

export const fetchPhotoById = async (id: number): Promise<Photo> => {
  const res = await fetch(`${PEXEL_BASE_URL}/photos/${id}`, {
    headers: {
      Authorization: import.meta.env.VITE_PEXEL_API_KEY
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch photo');
  }

  const data = await res.json();
  return data;
}

export const fetchSearchPhotos = async (query: string, page = 1, perPageCount = 80): Promise<Photo[]> => {
  const res = await fetch(`${PEXEL_BASE_URL}/search?query=${query}&per_page=${perPageCount}&page=${page}`, {
    headers: {
      Authorization: import.meta.env.VITE_PEXEL_API_KEY
    }
  })

  if (!res.ok) {
    throw new Error('Failed to search photos');
  }

  const data = await res.json();
  return data.photos;
}

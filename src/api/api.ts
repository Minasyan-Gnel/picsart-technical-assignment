import { PEXEL_BASE_URL } from "../constants";
import { Photo } from "../types";

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
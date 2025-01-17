import { client } from "./client";

export const getPhotos = async () => {
  const res = await client.photos.search({
    query: "Nature",
    per_page: 60,
  });

  if ('error' in res) {
    throw new Error(res.error);
  }

  return res.photos;
};

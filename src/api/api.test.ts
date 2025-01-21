import { fetchPhotos, fetchPhotoById, fetchSearchPhotos } from './api';
import { PEXEL_BASE_URL } from '../constants';

global.fetch = jest.fn();
process.env.PEXEL_API_KEY = 'test-api-key';

describe('API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchPhotos', () => {
    it('should fetch photos with correct parameters', async () => {
      const mockPhotos = { photos: [{ id: 1, url: 'test.jpg' }] };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotos,
      });

      const result = await fetchPhotos(1, 80);

      expect(global.fetch).toHaveBeenCalledWith(
        `${PEXEL_BASE_URL}/curated?per_page=80&page=1`,
        {
          headers: {
            Authorization: 'test-api-key',
          },
        }
      );
      expect(result).toEqual(mockPhotos.photos);
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchPhotos()).rejects.toThrow('Failed to fetch photos');
    });
  });

  describe('fetchPhotoById', () => {
    it('should fetch photo by id with correct parameters', async () => {
      const mockPhoto = { id: 1, url: 'test.jpg' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhoto,
      });

      const result = await fetchPhotoById(1);

      expect(global.fetch).toHaveBeenCalledWith(
        `${PEXEL_BASE_URL}/photos/1`,
        {
          headers: {
            Authorization: 'test-api-key',
          },
        }
      );
      expect(result).toEqual(mockPhoto);
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchPhotoById(1)).rejects.toThrow('Failed to fetch photo');
    });
  });

  describe('fetchSearchPhotos', () => {
    it('should fetch search photos with correct parameters', async () => {
      const mockPhotos = { photos: [{ id: 1, url: 'test.jpg' }] };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockPhotos,
      });

      const result = await fetchSearchPhotos('nature', 1, 80);

      expect(global.fetch).toHaveBeenCalledWith(
        `${PEXEL_BASE_URL}/search?query=nature&per_page=80&page=1`,
        {
          headers: {
            Authorization: 'test-api-key',
          },
        }
      );
      expect(result).toEqual(mockPhotos.photos);
    });

    it('should throw error when fetch fails', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      await expect(fetchSearchPhotos('nature')).rejects.toThrow('Failed to search photos');
    });
  });
});
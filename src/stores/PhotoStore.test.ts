import { renderHook, act } from '@testing-library/react';
import { getColumns } from '../utils';
import { usePhotoStore } from './PhotoStore';
import { fetchPhotos, fetchSearchPhotos } from '../api';
import photos from '../../__mocks__/photos.json';

jest.mock('../api');
jest.mock('../utils');

describe('usePhotoStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => usePhotoStore());

    expect(result.current.page).toBe(1);
    expect(result.current.photos).toEqual([]);
    expect(result.current.columns).toEqual([]);
    expect(result.current.columnsCount).toBe(0);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.columnsHeights).toEqual([]);
    expect(result.current.noMorePhotos).toBe(false);
  });

  it('getPhotos updates state with fetched photos and calculated columns', async () => {
    const { result } = renderHook(() => usePhotoStore());
    const mockColumns = [[photos[0]], [photos[1]]];
    const mockColumnsHeights = [1, 1];

    (fetchPhotos as jest.Mock).mockResolvedValue(photos);
    (getColumns as jest.Mock).mockReturnValue({ columns: mockColumns, columnsHeights: mockColumnsHeights });

    await act(async () => {
      await result.current.getPhotos();
    });

    expect(result.current.photos).toEqual(photos);
    expect(result.current.columns).toEqual(mockColumns);
    expect(result.current.columnsHeights).toEqual(mockColumnsHeights);
    expect(result.current.page).toBe(1);
    expect(result.current.isLoading).toBe(false);
  });

  it('searchPhotos updates state with searched photos', async () => {
    const { result } = renderHook(() => usePhotoStore());
    const mockColumns = [[photos[0]], [photos[1]]];
    const mockColumnsHeights = [1, 1];

    (fetchSearchPhotos as jest.Mock).mockResolvedValueOnce(photos).mockResolvedValueOnce([]);
    (getColumns as jest.Mock).mockReturnValue({ columns: mockColumns, columnsHeights: mockColumnsHeights });

    await act(async () => {
      await result.current.searchPhotos('query');
    });

    expect(result.current.photos).toEqual(photos);
    expect(result.current.columns).toEqual(mockColumns);
    expect(result.current.columnsHeights).toEqual(mockColumnsHeights);
    expect(result.current.page).toBe(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.noMorePhotos).toBe(false);

    await act(async () => {
      await result.current.searchPhotos('query');
    });

    expect(result.current.photos).toEqual([]);
    expect(result.current.columns).toEqual([]);
    expect(result.current.columnsHeights).toEqual([]);
    expect(result.current.page).toBe(1);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.noMorePhotos).toBe(true);
  });

  it('redistributePhotos updates columns and heights when columnsCount changes', () => {
    const { result } = renderHook(() => usePhotoStore());
    const mockColumns = [[photos[0]], [photos[1]]];
    const mockColumnsHeights = [1, 1];

    result.current.photos = photos;
    result.current.columnsCount = 2;

    (getColumns as jest.Mock).mockReturnValue({ columns: mockColumns, columnsHeights: mockColumnsHeights });

    act(() => {
      result.current.redistributePhotos(3);
    });

    expect(result.current.columns).toEqual(mockColumns);
    expect(result.current.columnsHeights).toEqual(mockColumnsHeights);
    expect(result.current.columnsCount).toBe(3);
  });

  it('loadMore appends photos and updates columns', async () => {
    const { result } = renderHook(() => usePhotoStore());
    const initialPhotos = photos.slice(0, 30);
    const newPhotos = photos.slice(30, 79);
    const mockColumns = [[initialPhotos[0]], [newPhotos[0], newPhotos[1]]];

    result.current.photos = initialPhotos;
    result.current.columnsCount = 2;
    result.current.page = 1;

    const mockColumnsHeights = [1, 2];

    (fetchPhotos as jest.Mock).mockResolvedValue(newPhotos);
    (fetchSearchPhotos as jest.Mock).mockResolvedValue(photos.slice(70, 79));
    (getColumns as jest.Mock).mockReturnValue({ columns: mockColumns, columnsHeights: mockColumnsHeights });

    await act(async () => {
      await result.current.loadMore();
    });

    expect(result.current.photos).toEqual([...initialPhotos, ...newPhotos]);
    expect(result.current.columns).toEqual(mockColumns);
    expect(result.current.columnsHeights).toEqual(mockColumnsHeights);
    expect(result.current.page).toBe(2);
    expect(result.current.noMorePhotos).toBe(true);

    await act(async () => {
      await result.current.loadMore('query');
    });

    expect(result.current.photos).toEqual([...initialPhotos, ...newPhotos, ...photos.slice(70, 79)]);
    expect(result.current.columns).toEqual(mockColumns);
    expect(result.current.columnsHeights).toEqual(mockColumnsHeights);
    expect(result.current.page).toBe(3);
    expect(result.current.noMorePhotos).toBe(true);
  });
});

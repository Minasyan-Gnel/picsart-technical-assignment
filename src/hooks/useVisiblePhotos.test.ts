import { act, renderHook } from '@testing-library/react';
import { useVisiblePhotos } from './useVisiblePhotos';
import photosWithTop from '../../__mocks__/photosWithTop.json';

describe('useVisiblePhotos', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      value: 0
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      value: 200
    });

    Object.defineProperty(document.documentElement, 'clientHeight', {
      writable: true,
      value: 200
    });
  });

  it('should initialize with visible photos based on current scroll position', () => {
    const { result } = renderHook(() => useVisiblePhotos(photosWithTop));
    
    expect(result.current.visiblePhotos).toHaveLength(3);
    expect(result.current.visiblePhotos[0].id).toBe(1);
    expect(result.current.visiblePhotos[1].id).toBe(2);
  });

  it('should update visible photos when scrolling down', () => {
    const { result } = renderHook(() => useVisiblePhotos(photosWithTop));

    act(() => {
      window.pageYOffset = 600;
      window.dispatchEvent(new Event('scroll'));
    });

    jest.runAllTimers();

    expect(result.current.visiblePhotos).toHaveLength(3);
    expect(result.current.visiblePhotos[0].id).toBe(1);
    expect(result.current.visiblePhotos[1].id).toBe(2);
  });

  it('should update visible photos when scrolling up', () => {
    window.pageYOffset = 700;
    
    const { result } = renderHook(() => useVisiblePhotos(photosWithTop));

    act(() => {
      window.pageYOffset = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    jest.runAllTimers();

    expect(result.current.visiblePhotos).toHaveLength(3);
    expect(result.current.visiblePhotos[0].id).toBe(7);
    expect(result.current.visiblePhotos[1].id).toBe(8);
  });

  it('updates visiblePhotos state based on scroll position', () => {
    const { result } = renderHook(() => useVisiblePhotos(photosWithTop));

    act(() => {
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.visiblePhotos.length).toEqual(3);

    // Simulate scrolling down
    act(() => {
      window.pageYOffset = 600;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.visiblePhotos.length).toEqual(3);

    // Simulate scrolling up
    act(() => {
      window.pageYOffset = 0;
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current.visiblePhotos.length).toEqual(3);
  });

  it('should clean up scroll event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    
    const { unmount } = renderHook(() => useVisiblePhotos(photosWithTop));
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });
});
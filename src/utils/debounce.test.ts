import { debounce } from './debounce';

it('should debounce a function', () => {
  jest.useFakeTimers();

  const fn = jest.fn();
  const debouncedFn = debounce(fn, 100);
  debouncedFn();
  debouncedFn();

  jest.runAllTimers();

  expect(fn).toHaveBeenCalledTimes(1);
});

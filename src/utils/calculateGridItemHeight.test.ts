import { calculateGridItemHeight } from './calculateGridItemHeight';

it('should return the height of the grid item', () => {
  const height = calculateGridItemHeight(100, 100);
  expect(height).toBe(300);
});

import { getColumns } from './getColumns';
import photos from '../../__mocks__/photos.json';

it('should return the columns and columns heights', () => {
  const {columns, columnsHeights} = getColumns(photos, 3);
  expect(columns.length).toBe(3);
  expect(columnsHeights.length).toBe(3);

  for (const column of columns) {
    expect(column.length).toBeGreaterThan(0);
  }

  for (const height of columnsHeights) {
    expect(height).toBeGreaterThan(0);
  }
});

it('should return the columns and columns heights with prevState', () => {
  const {columns, columnsHeights} = getColumns(photos, 3, {columns: [[], [], []], columnsHeights: [0, 0, 0]});
  expect(columns.length).toBe(3);
  expect(columnsHeights.length).toBe(3);
});
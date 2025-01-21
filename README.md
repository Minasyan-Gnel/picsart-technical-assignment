# Picsart technical assignment

## About the project

This project implements a masonry grid layout that efficiently renders images from a third-party API. By combining virtual scrolling, pagination, and lazy loading techniques, the application achieves optimal performance and responsiveness.

## Project setup

```bash
npm install
```

## Project run

```bash
npm run dev
```

## Project test

```bash
npm run test
```

## Project test coverage

```bash
npm run test:coverage
```

## Project build

```bash
npm run build
```

## Project types check

```bash
npm run types:check
```

## Project lint

```bash
npm run lint
```

## Project architecture

# Masonry Grid with Virtual Scroll and Lazy Loading

## Overview

This project implements a masonry grid layout that efficiently renders images from a third-party API. By combining virtual scrolling, pagination, and lazy loading techniques, the application achieves optimal performance and responsiveness.

## Key Features

### Masonry Grid Layout with Virtual Scroll

- **Dynamic Column Calculation**: The height and count of columns are dynamically determined based on the screen width. Images are evenly distributed across columns to ensure a balanced layout.
- **Column Calculation Details**: When the API response is received, the application calculates the number of columns based on the current screen width. Each image's height is factored into the distribution algorithm to ensure columns are visually balanced. For each image, the shortest column is identified, and the image is appended to that column. This approach ensures an even distribution of images regardless of their dimensions.
- **Column Height Management**: At the end of the calculation, two arrays are generated:
  1. **Column Array**: Contains the images assigned to each column.
  2. **Column Heights Array**: Stores the cumulative height of each column.
- **Efficient Rendering**: To optimize performance, only visible images in the viewport are rendered. A start and end index are maintained to slice the column array and create a new array containing only the visible elements. This reduces both computational overhead and the number of DOM elements.
- **Virtual Scroll Updates**: When a new chunk of data is loaded, the current column heights are used as a baseline. The new images are distributed among the columns by iterating through the dataset and appending each image to the column with the minimum height. For example, if the response contains 80 items, only 80 iterations are needed to update the column heights and distribute the images. This process ensures consistent computational complexity, even as the dataset scales.

### Pagination and Lazy Loading

- **Chunked Data Loading**: Images are loaded in chunks using pagination, reducing the initial load time and memory usage. Each API response is processed to update column heights and distribute images.
- **Page Lazy Loading**: The application pages are loaded only when navigated to, ensuring faster initial load times.

### Performance Optimization

- **State Management**: Zustand is used for state management, offering a lightweight, flexible, and efficient solution.
- **Code Optimization**: The application leverages React’s `useMemo` and `useCallback` hooks to optimize performance and minimize re-renders.
- **Custom Hooks**: Extensive use of custom hooks ensures cleaner and more maintainable code.
- **Production Build**:
  - Code splitting is utilized to load only the required JavaScript bundles.
  - Minification and Gzip compression reduce the size of production files.

## Technical Highlights

- **Virtual Scrolling**: Achieves high performance by rendering only the visible portion of the grid and preloading adjacent elements.
- **Dynamic Layout**: Adapts to different screen sizes, providing a seamless experience across devices.
- **Scalable Architecture**: The combination of pagination, lazy loading, and efficient state management ensures scalability as the dataset grows.

## How to run the project

1.  Clone the repository
2.  Install the dependencies by running `npm ci`
3.  **`IMPORTANT`**: Please create **`.env`** file in the root of the project and add the `PEXELS_API_KEY=YOUR_API_KEY` to it. The api key is not included in the repository because it is not a good practice to store it in the repository.
4.  For the development start the project by running `npm run dev`
5.  For the production build run `npm run build` (This will create a dist folder with the production build of the project. Use any package like http-server to serve the files in the dist folder to see the application running in the production mode). If you use the `http-server` package you can configure it to server gzip files so you can see all optimizations in action.

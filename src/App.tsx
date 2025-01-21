import React, { lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalStyles } from './global.styles';
import { LazyComponent } from './components/LazyComponent';

const Masonry = lazy(() => import('./components/Masonry'));
const PhotoDetails = lazy(() => import('./components/PhotoDetails'));

export const App = () => (
  <BrowserRouter>
    <GlobalStyles />
    <Routes>
      <Route 
        path="/" 
        element={
          <LazyComponent>
            <Masonry />
          </LazyComponent>
        } 
      />
      <Route 
        path="/photo/:id" 
        element={
          <LazyComponent>
            <PhotoDetails />
          </LazyComponent>
        } 
      />
    </Routes>
  </BrowserRouter>
);

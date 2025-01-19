import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalStyles } from './global.styles';
import { Masonry } from './components/Masonry';
import { PhotoDetails } from './components/PhotoDetails';

export const App = () => <BrowserRouter>
  <GlobalStyles />
  <Routes>
    <Route path="/" element={<Masonry />} />
    <Route path="/photo/:id" element={<PhotoDetails />} />
  </Routes>
</BrowserRouter>;

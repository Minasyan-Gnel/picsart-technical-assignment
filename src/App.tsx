import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GlobalStyles } from './global.styles';
import { Masonry } from './components/Masonry';

export const App = () => {
  return <BrowserRouter>
    <GlobalStyles />
    <Routes>
      <Route path="/" element={<Masonry />} />
    </Routes>
  </BrowserRouter>;
};

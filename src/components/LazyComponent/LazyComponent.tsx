import React, { Suspense } from 'react';

import { Loader } from '../Loader';

export const LazyComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Suspense fallback={<Loader />}>
    {children}
  </Suspense>
);
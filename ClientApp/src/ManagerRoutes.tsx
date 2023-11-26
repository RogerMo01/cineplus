import React from 'react';
import ManagerPage from './components/ManagerPage';
import { AppRoute } from './types/types';


const ManagerRoutes: AppRoute[] = [
  {
    index: true,
    path: '/*',
    element: <ManagerPage pathHead='' />
  }
];

export default ManagerRoutes;

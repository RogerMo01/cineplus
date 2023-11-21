import React from 'react';
import { ReactElement } from 'react'; // Importa ReactElement para las anotaciones de tipo
import { Counter } from './components/Counter';
import ManagerPage from './components/ManagerPage';

interface AppRoute {
  index?: boolean;
  path?: string;
  element: ReactElement;
}

const ManagerRoutes: AppRoute[] = [
  {
    index: true,
    path: '/*',
    element: <ManagerPage pathHead='' />
  },
  {
    path: '/counter',
    element: <Counter />
  }
];

export default ManagerRoutes;

import React from 'react';
import { ReactElement } from 'react'; // Importa ReactElement para las anotaciones de tipo
import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { Home } from './components/Home';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';
import CatalogPage from './components/CatalogPage';

interface AppRoute {
  index?: boolean;
  path?: string;
  element: ReactElement;
}

const AppRoutes: AppRoute[] = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/log-in',
    element: <LogInPage />
  },
  {
    path: '/movies',
    element: <CatalogPage />
  }
];

export default AppRoutes;

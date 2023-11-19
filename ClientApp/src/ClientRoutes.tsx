import React from 'react';
import { ReactElement } from 'react'; // Importa ReactElement para las anotaciones de tipo
import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { Home } from './components/Home';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';
import ClientPage from './components/ClientPage';

interface AppRoute {
  index?: boolean;
  path?: string;
  element: ReactElement;
}

const ClientRoutes: AppRoute[] = [
  {
    index: true,
    element: <ClientPage />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  }
];

export default ClientRoutes;

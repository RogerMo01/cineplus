import React from 'react';
import { ReactElement } from 'react'; // Importa ReactElement para las anotaciones de tipo
import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { Home } from './components/Home';
import SignUpPage from './components/SignUpPage';
import ManagerPage from './components/ManagerPage';

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
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/sign-up',
    element: <SignUpPage />
  },
  {
    path: '/manage/*',
    element: <ManagerPage pathHead='/manage' />
  }
];

export default AppRoutes;

import React from 'react';
import { ReactElement } from 'react'; // Importa ReactElement para las anotaciones de tipo
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
];

export default ClientRoutes;

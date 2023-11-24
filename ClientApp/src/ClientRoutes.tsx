import React from 'react';
import ClientPage from './components/ClientPage';
import { AppRoute } from './types/types';


const ClientRoutes = () : AppRoute[] => [
  {
    index: true,
    element: <ClientPage />
  },
];

export default ClientRoutes;

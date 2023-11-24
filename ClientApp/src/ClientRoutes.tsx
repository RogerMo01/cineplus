import React from 'react';
import ClientPage from './components/ClientPage';
import { AppRoute } from './types/types';
import ShoppingHistory from './components/ShoppingHistory';


const ClientRoutes = () : AppRoute[] => [
  {
    index: true,
    element: <ClientPage />
  },
  {
    path: '/shopping-history',
    element: <ShoppingHistory />
  }
];

export default ClientRoutes;

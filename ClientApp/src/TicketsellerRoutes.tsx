import React from 'react';
import { ReactElement } from 'react'; // Importa ReactElement para las anotaciones de tipo
import { Counter } from './components/Counter';
import TicketSellerPage from './components/TicketSellerPage';
// import TicketSellerPage from './components/TicketSellerPage';

interface AppRoute {
  index?: boolean;
  path?: string;
  element: ReactElement;
}

const TicketsellerRoutes: AppRoute[] = [
  {
    index: true,
    path: '/*',
    element: <TicketSellerPage pathHead='' />
  }
];

export default TicketsellerRoutes;

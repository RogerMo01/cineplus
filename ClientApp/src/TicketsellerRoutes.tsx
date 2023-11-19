import React from 'react';
import { ReactElement } from 'react'; // Importa ReactElement para las anotaciones de tipo
import { Counter } from './components/Counter';
import TicketSellerPage from './components/TicketSellerPage';
// import TicketSellerPage from './components/TicketSellerPage';

interface ManagerRoute {
  index?: boolean;
  path?: string;
  element: ReactElement;
}

const TicketsellerRoutes: ManagerRoute[] = [
  {
    index: true,
    path: '/*',
    element: <TicketSellerPage pathHead='' />
  },
  {
    path: '/counter',
    element: <Counter />
  }
];

export default TicketsellerRoutes;

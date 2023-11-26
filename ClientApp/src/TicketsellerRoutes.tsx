import React from 'react';
import TicketSellerPage from './components/TicketSellerPage';
import { AppRoute } from './types/types';


const TicketsellerRoutes: AppRoute[] = [
  {
    index: true,
    path: '/*',
    element: <TicketSellerPage pathHead='' />
  }
];

export default TicketsellerRoutes;

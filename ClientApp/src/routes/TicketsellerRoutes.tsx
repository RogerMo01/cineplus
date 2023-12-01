import React from 'react';
import TicketSellerPage from '../components/TicketSellerPage';


const TicketsellerRoutes = () => {
  return [
  {
    index: true,
    path: '/*',
    element: <TicketSellerPage pathHead='' />
  }
];}

export default TicketsellerRoutes;

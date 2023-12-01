import React from 'react';
import ClientPage from './components/ClientPage';
import { AppRoute } from './types/types';
import ShoppingHistory from './components/ShoppingHistory';
import MemberClient from './components/MemberClient';

const ismemberEndpoint = '/api/associate/ismember'
const infoEndpoint = '/api/associate/info'
const signUpEndpoint = '/api/associate'

const ClientRoutes = () : AppRoute[] => {
  return [
  {
    index: true,
    element: <ClientPage  />
  },
  {
    path: '/shopping-history',
    element: <ShoppingHistory  />
  },
  {
    path: '/club',
    element: <MemberClient signUpEndpoint={signUpEndpoint} ismemberEndpoint={ismemberEndpoint} infoEndpoint={infoEndpoint} />
  }
];}

export default ClientRoutes;

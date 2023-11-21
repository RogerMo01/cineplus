import React from 'react';
import { ReactElement } from 'react'; // Importa ReactElement para las anotaciones de tipo
import { Counter } from './components/Counter';
import { FetchData } from './components/FetchData';
import { Home } from './components/Home';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

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
    path: '/log-in',
    element: <LogInPage />
  },
  {
    path: '/about-us',
    element: <AboutPage />
  },
  {
    path: '/contact',
    element: <ContactPage />
  }
  
];

export default AppRoutes;

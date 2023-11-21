import React from 'react';
import { ReactElement } from 'react'; // Importa ReactElement para las anotaciones de tipo
import { Home } from './components/Home';
import SignUpPage from './components/SignUpPage';
import LogInPage from './components/LogInPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CatalogPage from './components/CatalogPage';

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
    path: '/log-in',
    element: <LogInPage />
  },
  {
    path: '/about-us',
    element: <AboutPage />
  },
  {
    path: 'sign-up',
    element: <SignUpPage />
  },
  {
    path: '/contact',
    element: <ContactPage />
  },
  {
    path: '/movies',
    element: <CatalogPage />
  }
  
];

export default AppRoutes;

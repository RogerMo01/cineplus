import React from 'react';
import { Home } from '../components/Home';
import SignUpPage from '../components/SignUpPage';
import LogInPage from '../components/LogInPage';
import AboutPage from '../components/AboutPage';
import ContactPage from '../components/ContactPage';
import CatalogPage from '../components/CatalogPage';
import LogInForm from '../components/LogInForm';


const UnknownUserRoutes = (tokenSetter: React.Dispatch<React.SetStateAction<string | null>>) => [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/log-in',
    element: <LogInPage tokenSetter={tokenSetter} />
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
    element: <CatalogPage modalContent={LogInForm} tokenSetter={tokenSetter} />
  }
  
];

export default UnknownUserRoutes;

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './Routers/routes';
import { RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import SnackBarProvider from './Contexts/SnackBarProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SnackBarProvider>
      <RouterProvider router={router} />
    </SnackBarProvider>
  </StrictMode>,
);

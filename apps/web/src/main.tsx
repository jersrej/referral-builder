import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { QueryProvider } from './app/providers/QueryProviders.tsx';
import HomePage from './pages/HomePage.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <Toaster position="top-center" richColors />
      <HomePage />
    </QueryProvider>
  </StrictMode>
);

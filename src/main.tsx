import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './app'
import { MantineProvider } from "@mantine/core";
import {BrowserRouter} from 'react-router-dom'
 // import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
<StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MantineProvider {...({  } as any)}>
        <App />
      </MantineProvider>
    </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)


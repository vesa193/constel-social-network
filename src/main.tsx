import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App.tsx';
import './index.css';
import { customTheme } from './themes/global.ts';
import { AuthProvider } from './context/AuthtContext.tsx';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            retry: false,
        },
    },
    queryCache: new QueryCache({
        onError: (error: any) =>
            new Error(`Something went wrong: ${error.message}`),
    }),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={customTheme}>
                <AuthProvider>
                    <Router>
                        <App />
                    </Router>
                </AuthProvider>
            </ThemeProvider>
            <ReactQueryDevtools position="bottom-right" />
        </QueryClientProvider>
    </React.StrictMode>
);

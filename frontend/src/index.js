import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AdminContextProvider } from './context/admin_context';
import { AuthContextProvider } from './context/auth_context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthContextProvider>
        <AdminContextProvider>
            <App />
            
        </AdminContextProvider>
    </AuthContextProvider>
);

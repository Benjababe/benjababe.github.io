import React from 'react';
import ReactDOM from 'react-dom/client';
import { MatomoProvider, createInstance } from "@jonkoops/matomo-tracker-react";
import './assets/styles/index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
const instance = createInstance({
    urlBase: "https://matomo.benjababe.duckdns.org",
    siteId: 1
});
root.render(
    <>
        <React.StrictMode>
            <MatomoProvider value={instance}>
                <App />
            </MatomoProvider>
        </React.StrictMode>
    </>
);

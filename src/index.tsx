import React from 'react';
import ReactDOM from 'react-dom/client';
// import { MatomoProvider, createInstance } from '@jonkoops/matomo-tracker-react';
import './assets/styles/index.css';
import App from './App';

import { PostHogProvider } from 'posthog-js/react';

const options = {
  api_host: process.env.REACT_APP_PUBLIC_POSTHOG_HOST,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
// const instance = createInstance({
//   urlBase: 'https://matomo.benjababe.duckdns.org',
//   siteId: 2,
// });
root.render(
  <>
    <React.StrictMode>
      {/* <MatomoProvider value={instance}>
        <App />
      </MatomoProvider> */}
      {/* <App /> */}
      <PostHogProvider
        apiKey={process.env.REACT_APP_PUBLIC_POSTHOG_KEY}
        options={options}
      >
        <App />
      </PostHogProvider>
    </React.StrictMode>
  </>,
);

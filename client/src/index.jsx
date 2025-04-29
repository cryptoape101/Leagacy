import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";
import store from '@leagacy/redux/store';
import App from './App';

import "@leagacy/styles/styles.css";
import "@leagacy/styles/rainbow-me.css";
import '@leagacy/styles/fonts.css';


const config = getDefaultConfig({
  appName: 'Leagacy',
  projectId: '896eb944d76e82e3f16b77c4b0732da7',
  chains: [base]
});

const queryClient = new QueryClient();

console.log('base: ', base);

const root = document.getElementById('root');
if (root !== null) {
  createRoot(root).render(
    <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider coolMode modalSize="compact" >
            <Provider store={store}>
              <Router
                basename="/"
                future={{ 
                  v7_startTransition: true,
                  v7_relativeSplatPath: true
                }}
              >
                <App />
              </Router>
            </Provider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
}

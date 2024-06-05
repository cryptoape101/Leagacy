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

import "./styles.css";
import "./rainbow-me.css";

const config = getDefaultConfig({
  appName: 'Leagacy',
  projectId: '896eb944d76e82e3f16b77c4b0732da7',
  chains: [base]
});

const queryClient = new QueryClient();

const root = document.getElementById('root');
if (root !== null) {
  createRoot(root).render(
    <React.StrictMode>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider coolMode modalSize="compact" >
            <Provider store={store}>
              <Router>
                <App />
              </Router>
            </Provider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
}

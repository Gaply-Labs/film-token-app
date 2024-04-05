import PropTypes from 'prop-types';
import { createWeb3Modal } from '@web3modal/wagmi/react';

import { http, createConfig, WagmiProvider } from 'wagmi';
import { cookieStorage, createStorage } from 'wagmi';

import { mainnet, sepolia } from 'wagmi/chains';
import { walletConnect, injected, coinbaseWallet } from 'wagmi/connectors';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// change theme's

const queryClient = new QueryClient();

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
if (!projectId) throw new Error('Project ID is undefined');

const metadata = {
  name: 'web3modal',
  description: 'web3modal example for me !',
  url: process.env.NEXT_PUBLIC_BASE_URL,
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

const chains = [mainnet, sepolia];

const config = createConfig({
  chains,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
    }),
  ],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  themeMode: 'dark',
});

export default function CustomConnectorProvider({ children }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

CustomConnectorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

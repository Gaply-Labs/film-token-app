import PropTypes from 'prop-types';

import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';

import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { endPoint } from '../constants';
import '@solana/wallet-adapter-react-ui/styles.css';

export default function SolonaWalletProvider({ children }) {
  const phantomWallet = new PhantomWalletAdapter();
  return (
    <ConnectionProvider endpoint={endPoint}>
      <WalletProvider wallets={[phantomWallet]} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

SolonaWalletProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

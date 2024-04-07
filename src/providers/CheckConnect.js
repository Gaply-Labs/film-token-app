import { useWallet } from '@solana/wallet-adapter-react';
import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../container/Layout/Layout';

export default function CheckConnect({ children }) {
  const { publicKey } = useWallet();

  if (publicKey) {
    return children;
  }

  return (
    <Layout>
      <div className="max-w-screen-2xl min-h-[60vh] flex items-center justify-center mx-auto w-full py-16">
        <p className="text-white text-center text-xl font-semibold">
          You are not connected to the wallet, please connect
        </p>
      </div>
    </Layout>
  );
}

CheckConnect.propTypes = {
  children: PropTypes.node.isRequired,
};

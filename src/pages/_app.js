import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });
import PropTypes from 'prop-types';
import { NextUIProvider } from '@nextui-org/react';
import CustomConnectorProvider from '../context/WalletConnect';
import '../styles/globals.css';
export default function App({ Component, pageProps }) {
  return (
    <main className={montserrat.className}>
      <CustomConnectorProvider>
        <NextUIProvider>
          <Component {...pageProps} />
        </NextUIProvider>
      </CustomConnectorProvider>
    </main>
  );
}
App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

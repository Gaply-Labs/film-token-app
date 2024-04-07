import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });
import PropTypes from 'prop-types';
import { NextUIProvider } from '@nextui-org/react';
import { wrapper } from '../redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import '../styles/globals.css';
import SolonaWalletProvider from '../providers/SolonaWalletProvider';
import MountedProvider from '../providers/MountedProvider';
import ToasterProvider from '../providers/ToasterProvider';

export default function App({ Component, ...other }) {
  const { store, props } = wrapper.useWrappedStore(other);

  return (
    <main className={montserrat.className}>
      <ReduxProvider store={store}>
        <SolonaWalletProvider>
          <MountedProvider>
            <NextUIProvider>
              <Component {...props.pageProps} />
              <ToasterProvider />
            </NextUIProvider>
          </MountedProvider>
        </SolonaWalletProvider>
      </ReduxProvider>
    </main>
  );
}
App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

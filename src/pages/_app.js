import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });
import PropTypes from 'prop-types';
import { NextUIProvider } from '@nextui-org/react';
import { wrapper } from '../redux/store';
import { Provider as ReduxProvider } from 'react-redux';
import CustomConnectorProvider from '../context/WalletConnect';
import '../styles/globals.css';
export default function App({ Component, ...other }) {
  const { store, props } = wrapper.useWrappedStore(other);

  return (
    <main className={montserrat.className}>
      <ReduxProvider store={store}>
        <CustomConnectorProvider>
          <NextUIProvider>
            <Component {...props.pageProps} />
          </NextUIProvider>
        </CustomConnectorProvider>
      </ReduxProvider>
    </main>
  );
}
App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

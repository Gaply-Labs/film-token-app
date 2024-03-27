import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({ subsets: ['latin'] });
import '../styles/globals.css';
import PropTypes from 'prop-types';
import { NextUIProvider } from '@nextui-org/react';
export default function App({ Component, pageProps }) {
  return (
    <main className={montserrat.className}>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </main>
  );
}
App.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

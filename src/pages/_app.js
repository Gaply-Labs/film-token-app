import '../styles/globals.css';
import PropTypes from 'prop-types';
import {NextUIProvider} from '@nextui-org/react'
export default function App({ Component, pageProps }) {
  return <NextUIProvider>
    <Component {...pageProps} />
  </NextUIProvider>;
}
App.propTypes = {
  Component: PropTypes.any,
  pageProps: PropTypes.any,
};

import { AppProps } from 'next/app';
import { ToastProvider } from 'react-toast-notifications';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ToastProvider>
      <Component {...pageProps} />
    </ToastProvider>
  );
}

export default MyApp;

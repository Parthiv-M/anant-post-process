import '@app/styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';

// import font
import { Inter } from '@next/font/google';

// import components
import Footer from 'components/common/Footer';
import Navbar from 'components/common/Navbar';

const inter = Inter({ subsets: ['latin'], variable: '--inter-font' })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src='https://kit.fontawesome.com/bd63cd3620.js' />
      <div className={inter.variable}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
}

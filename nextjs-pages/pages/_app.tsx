import type { AppProps } from 'next/app';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SiteHeader />
      <main>
        <Component {...pageProps} />
      </main>
      <SiteFooter />
    </>
  );
}

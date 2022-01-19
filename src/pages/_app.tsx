import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { pageview } from '../lib/gtm';
import theme from '../theme';
import '../theme/index.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview);
    return () => {
      router.events.off('routeChangeComplete', pageview);
    };
  }, [router.events]);
  return (
    <>
      <Head>
        <title>McBroken.io</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="title" content="McBroken.io" />
        <meta
          name="description"
          content="Tracking the McDonald's ice and milchshake status"
        />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://mcbroken.io/" />
        <meta name="og:title" content="McBroken.io" />
        <meta
          name="og:description"
          content="Tracking the McDonald's ice and milchshake status"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://mcbroken.io/" />
        <meta name="twitter:title" content="McBroken.io" />
        <meta
          name="twitter:description"
          content="Tracking the McDonald's ice and milchshake status"
        />
        <meta name="twitter:creator" content="paulbtw" />
      </Head>
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${process.env.NEXT_PUBLIC_GTAG}');
          `,
        }}
      />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;

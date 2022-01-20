import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
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

      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`}
      ></script>
      <Script
        id="gtag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${process.env.NEXT_PUBLIC_GTAG}');
                  `,
        }}
      ></script>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;

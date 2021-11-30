import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { pageview } from '../lib/gtm';
import theme from '../theme';

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
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GTAG}`}
      ></script>
      <script
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

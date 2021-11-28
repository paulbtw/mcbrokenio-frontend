import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import theme from '../theme';

class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://api.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css"
            rel="stylesheet"
          />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
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
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        </Head>
        <body>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTAG}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;

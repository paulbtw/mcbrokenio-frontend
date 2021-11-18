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
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;

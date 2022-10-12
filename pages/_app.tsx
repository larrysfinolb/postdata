import type { AppProps } from 'next/app';
import { MantineProvider } from '@mantine/core';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
        fontFamily: 'Source Serif Pro, Work Sans',
        colors: {
          green: ['#006854'],
          yellow: ['#FCB84C'],
        },
      }}
    >
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;

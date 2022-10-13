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
        fontFamily: 'Work Sans, Segoe UI',
        fontFamilyMonospace: 'Monaco, Courier, monospace',
        headings: { fontFamily: 'Source Serif Pro, sans-serif' },
        colors: {
          customGreen: [
            '#006854',
            '#006854',
            '#006854',
            '#006854',
            '#006854',
            '#006854',
            '#006854',
            '#006854',
            '#006854',
            '#006854',
          ],
          customYellow: ['#FCB84C'],
          customBlack: ['#3C3C3C'],
        },
      }}>
      <Component {...pageProps} />
    </MantineProvider>
  );
}

export default MyApp;

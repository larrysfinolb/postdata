import React from 'react';
import Head from 'next/head';
import { AppShell, Container } from '@mantine/core';

type Props = {
  children?: React.ReactNode;
  title?: string;
  Header?: React.ReactElement;
  widthContent?: number;
};

function Layout({ children, title = 'Postdata - Ecommerce', Header, widthContent = 1024 }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppShell header={Header}>
        <Container size={widthContent} pt={22} px={12}>
          {children}
        </Container>
      </AppShell>
    </>
  );
}

export default Layout;

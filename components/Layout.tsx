import React from 'react';
import Head from 'next/head';
import { AppShell } from '@mantine/core';

type Props = {
  children?: React.ReactNode;
  title?: string;
  Header?: React.ReactElement;
};

function Layout({ children, title = 'Postdata - Ecommerce', Header }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AppShell header={Header}>{children}</AppShell>
    </>
  );
}

export default Layout;

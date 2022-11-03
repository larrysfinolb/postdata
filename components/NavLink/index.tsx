import React from 'react';
import Link from 'next/link';
import { Anchor } from '@mantine/core';

type Props = {
  children: string;
  url: string;
};

function index({ children, url }: Props) {
  return (
    <Link href={url} passHref>
      <Anchor
        component="a"
        style={{
          color: 'white',
          fontWeight: 700,
          fontSize: '1.2rem',
        }}
      >
        {children}
      </Anchor>
    </Link>
  );
}

export default index;

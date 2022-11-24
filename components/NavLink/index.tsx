import React from 'react';
import Link from 'next/link';
import { Anchor } from '@mantine/core';

type Props = {
  children: string;
  url: string;
  blank?: boolean;
};

function index({ children, url, blank }: Props) {
  return (
    <Link href={url} passHref>
      <Anchor
        component="a"
        target={blank ? '_blank' : '_self'}
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

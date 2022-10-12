import React from 'react';
import { Group, Container, MantineTheme } from '@mantine/core';
import Header from 'components/Header';
import Link from 'components/Link';

type Props = {};

function index({}: Props) {
  return (
    <Header>
      <Group
        style={{
          height: '100%',
          width: '100%',
        }}
      >
        <Link url="#">Inicio</Link>
        <Link url="#">Libros</Link>
        <Link url="#">FAQ</Link>
      </Group>
    </Header>
  );
}

export default index;

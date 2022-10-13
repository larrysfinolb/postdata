import React from 'react';
import { UserCircle } from 'tabler-icons-react';
import { Container } from '@mantine/core';
import NavLink from 'components/NavLink';

const flexStyles: object = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '10px',
};

type Props = {};

function index({}: Props) {
  return (
    <Container
      style={{
        ...flexStyles,
        width: 'auto',
        padding: 0,
        flexShrink: 0,
      }}
    >
      <UserCircle size={32} strokeWidth={2} color={'white'} />
      <NavLink url="#">{'Iniciar sección'}</NavLink>
    </Container>
  );
}

export default index;

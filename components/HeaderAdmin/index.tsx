import React from 'react';
import { Group } from '@mantine/core';
import Header from 'components/Header';
import Link from 'components/NavLink';
import styled from '@emotion/styled';
import supabase from 'utils/supabase';
import { useRouter } from 'next/router';

const flexStyles: object = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '20px',
};

const ButtonLink = styled.button`
  border: none;
  outline: none;
  background: none;
  font-family: Work Sans, Segoe UI;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

type Props = {
  innerPadding?: number;
};

function HeaderAdmin({ innerPadding = 8 }: Props) {
  const router = useRouter();

  return (
    <Header>
      <Group
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          padding: `0 ${innerPadding}px`,
          flexWrap: 'nowrap',
        }}>
        <nav>
          <ul
            style={{
              height: '100%',
              listStyle: 'none',
              padding: 0,
              ...flexStyles,
            }}>
            <li>
              <Link url='/admin/client-dashboard'>Clientes</Link>
            </li>
            <li>
              <Link url='/admin/book-dashboard'>Libros</Link>
            </li>
            <li>
              <Link url='/admin/author-dashboard'>Autores</Link>
            </li>
            <li>
              <Link url='/admin/genre-dashboard'>Géneros</Link>
            </li>
            <li>
              <Link url='/admin/payment-dashboard'>Pagos</Link>
            </li>
            <li>
              <Link url='/admin/bank-dashboard'>Bancos</Link>
            </li>
            <li>
              <Link url='/admin/shopping-dashboard'>Compras</Link>
            </li>
            <li>
              <Link url='/admin/maintenance'>Mantenimiento</Link>
            </li>
            <li>
              <Link url='/admin/help'>Ayuda</Link>
            </li>
            <li>
              <ButtonLink
                type='button'
                onClick={async () => {
                  try {
                    const { error } = await supabase.auth.signOut();

                    if (error) throw error;

                    router.push('/admin');
                  } catch (error) {
                    console.error(error);
                  }
                }}>
                Salir
              </ButtonLink>
            </li>
          </ul>
        </nav>
      </Group>
    </Header>
  );
}

export default HeaderAdmin;

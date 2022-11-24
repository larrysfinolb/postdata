import React from 'react';
import { Group, Menu, Text } from '@mantine/core';
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
        }}
      >
        <nav style={{ width: '100%' }}>
          <ul
            style={{
              height: '100%',
              listStyle: 'none',
              padding: 0,
              ...flexStyles,
            }}
          >
            <li>
              <Link url="/admin/client-dashboard">Clientes</Link>
            </li>
            <li>
              <Link url="/admin/book-dashboard">Libros</Link>
            </li>
            <li>
              <Link url="/admin/author-dashboard">Autores</Link>
            </li>
            <li>
              <Link url="/admin/genre-dashboard">Géneros</Link>
            </li>
            <li>
              <Link url="/admin/payment-dashboard">Pagos</Link>
            </li>
            <li>
              <Link url="/admin/bank-dashboard">Bancos</Link>
            </li>
            <li>
              <Link url="/admin/shopping-dashboard">Compras</Link>
            </li>
            <li>
              <Menu>
                <Menu.Target>
                  <Text
                    variant="link"
                    style={{
                      color: 'white',
                      cursor: 'pointer',
                      fontFamily: 'Work Sans, Segoe UI',
                      fontSize: '1.2rem',
                      fontWeight: '700',
                    }}
                  >
                    Ayuda
                  </Text>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    component="a"
                    href="https://efqndplvrwsimqbfyssn.supabase.co/storage/v1/object/public/manuales/Postdata%20-%20Manual%20del%20Analista.pdf?t=2022-11-24T06%3A36%3A03.832Z"
                    target="_blank"
                  >
                    Manual del Analista
                  </Menu.Item>

                  <Menu.Item
                    component="a"
                    href="https://efqndplvrwsimqbfyssn.supabase.co/storage/v1/object/public/manuales/Postdata%20-%20Manual%20del%20Usuario.pdf?t=2022-11-24T06%3A36%3A11.161Z"
                    target="_blank"
                  >
                    Manual del Usuario
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </li>
            <li>
              <ButtonLink
                type="button"
                onClick={async () => {
                  try {
                    const { error } = await supabase.auth.signOut();

                    if (error) throw error;

                    router.push('/admin');
                  } catch (error) {
                    console.error(error);
                  }
                }}
              >
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

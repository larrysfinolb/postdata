import React from 'react';
import { UserCircle } from 'tabler-icons-react';
import { Container, Text, Menu } from '@mantine/core';
import NavLink from 'components/NavLink';
import supabase from 'utils/supabase';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import Link from 'next/link';

const flexStyles: object = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '10px',
};

type Props = {};

function Index({}: Props) {
  const router = useRouter();
  const [isLogin, setLogin] = React.useState<any>(null);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    if (user) {
      const { data: clients, error } = await supabase
        .from('clients')
        .select('*')
        .eq('email', user.email);
      if (clients) {
        setLogin(clients[0]);
      }
    } else {
      setLogin(null);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    setLogin(null);
    router.reload();
  };

  if (!isLogin) {
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
        <NavLink url="/login">{'Iniciar sección'}</NavLink>
      </Container>
    );
  }

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
      <Menu>
        <Menu.Target>
          <Text
            color="#fff"
            size={16}
            weight="bold"
            style={{ fontSmooth: 'antialiased ', cursor: 'pointer' }}
          >{`${isLogin.first_name} ${isLogin.last_name}`}</Text>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>Cuenta</Menu.Label>
          <Menu.Item>
            <Text>{`Saldo: ${isLogin.balance}pdx`}</Text>
          </Menu.Item>
          <Menu.Item>
            <Link href="/buy/balance" passHref style={{ cursor: 'pointer' }}>
              <Text>Comprar saldo</Text>
            </Link>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item>
            <Text
              style={{ cursor: 'pointer' }}
              color="red"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Text>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Container>
  );
}

export default Index;

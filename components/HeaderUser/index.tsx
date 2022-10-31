import React from 'react';
import { Group, Autocomplete, Container, MantineTheme } from '@mantine/core';
import Header from 'components/Header';
import Link from 'components/NavLink';
import { Search } from 'tabler-icons-react';
import NavProfile from 'components/NavProfile';

const flexStyles: object = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '20px',
};

type Props = {
  innerPadding?: number;
};

function index({ innerPadding = 8 }: Props) {
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
        <nav>
          <ul
            style={{
              height: '100%',
              listStyle: 'none',
              padding: 0,
              ...flexStyles,
            }}
          >
            <li>
              <Link url="/">Inicio</Link>
            </li>
            <li>
              <Link url="/books">Libros</Link>
            </li>
            <li>
              <Link url="/faq">FAQ</Link>
            </li>
          </ul>
        </nav>
        <Container
          style={{
            ...flexStyles,
            width: 'auto',
            maxWidth: '70%',
            margin: '0',
          }}
        >
          <form
            style={{
              width: '100%',
              minWidth: '400px',
            }}
          >
            <Autocomplete
              icon={<Search />}
              data={['Book1', 'Book2', 'Book3']}
              transition="fade"
              transitionDuration={80}
              transitionTimingFunction="ease"
              styles={(theme: MantineTheme) => ({
                root: {
                  width: '100%',
                  'input:focus': {
                    borderColor: theme.colors.customYellow[0],
                  },
                  'input:focus-within': {
                    borderColor: theme.colors.customYellow[0],
                  },
                },
              })}
            />
          </form>
          <NavProfile />
        </Container>
      </Group>
    </Header>
  );
}

export default index;

import React from 'react';
import { Group, Autocomplete, Container, MantineTheme } from '@mantine/core';
import Header from 'components/Header';
import Link from 'components/NavLink';
import { Search } from 'tabler-icons-react';
import NavProfile from 'components/NavProfile';
import supabase from 'utils/supabase';
import useBooks from 'hooks/useBooks';

const flexStyles: object = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  gap: '20px',
};

type Props = {
  innerPadding?: number;
  handleSearch?: any;
};

function Index({ innerPadding = 8, handleSearch }: Props) {
  const [search, setSearch] = React.useState<string>('');
  const ref = React.useRef<any>(null);
  const { books } = useBooks(search);

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
            onSubmit={(e) => {
              handleSearch(e, ref.current.value);
            }}
          >
            <Autocomplete
              icon={<Search />}
              data={books?.map((book) => book.title) || []}
              ref={ref}
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

export default Index;

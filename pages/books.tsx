import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import styled from '@emotion/styled';
import { Divider, Text, Group } from '@mantine/core';
import BookPreview from 'components/BookPreview';
import React from 'react';
import useBooks from 'hooks/useBooks';

interface Props {
  primary?: boolean;
}

const StyledSubTitle = styled.div<Props>`
  font-size: 1.2rem;
  font-weight: ${(props) => (props.primary ? 700 : 500)};
  margin-top: 40px;
`;

function Books() {
  const [search, setSearch] = React.useState<string>('');
  const { books } = useBooks(search);

  React.useEffect(() => {}, []);

  const handleSearch = (e: any, value: any) => {
    e.preventDefault();
    setSearch(value);
  };
  return (
    <Layout title="libros" Header={<Header handleSearch={handleSearch} />}>
      <Heading order={1} styles={{ textAlign: 'center' }}>
        Libros
      </Heading>

      <StyledSubTitle>Todos los libros disponibles</StyledSubTitle>
      <Divider size="sm" />
      <Group style={{ placeContent: 'center', gap: '0px' }}>
        {books?.map((book) => (
          <BookPreview key={book.id} {...book} />
        ))}
      </Group>
    </Layout>
  );
}

export default Books;

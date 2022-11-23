import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import styled from '@emotion/styled';
import { Divider, Text, Group } from '@mantine/core';
import BookPreview from 'components/BookPreview';
import React from 'react';
import useBooks from 'hooks/useBooks';
import { useRouter } from 'next/router';
import supabase from 'utils/supabase';

interface Props {
  primary?: boolean;
}

const StyledSubTitle = styled.div<Props>`
  font-size: 1.2rem;
  font-weight: ${(props) => (props.primary ? 700 : 500)};
  margin-top: 40px;
`;

function GenrePage() {
  const [books, setBooks] = React.useState<any>(null);
  const router = useRouter();
  const { gid } = router.query;

  React.useEffect(() => {
    const getBook = async () => {
      let { data: genresBooks, error } = await supabase
        .from('books_has_genres')
        .select('books_id')
        .eq('genres_id', gid);

      let { data: booksData, error: bookError } = await supabase
        .from('books')
        .select('*');

      console.log(genresBooks, booksData);

      const genresBooksFilter = genresBooks?.map((idGenre) => idGenre.books_id);

      const filterData = booksData?.filter((bookData) =>
        genresBooksFilter?.includes(bookData.id)
      );

      if (filterData) {
        setBooks(filterData);
      }
    };
    getBook();
  }, []);

  return (
    <Layout title="libros" Header={<Header />}>
      <Heading order={1} styles={{ textAlign: 'center' }}>
        Libros
      </Heading>

      <StyledSubTitle>Todos los libros disponibles</StyledSubTitle>
      <Divider size="sm" />
      {books && (
        <Group style={{ placeContent: 'center', gap: '0px' }}>
          {books?.map((book: any) => (
            <BookPreview key={book.id} {...book} />
          ))}
        </Group>
      )}
    </Layout>
  );
}

export default GenrePage;
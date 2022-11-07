import Layout from 'components/Layout';
import type { NextPage } from 'next';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import styled from '@emotion/styled';
import { Divider, Text, Group } from '@mantine/core';
import colors from 'utils/colors';
import Link from 'next/link';
import BookPreview from 'components/BookPreview';
import supabase from 'utils/supabase';
import React from 'react';

interface Props {
  primary?: boolean;
}

const StyledContainer = styled.div`
  width: 100%;
  margin-top: 30px;
`;
const ColoredText = styled.span`
  color: ${colors.green};
`;
const StyledSubTitle = styled.div<Props>`
  font-size: 1.2rem;
  font-weight: ${(props) => (props.primary ? 700 : 500)};
  margin-top: 40px;
`;
const StyledGenresText = styled.a`
  font-size: 1.2rem;
  font-weight: 500;
  margin-top: 40px;
  color: #666666;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: translateY(-2px);
    color: #222;
  }
`;

/*const fetchSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  console.log(data, error);
};*/

const Home: NextPage = () => {
  const [books, setBooks] = React.useState<Array<any> | null>([]);
  const [genres, setGenres] = React.useState<Array<any> | null>([]);

  React.useEffect(() => {
    const fetchBooks = async () => {
      let { data, error } = await supabase.from('books').select('*');

      setBooks(data);
    };
    const fetchGenres = async () => {
      let { data, error } = await supabase.from('genres').select('*');

      setGenres(data);
    };
    fetchGenres();
    fetchBooks();
  }, []);
  return (
    <Layout title="home" Header={<Header />}>
      <Heading order={1} styles={{ textAlign: 'center' }}>
        Librería Postdata
      </Heading>
      <StyledContainer>
        <Divider size="sm" />
        <Text align="center" weight="bold" color="dark" size={18} mt={35}>
          E-commerce de la librería <ColoredText>Postdata</ColoredText>, compra
          tus libros favoritos de forma <ColoredText>online</ColoredText> y pasa
          por nuestra librería a recibirlos.
        </Text>
        <StyledSubTitle primary>Géneros destacados</StyledSubTitle>
        <Divider size="sm" />
      </StyledContainer>
      <Group>
        {genres?.map((genre) => (
          <Link key={genre.name} href={`/books/genre/${genre.id}`}>
            <StyledGenresText>{genre.name}</StyledGenresText>
          </Link>
        ))}
      </Group>
      <StyledSubTitle>Libros destacados</StyledSubTitle>
      <Divider size="sm" />
      <Group style={{ placeContent: 'center', gap: '0px' }}>
        {books?.map((book) => (
          <BookPreview key={book.id} {...book} />
        ))}
      </Group>
    </Layout>
  );
};

export default Home;

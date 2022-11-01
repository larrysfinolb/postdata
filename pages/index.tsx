import Layout from 'components/Layout';
import type { NextPage } from 'next';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import styled from '@emotion/styled';
import { Divider, Text, Group } from '@mantine/core';
import colors from 'utils/colors';
import Link from 'next/link';
import BookPreview from 'components/BookPreview';

const genres = [
  'Fantasía',
  'Terror',
  'Educación',
  'Suspenso',
  'Accíon',
  'etc',
  'etc',
  'etc',
  'etc',
];

const books = [
  {
    id: 4,
    title: 'El imperio final',
    author: 'Brandon Sanderson',
    cover_url: 'https://m.media-amazon.com/images/I/81mZKTCZMaL.jpg',
    price: 200,
    copies: 2,
  },
];

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

const Home: NextPage = () => (
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
      {genres.map((genre) => (
        <Link key={genre} href={`/books/${genre}`}>
          <StyledGenresText>{genre}</StyledGenresText>
        </Link>
      ))}
    </Group>
    {genres
      .filter((genre, idx) => idx < 3)
      .map((genre) => (
        <section key={genre}>
          <StyledSubTitle>Libros destacados de {genre}</StyledSubTitle>
          <Divider size="sm" />
          {books
            .filter((book, idx) => idx < 3)
            .map((book) => (
              <BookPreview key={book.id} {...book} />
            ))}
        </section>
      ))}
  </Layout>
);

export default Home;

import React from 'react';
import {
  Grid,
  MantineTheme,
  Image,
  LoadingOverlay,
  Text,
  useMantineTheme,
  Button,
} from '@mantine/core';
import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import Paragraph from 'components/Paragraph';
import ListBadges from 'components/ListBadges';
import { useRouter } from 'next/router';
import supabase from 'utils/supabase';
import Link from 'next/link';

type Book = {
  title: string;
  author: string;
  coverUrl: string;
  sinopsis: string;
  price: number;
  genders: Array<string>;
};

function Book() {
  const [book, setBook] = React.useState<any>([]);
  const [genres, setGenres] = React.useState<any>([]);
  const [authors, setAuthors] = React.useState<any>([]);
  const [isLoading, setLoading] = React.useState(true);

  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    const getBook = async () => {
      const { data: bookData, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id);

      if (bookData) {
        //generos
        const { data: books_has_genres, error: errorBooks_has_genres } =
          await supabase
            .from('books_has_genres')
            .select('genres_id')
            .eq('books_id', bookData[0].id);

        const { data: genresData, error: errorGenres } = await supabase
          .from('genres')
          .select('*');

        const books_has_genresFilter = books_has_genres?.map(
          (idGenre) => idGenre.genres_id
        );
        const filterGenres = genresData
          ?.filter((thisGenres) =>
            books_has_genresFilter?.includes(thisGenres.id)
          )
          .map((thisGenres) => thisGenres.name);

        //autores
        const { data: books_has_authors, error: errorBooks_has_authors } =
          await supabase
            .from('books_has_authors')
            .select('authors_id')
            .eq('books_id', bookData[0].id);

        const { data: authorsData, error: errorAuthors } = await supabase
          .from('authors')
          .select('*');

        const books_has_authorsFilter = books_has_authors?.map(
          (authorsID: any) => {
            return authorsID.authors_id;
          }
        );

        const filterAuthors = authorsData
          ?.filter((thisAuthor) =>
            books_has_authorsFilter?.includes(thisAuthor.id)
          )
          .map((thisAuthor) => thisAuthor.name);

        setBook(bookData[0]);
        setGenres(filterGenres);
        setAuthors(filterAuthors);
        setLoading(false);
      }
    };
    getBook();
  }, [id]);

  const theme: MantineTheme = useMantineTheme();
  const stylesContainer: object = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  };
  const stylesImage = {
    width: '100%',
    boxShadow: '20px 20px rgba(0,0,0,.25)',
  };
  const stylesPrice = {
    fontSize: '3rem',
    fontWeight: 800,
  };
  const styleAuthor: object = {
    margin: 0,
    fontFamily: theme.headings.fontFamily,
    fontSize: '1.5rem',
    color: theme.colors.customBlack[0],
    textTransform: 'uppercase',
  };

  return (
    <Layout title="Detalles del libro" Header={<Header />}>
      {isLoading ? (
        <LoadingOverlay visible={true} overlayBlur={2} />
      ) : (
        <Grid gutter={0}>
          <Grid.Col span={5}>
            <div style={{ ...stylesContainer, alignItems: 'center' }}>
              <div style={stylesImage}>
                <Image
                  src={`${book.cover_url}`}
                  alt={`Portada del libro ${book.title}`}
                />
              </div>

              <Text style={stylesPrice}>{`${book.price} PDX`}</Text>

              <Link href={`/buy/book/${id}`} passHref>
                <Button fullWidth style={{ backgroundColor: '#FCB84C' }}>
                  Comprar
                </Button>
              </Link>
            </div>
          </Grid.Col>
          <Grid.Col span={6} offset={1}>
            <section style={{ ...stylesContainer, gap: '3rem' }}>
              <div style={stylesContainer}>
                <div>
                  <Heading order={1}>{book.title}</Heading>
                  {authors.map((author: any, index: any) => {
                    return (
                      <p key={index} style={styleAuthor}>
                        {author}
                      </p>
                    );
                  })}
                </div>
                <ListBadges>{genres}</ListBadges>
              </div>

              <article style={stylesContainer}>
                <Heading order={2} size="h3">
                  {book.title}
                </Heading>
                <Paragraph>{book.synopsis}</Paragraph>
              </article>
            </section>
          </Grid.Col>
        </Grid>
      )}
    </Layout>
  );
}

export default Book;

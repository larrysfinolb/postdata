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

const data = [
  {
    title: 'The Final Empire',
    author: 'Brandon Sanderson',
    coverUrl:
      'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1617768316l/68428._SY475_.jpg',
    sinopsis: `For a thousand years the ash fell and no flowers bloomed. For a thousand years the Skaa slaved in
    misery and lived in fear. For a thousand years the Lord Ruler, the "Sliver of Infinity," reigned
    with absolute power and ultimate terror, divinely invincible. Then, when hope was so long lost that
    not even its memory remained, a terribly scarred, heart-broken half-Skaa rediscovered it in the
    depths of the Lord Ruler's most hellish prison. Kelsier "snapped" and found in himself the powers of
    a Mistborn. A brilliant thief and natural leader, he turned his talents to the ultimate caper, with
    the Lord Ruler himself as the mark. Kelsier recruited the underworld's elite, the smartest and most
    trustworthy allomancers, each of whom shares one of his many powers, and all of whom relish a
    high-stakes challenge. Then Kelsier reveals his ultimate dream, not just the greatest heist in
    history, but the downfall of the divine despot. But even with the best criminal crew ever assembled,
    Kel's plan looks more like the ultimate long shot, until luck brings a ragged girl named Vin into
    his life. Like him, she's a half-Skaa orphan, but she's lived a much harsher life. Vin has learned
    to expect betrayal from everyone she meets. She will have to learn trust if Kel is to help her
    master powers of which she never dreamed. Brandon Sanderson, fantasy's newest master tale-spinner
    and author of the acclaimed debut Elantris, dares to turn a genre on its head by asking a simple
    question: What if the prophesied hero failed to defeat the Dark Lord? The answer will be found in
    the Misborn Trilogy, a saga of surprises that begins with the book in your hands. Fantasy will never
    be the same again`,
    price: 850,
    genders: ['Acción', 'Fantasía'],
  },
];

type Book = {
  title: string;
  author: string;
  coverUrl: string;
  sinopsis: string;
  price: number;
  genders: Array<string>;
};

function Book() {
  const [book, setBook] = React.useState(Array<Book>());

  React.useEffect(() => {
    setBook(data);
  }, []);

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
      {book.length === 0 ? (
        <LoadingOverlay visible={true} overlayBlur={2} />
      ) : (
        <Grid gutter={0}>
          <Grid.Col span={5}>
            <div style={{ ...stylesContainer, alignItems: 'center' }}>
              <div style={stylesImage}>
                <Image
                  src={`${book[0].coverUrl}`}
                  alt={`Portada del libro ${book[0].title}`}
                />
              </div>

              <Text style={stylesPrice}>{`${book[0].price} BC`}</Text>

              <Button color="yellow" type="button">
                Comprar
              </Button>
            </div>
          </Grid.Col>
          <Grid.Col span={6} offset={1}>
            <section style={{ ...stylesContainer, gap: '3rem' }}>
              <div style={stylesContainer}>
                <div>
                  <Heading order={1}>{book[0].title}</Heading>
                  <p style={styleAuthor}>{book[0].author}</p>
                </div>

                <ListBadges>{book[0].genders}</ListBadges>
              </div>

              <article style={stylesContainer}>
                <Heading order={2} size="h3">
                  {book[0].title}
                </Heading>
                <Paragraph>{book[0].sinopsis}</Paragraph>
              </article>
            </section>
          </Grid.Col>
        </Grid>
      )}
    </Layout>
  );
}

export default Book;

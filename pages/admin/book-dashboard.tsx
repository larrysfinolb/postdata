import React from 'react';
import HeaderAdmin from 'components/HeaderAdmin';
import { TextInput, Table, Title } from '@mantine/core';
import Layout from 'components/Layout';
import Section from 'components/Section';
import Container from 'components/Container';
import { useForm } from '@mantine/form';
import REGEX from 'utils/regex';
import Loader from 'components/Loader';
import BookForm from 'components/Forms/BookForm';
import { getAll } from 'utils/db';

function ClientDashboard() {
  const [load, setLoad] = React.useState(true);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [data, setData]: any = React.useState({
    books: [],
    authors: [],
    genres: [],
    books_has_authors: [],
    books_has_genres: [],
  });

  React.useEffect(() => {
    if (load) {
      const getData = async () => {
        setShowSpinner(true);

        try {
          const books: any = await getAll('books');
          if (books.error) throw books.error;
          const authors: any = await getAll('authors');
          if (authors.error) throw authors.error;
          const genres: any = await getAll('genres');
          if (genres.error) throw genres.error;
          const books_has_authors: any = await getAll('books_has_authors');
          if (books_has_authors.error) throw books_has_authors.error;
          const books_has_genres: any = await getAll('books_has_genres');
          if (books_has_genres.error) throw books_has_genres.error;

          setData({
            books: books.data,
            authors: authors.data,
            genres: genres.data,
            books_has_authors: books_has_authors.data,
            books_has_genres: books_has_genres.data,
          });
        } catch (error) {
          console.error(error);
        }

        setShowSpinner(false);
        setLoad(false);
      };

      getData();
    }
  }, [load]);

  const form = useForm({
    initialValues: {
      id: '',
      title: '',
      publication_date: new Date(),
      synopsis: '',
      language: '',
      cover_url: '',
      cover_file: {},
      authors_id: [],
      genres_id: [],
      price: 0,
      copies: 0,
      active: false,
    },

    validate: {
      title: (value) =>
        REGEX.title.test(value) ? null : 'Formato de título invalido.',
      publication_date: (value) => (value ? null : 'Selecciona una fecha.'),
      language: (value) =>
        REGEX.language.test(value) ? null : 'Formato de idioma invalido.',
      authors_id: (value) =>
        value.length > 0 ? null : 'Selecciona los autores.',
      genres_id: (value) =>
        value.length > 0 ? null : 'Selecciona los géneros',
      price: (value) => (value >= 0.001 ? null : 'Rango de precio invalido.'),
      copies: (value) => (value >= 0 ? null : 'Rango de copias invalido.'),
    },
  });

  return (
    <Layout title="Panel de Libros" Header={<HeaderAdmin />}>
      <Loader show={showSpinner} />
      <Section>
        <Title order={1} style={{ gridColumn: '1 / 3' }}>
          Panel de Libros
        </Title>
        <Container>
          <TextInput color="yellow" placeholder="imperio" label="Buscador" />
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Idioma</th>
              </tr>
            </thead>
            <tbody>
              {data.books.map((item: any) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    form.setValues({
                      id: item.id,
                      title: item.title,
                      publication_date: new Date(item.publication_date),
                      synopsis: item.synopsis,
                      language: item.language,
                      cover_url: item.cover_url,
                      authors_id: data.books_has_authors.map((b_h_a: any) => {
                        if (b_h_a.books_id === item.id) return b_h_a.authors_id;
                      }),
                      genres_id: data.books_has_genres.map((b_h_g: any) => {
                        if (b_h_g.books_id === item.id) return b_h_g.genres_id;
                      }),
                      price: item.price,
                      copies: item.copies,
                      active: item.active,
                    });
                  }}
                >
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.language}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
        <div>
          <BookForm
            data={data}
            setLoad={setLoad}
            form={form}
            setShowSpinner={setShowSpinner}
          />
        </div>
      </Section>
    </Layout>
  );
}

export default ClientDashboard;

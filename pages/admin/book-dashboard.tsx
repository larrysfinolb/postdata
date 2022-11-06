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
import useSearcher from 'hooks/useSearcher';

function ClientDashboard() {
  const [load, setLoad] = React.useState(true);
  const [showSpinner, setShowSpinner] = React.useState(false);

  const [books, setBooks]: any = React.useState([]);
  const [books_has_authors, setBooks_has_authors]: any = React.useState([]);
  const [books_has_genres, setBooks_has_genres]: any = React.useState([]);

  const { result, setSearch } = useSearcher(books, ['id', 'title', 'language']);

  React.useEffect(() => {
    if (load) {
      const getData = async () => {
        setShowSpinner(true);

        const resultBooks: any = await getAll('books');
        const resultBooks_has_authors: any = await getAll('books_has_authors');
        const resultBooks_has_genres: any = await getAll('books_has_genres');

        if (resultBooks.data) setBooks(resultBooks.data);
        if (resultBooks_has_authors.data)
          setBooks_has_authors(resultBooks_has_authors.data);
        if (resultBooks_has_genres.data)
          setBooks_has_genres(resultBooks_has_genres.data);

        setLoad(false);
        setShowSpinner(false);
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
          <TextInput
            color="yellow"
            placeholder="imperio"
            label="Buscador"
            onChange={(event) => setSearch(event.target.value)}
          />
          <Table highlightOnHover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Idioma</th>
              </tr>
            </thead>
            <tbody>
              {result.map((item: any) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    const b_h_a = books_has_authors.filter(
                      (author: any) => author.books_id == item.id
                    );
                    const b_h_g = books_has_genres.filter(
                      (genre: any) => genre.books_id == item.id
                    );

                    form.setValues({
                      id: item.id,
                      title: item.title,
                      publication_date: new Date(item.publication_date),
                      synopsis: item.synopsis,
                      language: item.language,
                      cover_url: item.cover_url,
                      authors_id: b_h_a.map((i: any) =>
                        i.authors_id.toString()
                      ),
                      genres_id: b_h_g.map((i: any) => i.genres_id.toString()),
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

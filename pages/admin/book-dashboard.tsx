import React from 'react';
import HeaderAdmin from 'components/HeaderAdmin';
import {
  TextInput,
  Button,
  Table,
  Title,
  Alert,
  Checkbox,
  NumberInput,
  Textarea,
  MultiSelect,
  Select,
} from '@mantine/core';
import Layout from 'components/Layout';
import useData from 'hooks/useData';
import Section from 'components/Section';
import Container from 'components/Container';
import { useForm } from '@mantine/form';
import REGEX from 'utils/regex';
import { DatePicker } from '@mantine/dates';
import supabase from 'utils/supabase';
import FileInput from 'components/FileInput';
import Loader from 'components/Loader';
import { getUrlFile, uploadFile } from 'utils/storage';
import { deleteInDB, getLastInsert, insertInDB, updateInDB } from 'utils/db';

function ClientDashboard() {
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [error, setError] = React.useState('');

  const { data: books, setLoad: setLoadBooks }: any = useData(
    'books',
    setShowSpinner
  );
  const { data: authors }: any = useData('authors', setShowSpinner);
  const { data: genres } = useData('genres', setShowSpinner);
  const { data: books_has_authors, setLoad: setLoadBookHasAuthors }: any =
    useData('books_has_authors', setShowSpinner);
  const { data: books_has_genres, setLoad: setLoadBooksHasGenres }: any =
    useData('books_has_genres', setShowSpinner);

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
              {books.map((item: any) => (
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
                      authors_id: books_has_authors.map((b_h_a: any) => {
                        if (b_h_a.books_id === item.id) return b_h_a.authors_id;
                      }),
                      genres_id: books_has_genres.map((b_h_g: any) => {
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
          <Button color="yellow" type="button" uppercase>
            Generar reporte
          </Button>
        </Container>
        <form
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1rf',
            gridTemplateAreas:
              '"id publicationDate" "title title" "language cover_url" "authors genres" "synopsis synopsis" "copies price" "active active" "submit reset"',
            gap: '1rem',
          }}
          onSubmit={form.onSubmit(async (values: any) => {
            let { id, authors_id, genres_id, cover_file, ...newValues } =
              values;

            if (id) {
              setShowSpinner(true);

              const resultCover: any = await uploadFile(
                'covers',
                newValues.title,
                cover_file
              );
              if (resultCover.type === 'error') setError(resultCover.error);

              newValues.cover_url = getUrlFile('covers', resultCover.data);

              const resultBook: any = await updateInDB('books', id, [
                newValues,
              ]);
              if (resultBook) setError(resultBook);

              await books_has_authors.map(async (item: any) => {
                if (item.books_id === id) {
                  const result: any = await deleteInDB(
                    'books_has_authors',
                    item.id
                  );
                  if (result) setError(result);
                }
              });
              await books_has_genres.map(async (item: any) => {
                if (item.books_id === id) {
                  const result: any = await deleteInDB(
                    'books_has_genres',
                    item.id
                  );
                  if (result) setError(result);
                }
              });

              const b_h_a = authors_id.map((item: any) => ({
                books_id: id,
                authors_id: item,
              }));
              const resultAuthors: any = await insertInDB(
                'books_has_authors',
                b_h_a
              );
              if (resultAuthors) setError(resultAuthors);

              const b_h_g = authors_id.map((item: any) => ({
                books_id: id,
                genres_id: item,
              }));
              const resultGenres: any = await insertInDB(
                'books_has_genres',
                b_h_g
              );
              if (resultGenres) setError(resultGenres);

              form.reset();
              setLoadBooks(true);
              setLoadBookHasAuthors(true);
              setLoadBooksHasGenres(true);
              setShowSpinner(false);
            } else {
              setShowSpinner(true);

              const resultCover: any = await uploadFile(
                'covers',
                newValues.title,
                cover_file
              );
              if (resultCover.type === 'error') setError(resultCover.error);

              newValues.cover_url = getUrlFile('covers', resultCover.data);

              const resultBooks: any = await insertInDB('books', [newValues]);
              if (resultBooks) setError(resultBooks);

              const resultSelect: any = await getLastInsert('books');
              if (resultSelect.type === 'error') setError(resultSelect.error);

              const b_h_a = authors_id.map((item: any) => ({
                books_id: resultSelect.data.id,
                authors_id: item,
              }));
              const resultAuthors: any = await insertInDB(
                'books_has_authors',
                b_h_a
              );
              if (resultAuthors) setError(resultAuthors);

              const b_h_g = genres_id.map((item: any) => ({
                books_id: resultSelect.data.id,
                genres_id: item,
              }));
              const resultGenres: any = await insertInDB(
                'books_has_genres',
                b_h_g
              );
              if (resultGenres) setError(resultGenres);

              form.reset();
              setLoadBooks(true);
              setLoadBookHasAuthors(true);
              setLoadBooksHasGenres(true);
              setShowSpinner(false);
            }
          })}
        >
          <TextInput
            label="ID"
            placeholder="No debes de llenar este campo."
            disabled
            style={{ gridArea: 'id' }}
            {...form.getInputProps('id')}
          />
          <DatePicker
            label="Fecha de publicación"
            withAsterisk
            style={{ gridArea: 'publicationDate' }}
            {...form.getInputProps('publication_date')}
          />
          <TextInput
            label="Título"
            placeholder="El imperio final"
            withAsterisk
            style={{ gridArea: 'title' }}
            {...form.getInputProps('title')}
          />
          <Select
            label="Idioma"
            placeholder="Selccione un idioma"
            nothingFound="No se ha encontado coincidencias"
            searchable
            withAsterisk
            data={[
              { value: 'es', label: 'Español' },
              { value: 'en', label: 'Ingles' },
            ]}
            style={{ gridArea: 'language' }}
            {...form.getInputProps('language')}
          />
          <FileInput
            inputPropsUrl={form.getInputProps('cover_url')}
            inputPropsFile={form.getInputProps('cover_file')}
            label="Portada"
            placeholder="Url de la imagen"
            title="Portada del libro"
          />
          <MultiSelect
            label="Autores"
            placeholder="Seleccione los autores"
            nothingFound="No se ha encontrado coincidencias"
            searchable
            withAsterisk
            data={authors.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))}
            style={{ gridArea: 'authors' }}
            {...form.getInputProps('authors_id')}
          />
          <MultiSelect
            label="Géneros"
            placeholder="Seleccione los géneros"
            nothingFound="No se ha encontrado coincidencias"
            searchable
            withAsterisk
            data={genres.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))}
            style={{ gridArea: 'genres' }}
            {...form.getInputProps('genres_id')}
          />
          <Textarea
            label="Sinopsis"
            placeholder="Un texto descriptivo que narre sin spoilers los acontecimientos del libro."
            minRows={5}
            style={{ gridArea: 'synopsis' }}
            {...form.getInputProps('synopsis')}
          />
          <NumberInput
            label="Copias"
            min={0}
            withAsterisk
            style={{ gridArea: 'copies' }}
            {...form.getInputProps('copies')}
          />
          <NumberInput
            label="Precio"
            min={0.01}
            step={0.01}
            precision={2}
            withAsterisk
            style={{ gridArea: 'price' }}
            {...form.getInputProps('price')}
          />
          <Checkbox
            color="yellow"
            label="Activo"
            style={{ gridArea: 'active' }}
            {...form.getInputProps('active', { type: 'checkbox' })}
          />
          <Button
            color="yellow"
            type="submit"
            uppercase
            style={{ gridArea: 'submit' }}
          >
            Confirmar
          </Button>
          <Button
            color="green"
            type="button"
            variant="outline"
            uppercase
            style={{ gridArea: 'reset' }}
            onClick={() => form.reset()}
          >
            Limpiar
          </Button>
          {error && (
            <Alert title="¡Error!" color="red" style={{ gridColumn: '1 / 3' }}>
              {error}
            </Alert>
          )}
        </form>
      </Section>
    </Layout>
  );
}

export default ClientDashboard;

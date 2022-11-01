import React from 'react';
import HeaderAdmin from 'components/HeaderAdmin';
import {
  TextInput,
  Button,
  Table,
  Title,
  LoadingOverlay,
  Alert,
  Checkbox,
  NumberInput,
  Textarea,
  MultiSelect,
  FileInput,
  Select,
} from '@mantine/core';
import Layout from 'components/Layout';
import useData from 'hooks/useData';
import Section from 'components/Section';
import Container from 'components/Container';
import { useForm } from '@mantine/form';
import REGEX from 'utils/regex';
import { DatePicker } from '@mantine/dates';
import useUpdateValues from 'hooks/useUpdateValues';
import useInsertValues from 'hooks/useInsertValues';

function ClientDashboard() {
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [error, setError] = React.useState('');

  const [publicationDate, setPublicationDate]: any = React.useState(new Date());
  const [selectAuthors, setSelectAuthors]: any = React.useState([]);
  const [selectGenres, setSelectGenres]: any = React.useState([]);

  const { data: genres } = useData('genres', setShowSpinner);
  const { data: authors } = useData('authors', setShowSpinner);
  const { data: books } = useData('books', setShowSpinner);
  const { data: books_has_authors } = useData(
    'books_has_authors',
    setShowSpinner
  );
  const { data: books_has_genres, setLoad } = useData(
    'books_has_genres',
    setShowSpinner
  );

  const form = useForm({
    initialValues: {
      id: '',
      title: '',
      synopsis: '',
      language: '',
      coverUrl: '',
      price: 0,
      copies: 0,
      active: false,
    },

    validate: {
      id: (value) => (REGEX.id.test(value) ? null : 'Formato de ID invalido.'),
      title: (value) =>
        REGEX.title.test(value) ? null : 'Formato de título invalido.',
      synopsis: (value) =>
        REGEX.synopsis.test(value) ? null : 'Formato de sinopsis invalido.',
      language: (value) =>
        REGEX.language.test(value) ? null : 'Formato de idioma invalido.',
      coverUrl: (value) => (value ? null : 'Selecciona una imagen.'),
      price: (value) => (value >= 0.001 ? null : 'Rango de precio invalido.'),
      copies: (value) => (value >= 0 ? null : 'Rango de copias invalido.'),
    },
  });

  return (
    <Layout title="Panel de Libros" Header={<HeaderAdmin />}>
      <Section>
        <LoadingOverlay
          loaderProps={{ color: 'yellow' }}
          visible={showSpinner}
          overlayBlur={2}
        />
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
                      synopsis: item.synopsis,
                      language: item.language,
                      coverUrl: item.cover_url,
                      price: item.price,
                      copies: item.copies,
                      active: item.actie,
                    });
                    setPublicationDate(new Date(item.publication_date));
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
              '"id publicationDate" "title title" "language coverUrl" "authors genres" "synopsis synopsis" "copies price" "active active" "submit reset"',
            gap: '1rem',
          }}
          onSubmit={form.onSubmit(async (values: any) => {
            if (values.id) {
              const result: any = await useUpdateValues(
                'books',
                {
                  id: values.id,
                  publication_date: publicationDate,
                  title: values.title,
                  synopsis: values.synopsis,
                  language: values.language,
                  coverUrl: values.cover_url,
                  price: values.price,
                  copies: values.copies,
                  active: values.active,
                },
                form,
                setShowSpinner,
                setLoad
              );

              if (result) setError(result);
              else {
                console.log('se actualizo');

                selectAuthors.map(async (item: any) => {});

                console.log(selectAuthors);
                console.log(selectGenres);
              }
            } else {
              const result: any = await useInsertValues(
                'books',
                {
                  publication_date: publicationDate,
                  title: values.title,
                  synopsis: values.synopsis,
                  language: values.language,
                  coverUrl: '',
                  price: values.price,
                  copies: values.copies,
                  active: values.active,
                },
                form,
                setShowSpinner,
                setLoad
              );

              if (result) setError(result);
              else {
                selectAuthors.map(async (item: any) => {
                  const result: any = await useInsertValues(
                    'books_has_authors',
                    {
                      books_id: 1,
                      authors_id: item.id,
                    },
                    form,
                    setShowSpinner,
                    setLoad
                  );
                });

                console.log(selectAuthors);
                console.log(selectGenres);
              }
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
            value={publicationDate}
            onChange={setPublicationDate}
            style={{ gridArea: 'publicationDate' }}
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
            label="Portada"
            placeholder="Seleccione una imagen"
            accept="image/png,image/jpeg"
            withAsterisk
            style={{ gridArea: 'coverUrl' }}
            {...form.getInputProps('coverUrl')}
          />
          <MultiSelect
            label="Autores"
            placeholder="Seleccione los autores"
            nothingFound="No se ha encontrado coincidencias"
            value={selectAuthors}
            onChange={setSelectAuthors}
            searchable
            withAsterisk
            data={authors.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))}
            style={{ gridArea: 'authors' }}
          />
          <MultiSelect
            label="Géneros"
            placeholder="Seleccione los géneros"
            nothingFound="No se ha encontrado coincidencias"
            value={selectGenres}
            onChange={setSelectGenres}
            searchable
            withAsterisk
            data={genres.map((item: any) => ({
              value: item.id,
              label: item.name,
            }))}
            style={{ gridArea: 'genres' }}
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
            placeholder="23"
            min={0}
            withAsterisk
            style={{ gridArea: 'copies' }}
            {...form.getInputProps('copies')}
          />
          <NumberInput
            label="Precio"
            placeholder="15"
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
            onClick={() => {
              form.reset();
              setPublicationDate(new Date());
              setSelectAuthors([]);
              setSelectGenres([]);
            }}
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

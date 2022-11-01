import {
  Alert,
  Button,
  Checkbox,
  MultiSelect,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import FileInput from 'components/FileInput';
import React from 'react';
import { deleteInDB, getLastInsert, insertInDB, updateInDB } from 'utils/db';
import { getUrlFile, uploadFile } from 'utils/storage';

type Props = {
  data: any;
  setLoad: Function;
  form: any;
  setShowSpinner: Function;
};

function BookForm({ data, setLoad, form, setShowSpinner }: Props) {
  const [error, setError] = React.useState('');

  return (
    <form
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1rf',
        gridTemplateAreas:
          '"id publication_date" "title title" "language cover_url" "authors genres" "synopsis synopsis" "copies price" "active active" "submit reset"',
        gap: '1rem',
      }}
      onSubmit={form.onSubmit(async (values: any) => {
        let { id, authors_id, genres_id, cover_file, ...newValues } = values;

        if (id) {
          setShowSpinner(true);

          const resultCover: any = await uploadFile(
            'covers',
            newValues.title,
            cover_file
          );
          if (resultCover.type === 'error') setError(resultCover.error);

          newValues.cover_url = getUrlFile('covers', resultCover.data);

          const resultBook: any = await updateInDB('books', id, [newValues]);
          if (resultBook) setError(resultBook);

          await data.books_has_authors.map(async (item: any) => {
            if (item.books_id === id) {
              const result: any = await deleteInDB(
                'books_has_authors',
                item.id
              );
              if (result) setError(result);
            }
          });
          await data.books_has_genres.map(async (item: any) => {
            if (item.books_id === id) {
              const result: any = await deleteInDB('books_has_genres', item.id);
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

          const b_h_g = genres_id.map((item: any) => ({
            books_id: id,
            genres_id: item,
          }));
          const resultGenres: any = await insertInDB('books_has_genres', b_h_g);
          if (resultGenres) setError(resultGenres);

          form.reset();
          setLoad(true);
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
          const resultGenres: any = await insertInDB('books_has_genres', b_h_g);
          if (resultGenres) setError(resultGenres);

          form.reset();
          setLoad(true);
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
        style={{ gridArea: 'publication_date' }}
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
        data={data.authors.map((item: any) => ({
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
        data={data.genres.map((item: any) => ({
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
  );
}

export default BookForm;

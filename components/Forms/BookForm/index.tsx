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
import {
  deleteInDB,
  getAll,
  getLastInsert,
  insertInDB,
  updateInDB,
} from 'utils/db';
import supabase from 'utils/supabase';

type Props = {
  setLoad: Function;
  form: any;
  setShowSpinner: Function;
};

function BookForm({ setLoad, form, setShowSpinner }: Props) {
  const [error, setError] = React.useState('');

  const [authors, setAuthors]: any = React.useState([]);
  const [genres, setGenres]: any = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      setShowSpinner(true);

      const resultAuthors = await getAll('authors');
      const resultGenres = await getAll('genres');

      if (resultAuthors.data)
        setAuthors(
          resultAuthors.data.filter((item: any) => item.active === true)
        );
      if (resultGenres.data)
        setGenres(
          resultGenres.data.filter((item: any) => item.active === true)
        );

      setShowSpinner(false);
    };

    getData();
  }, []);

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

        setShowSpinner(true);

        try {
          if (cover_file.name !== undefined) {
            const fileName = `${newValues.title}.${
              cover_file.name.split('.')[1]
            }`
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '');
            const resultCover = await supabase.storage
              .from('covers')
              .upload(fileName, cover_file, { upsert: true });
            if (resultCover.error) throw resultCover.error.message;

            const urlCover = supabase.storage
              .from('covers')
              .getPublicUrl(resultCover.data.path);
            newValues.cover_url = urlCover.data.publicUrl;
          } else {
            delete newValues.cover_url;
          }

          if (id) {
            // Delete authors of books
            const resultDeleteAuthors: any = await deleteInDB(
              'books_has_authors',
              'books_id',
              id
            );
            if (resultDeleteAuthors.error) {
              throw resultDeleteAuthors.error;
            }

            // Delete genres of books
            const resultDeleteGenres: any = await deleteInDB(
              'books_has_genres',
              'books_id',
              id
            );
            if (resultDeleteGenres.error) {
              throw resultDeleteGenres.error;
            }

            // Update book
            const resultBook: any = await updateInDB('books', id, [newValues]);
            if (resultBook) {
              throw resultBook;
            }
          } else {
            // Insert book
            const resultBooks: any = await insertInDB('books', [newValues]);
            if (resultBooks) {
              throw resultBooks;
            }

            // Get last insert
            let resultSelect: any = await supabase.from('books').select('id');
            if (resultSelect.error) throw resultSelect.error.details;
            resultSelect.data.sort((a: any, b: any) => a.id - b.id);
            id = resultSelect.data[resultSelect.data.length - 1].id;
          }
          // Insert Authors of books
          const b_h_a = authors_id.map((item: any) => ({
            books_id: id,
            authors_id: parseInt(item),
          }));
          const resultBooksHasAuthors = await supabase
            .from('books_has_authors')
            .insert(b_h_a);
          if (resultBooksHasAuthors.error) {
            throw resultBooksHasAuthors.error.details;
          }

          // Insert Genres of book
          const b_h_g = genres_id.map((item: any) => ({
            books_id: id,
            genres_id: parseInt(item),
          }));
          const resultBooksHasGenres = await supabase
            .from('books_has_genres')
            .insert(b_h_g);
          if (resultBooksHasGenres.error) {
            throw resultBooksHasGenres.error.details;
          }

          setLoad(true);
          form.reset();
        } catch (error: any) {
          console.error(error);
          setError(error);
        }

        setShowSpinner(false);
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
        placeholder="Selecciona una imagen"
        title="Portada del libro"
      />
      <MultiSelect
        label="Autores"
        placeholder="Seleccione los autores"
        nothingFound="No se ha encontrado coincidencias"
        searchable
        withAsterisk
        data={authors.map((item: any) => ({
          value: item.id.toString(),
          label: item.name.toString(),
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
          value: item.id.toString(),
          label: item.name.toString(),
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

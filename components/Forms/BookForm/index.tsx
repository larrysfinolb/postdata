import { Button, Checkbox, FileInput, MultiSelect, NumberInput, Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { DatePicker } from '@mantine/dates';
import React from 'react';
import REGEX from 'utils/regex';

type Props = {
  authors: Array<any>;
  genres: Array<any>;
};

function BookForm({ authors, genres }: Props) {
  const form = useForm({
    initialValues: {
      id: '',
      publicationDate: '',
      title: '',
      synopsis: '',
      language: '',
      coverUrl: '',
      price: '',
      copies: '',
      active: 'false',
      authors: '',
      genres: '',
    },

    validate: {
      id: value => (REGEX.id.test(value) ? null : 'Formato de ID invalido.'),
      publicationDate: value => (value ? null : 'Selecciona una fecha.'),
      title: value => (REGEX.title.test(value) ? null : 'Formato de título invalido.'),
      synopsis: value => (REGEX.synopsis.test(value) ? null : 'Formato de sinopsis invalido.'),
      language: value => (REGEX.language.test(value) ? null : 'Formato de idioma invalido.'),
      coverUrl: value => (value ? null : 'Selecciona una imagen.'),
      price: value =>
        parseFloat(value) < 0.001
          ? 'Rango de precio invalido.'
          : REGEX.price.test(value)
          ? null
          : 'Fortmato de precio invalido.',
      copies: value =>
        parseFloat(value) < 0
          ? 'Rango de copias invalido.'
          : REGEX.copies.test(value)
          ? null
          : 'Formato de copias invalido.',
      active: value => (REGEX.active.test(value) ? null : 'Formato de estado invalido.'),
      authors: value => (value.length > 0 ? null : 'Selecciona al menos un autor.'),
      genres: value => (value.length > 0 ? null : 'Selecciona al menos un género.'),
    },
  });

  return (
    <form
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1rf',
        gridTemplateAreas:
          '"id publicationDate" "title title" "language coverUrl" "authors genres" "synopsis synopsis" "copies price" "active active" "created created" "submit delete"',
        gap: '1rem',
      }}
      onSubmit={form.onSubmit(values => {})}>
      <TextInput
        label='ID'
        placeholder='No debes de llenar este campo.'
        disabled
        style={{ gridArea: 'id' }}
        {...form.getInputProps('id')}
      />
      <DatePicker
        label='Fecha de publicación'
        placeholder='Seleccione una fecha.'
        withAsterisk
        style={{ gridArea: 'publicationDate' }}
        {...form.getInputProps('publicationDate')}
      />
      <TextInput
        label='Título'
        placeholder='El imperio final'
        withAsterisk
        style={{ gridArea: 'title' }}
        {...form.getInputProps('title')}
      />
      <Select
        label='Idioma'
        placeholder='Selccione un idioma'
        nothingFound='No se ha encontado coincidencias'
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
        label='Portada'
        placeholder='Seleccione una imagen'
        accept='image/png,image/jpeg'
        withAsterisk
        style={{ gridArea: 'coverUrl' }}
        {...form.getInputProps('coverUrl')}
      />
      <MultiSelect
        label='Autores'
        placeholder='Seleccione los autores'
        nothingFound='No se ha encontrado coincidencias'
        searchable
        withAsterisk
        data={authors.map(item => ({ value: item.id, label: item.name }))}
        style={{ gridArea: 'authors' }}
        {...form.getInputProps('authors')}
      />
      <MultiSelect
        label='Géneros'
        placeholder='Seleccione los géneros'
        nothingFound='No se ha encontrado coincidencias'
        searchable
        withAsterisk
        data={genres.map(item => ({ value: item.id, label: item.name }))}
        style={{ gridArea: 'genres' }}
        {...form.getInputProps('genres')}
      />
      <Textarea
        label='Sinopsis'
        placeholder='Un texto descriptivo que narre sin spoilers los acontecimientos del libro.'
        minRows={5}
        style={{ gridArea: 'synopsis' }}
        {...form.getInputProps('synopsis')}
      />
      <NumberInput
        label='Copias'
        placeholder='23'
        min={0}
        withAsterisk
        style={{ gridArea: 'copies' }}
        {...form.getInputProps('copies')}
      />
      <NumberInput
        label='Precio'
        placeholder='15'
        min={0.001}
        step={0.001}
        precision={3}
        withAsterisk
        style={{ gridArea: 'price' }}
        {...form.getInputProps('price')}
      />
      <Checkbox color='yellow' label='Activo' style={{ gridArea: 'active' }} {...form.getInputProps('active')} />
      <DatePicker
        label='Fecha de creación'
        placeholder='No debes llenar este campo.'
        disabled
        style={{ gridArea: 'created' }}
      />
      <Button color='yellow' type='submit' uppercase style={{ gridArea: 'submit' }}>
        Confirmar
      </Button>
      <Button color='green' type='button' variant='outline' uppercase style={{ gridArea: 'delete' }}>
        Eliminar
      </Button>
    </form>
  );
}

export default BookForm;

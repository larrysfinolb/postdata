import { Button, Checkbox, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React from 'react';
import REGEX from 'utils/regex';

type Props = {};

function ShoppingForm() {
  const form = useForm({
    initialValues: {
      id: '',
      client: '',
      book: '',
      active: 'false',
    },
    validate: {
      id: (value) => (REGEX.id.test(value) ? null : 'Formato de id invalido.'),
      client: (value) =>
        REGEX.name.test(value) ? null : 'Formato de cliente invalido.',
      book: (value) =>
        REGEX.title.test(value) ? null : 'Formato de libro invalido.',
      active: (value) =>
        REGEX.active.test(value) ? null : 'Formato de estado invalido.',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {})}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateAreas:
          '"id id" "client book" "active active" "created created" "submit reset"',
        gap: '1rem',
      }}
    >
      <TextInput
        label="ID"
        placeholder="No debes de llenar este campo."
        disabled
        style={{ gridArea: 'id' }}
        {...form.getInputProps('id')}
      />
      <TextInput
        label="Cliente"
        placeholder="No debes de llenar este campo."
        withAsterisk
        disabled
        style={{ gridArea: 'client' }}
        {...form.getInputProps('client')}
      />
      <TextInput
        label="Libro"
        placeholder="No debes de llenar este campo."
        withAsterisk
        disabled
        style={{ gridArea: 'book' }}
        {...form.getInputProps('book')}
      />
      <Checkbox color="yellow" label="Active" style={{ gridArea: 'active' }} />
      <DatePicker
        label="Fecha de creación"
        placeholder="No debes de llenar este campo."
        disabled
        style={{ gridArea: 'created' }}
      />
      <Button color="yellow" type="submit" style={{ gridArea: 'submit' }}>
        Confirmar
      </Button>
      <Button
        color="green"
        variant="outline"
        type="button"
        style={{ gridArea: 'reset' }}
      >
        Limpiar
      </Button>
    </form>
  );
}

export default ShoppingForm;

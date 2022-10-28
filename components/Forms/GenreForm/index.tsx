import { Button, Checkbox, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React from 'react';
import REGEX from 'utils/regex';

function GenreForm() {
  const form = useForm({
    initialValues: {
      id: '',
      name: '',
      active: 'false',
    },
    validate: {
      id: (value) => (REGEX.id.test(value) ? null : 'Formato de ID invalido.'),
      name: (value) =>
        REGEX.fullname.test(value)
          ? null
          : 'Formato de nombre completo invalido.',
      active: (value) =>
        REGEX.active.test(value) ? null : 'Formato de estado invalido.',
    },
  });

  return (
    <form
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateAreas:
          '"id id" "name name" "active active" "created created" "submit delete"',
        gap: '1rem',
      }}
      onSubmit={form.onSubmit((values) => {})}
    >
      <TextInput
        label="ID"
        placeholder="No debes de llenar este campo."
        disabled
        style={{ gridArea: 'id' }}
        {...form.getInputProps('id')}
      />
      <TextInput
        label="Nombre"
        placeholder="Acción"
        withAsterisk
        style={{ gridArea: 'name' }}
        {...form.getInputProps('name')}
      />
      <Checkbox
        color="yellow"
        label="Activo"
        {...form.getInputProps('active')}
      />
      <DatePicker
        label="Fecha de creación"
        placeholder="No debes de llenar este campo."
        disabled
        style={{ gridArea: 'created' }}
      />
      <Button
        color="yellow"
        type="submit"
        uppercase
        style={{ gridArea: 'submit' }}
      >
        Continuar
      </Button>
      <Button
        color="green"
        variant="outline"
        type="button"
        uppercase
        style={{ gridArea: 'delete' }}
      >
        Eliminar
      </Button>
    </form>
  );
}

export default GenreForm;

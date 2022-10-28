import { Button, Checkbox, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React from 'react';
import REGEX from 'utils/regex';

type Props = {};

function AuthorForm({}: Props) {
  const form = useForm({
    initialValues: {
      id: '0',
      fullname: '',
      status: 'false',
    },
    validate: {
      id: value => (REGEX.id.test(value) ? null : 'Formato de ID invalido.'),
      fullname: value => (REGEX.fullname.test(value) ? null : 'Formato de nombre completo invalido.'),
      status: value => (REGEX.status.test(value) ? null : 'Formato de estado invalido.'),
    },
  });

  return (
    <form
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateAreas: '"id id" "fullname fullname" "status status" "created created" "submit delete"',
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
      <TextInput
        label='Nombre completo'
        placeholder='Brandon Sanderson'
        withAsterisk
        style={{ gridArea: 'fullname' }}
        {...form.getInputProps('fullname')}
      />
      <Checkbox color='yellow' label='Activo' {...form.getInputProps('status')} />
      <DatePicker
        label='Fecha de creación'
        placeholder='No debes de llenar este campo.'
        disabled
        style={{ gridArea: 'created' }}
      />
      <Button color='yellow' type='submit' uppercase style={{ gridArea: 'submit' }}>
        Continuar
      </Button>
      <Button color='green' variant='outline' type='button' uppercase style={{ gridArea: 'delete' }}>
        Eliminar
      </Button>
    </form>
  );
}

export default AuthorForm;

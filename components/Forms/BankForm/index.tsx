import { Button, Checkbox, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React from 'react';
import REGEX from 'utils/regex';

type Props = {};

function BankForm({}: Props) {
  const form = useForm({
    initialValues: {
      id: '',
      name: '',
      number: '',
      active: 'false',
    },

    validate: {
      id: (value) => (REGEX.id.test(value) ? null : 'Formato del id invalido.'),
      name: (value) =>
        REGEX.name.test(value) ? null : 'Formato del nombre invalido.',
      number: (value) =>
        REGEX.account.test(value)
          ? null
          : 'Formato de número de cuenta invalido.',
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
          '"id name" "number number" "active active" "created created" "submit reset"',
        gap: '1rem',
      }}
      onSubmit={form.onSubmit((value) => {})}
    >
      <TextInput
        label="ID"
        placeholder="No debes de llenar este campo"
        disabled
        style={{ gridArea: 'id' }}
        {...form.getInputProps('id')}
      />
      <TextInput
        label="Nombre"
        placeholder="Banesco"
        withAsterisk
        style={{ gridArea: 'name' }}
        {...form.getInputProps('name')}
      />
      <TextInput
        label="Número de cuenta"
        placeholder="00000000000000000000"
        withAsterisk
        style={{ gridArea: 'number' }}
        {...form.getInputProps('number')}
      />
      <Checkbox
        color="yellow"
        label="Activo"
        style={{ gridArea: 'active' }}
        {...form.getInputProps('active')}
      />
      <DatePicker
        label=""
        placeholder="No debes de llenar este campo"
        disabled
        style={{ gridArea: 'created' }}
      />
      <Button color="yellow" type="submit" style={{ gridArea: 'submit' }}>
        Confirmar
      </Button>
      <Button
        color="green"
        type="button"
        variant="outline"
        style={{ gridArea: 'reset' }}
      >
        Limpiar
      </Button>
    </form>
  );
}

export default BankForm;

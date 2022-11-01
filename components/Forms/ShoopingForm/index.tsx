import { Alert, Button, Checkbox, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React from 'react';
import useUpdateValues from 'hooks/useUpdateValues';

type Props = {
  form: any;
  setLoad: Function;
  setShowSpinner: Function;
};

function ShoppingForm({ form, setLoad, setShowSpinner }: Props) {
  const [error, setError] = React.useState('');

  return (
    <form
      onSubmit={form.onSubmit(async (values: any) => {
        if (values.id) {
          const result: any = await useUpdateValues(
            'authors',
            {
              id: values.id,
              name: values.name,
              active: values.active,
            },
            form,
            setShowSpinner,
            setLoad
          );

          if (result) setError(result);
        }
      })}
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
      <Checkbox
        color="yellow"
        label="Active"
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
        variant="outline"
        type="button"
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

export default ShoppingForm;

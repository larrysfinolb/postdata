import { Alert, Button, Checkbox, TextInput } from '@mantine/core';
import React from 'react';
import { insertInDB, updateInDB } from 'utils/db';

type Props = {
  form: any;
  setLoad: Function;
  setShowSpinner: Function;
};

function GenreForm({ form, setLoad, setShowSpinner }: Props) {
  const [error, setError] = React.useState('');

  return (
    <form
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateAreas: '"id id" "name name" "active active" "submit reset"',
        gap: '1rem',
      }}
      onSubmit={form.onSubmit(async (values: any) => {
        const { id, ...newValues } = values;

        setShowSpinner(true);

        if (id) {
          const result: any = await updateInDB('genres', id, newValues);
          if (result) setError(result);
        } else {
          const result: any = await insertInDB('genres', [newValues]);
          if (result) setError(result);
        }

        form.reset();
        setLoad(true);
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

export default GenreForm;

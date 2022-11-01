import { Alert, Button, Checkbox, TextInput } from '@mantine/core';
import useInsertValues from 'hooks/useInsertValues';
import useUpdateValues from 'hooks/useUpdateValues';
import React from 'react';

type Props = {
  form: any;
  setLoad: Function;
  setShowSpinner: Function;
};

function AuthorForm({ form, setLoad, setShowSpinner }: Props) {
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
        } else {
          const result: any = await useInsertValues(
            'authors',
            {
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
    >
      <TextInput
        label="ID"
        placeholder="No debes de llenar este campo."
        disabled
        style={{ gridArea: 'id' }}
        {...form.getInputProps('id')}
      />
      <TextInput
        label="Nombre completo"
        placeholder="Brandon Sanderson"
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
        Continuar
      </Button>
      <Button
        color="green"
        variant="outline"
        type="button"
        uppercase
        style={{ gridArea: 'reset' }}
        onClick={() => form.reset()}
      >
        Eliminar
      </Button>
      {error && (
        <Alert title="¡Error!" color="red" style={{ gridColumn: '1 / 3' }}>
          {error}
        </Alert>
      )}
    </form>
  );
}

export default AuthorForm;

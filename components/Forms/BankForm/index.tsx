import { Alert, Button, Checkbox, TextInput } from '@mantine/core';
import useInsertValues from 'hooks/useInsertValues';
import useUpdateValues from 'hooks/useUpdateValues';
import React from 'react';

type Props = {
  form: any;
  setLoad: Function;
  setShowSpinner: Function;
};

function BankForm({ form, setLoad, setShowSpinner }: Props) {
  const [error, setError] = React.useState('');

  return (
    <div>
      <form
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateAreas:
            '"id name" "number number" "active active" "submit reset"',
          gap: '1rem',
        }}
        onSubmit={form.onSubmit(async (values: any) => {
          if (values.id) {
            const result: any = await useUpdateValues(
              'banks',
              {
                id: values.id,
                name: values.name,
                account_number: values.number,
                active: values.active,
              },
              form,
              setShowSpinner,
              setLoad
            );

            if (result) setError(result);
          } else {
            const result: any = await useInsertValues(
              'banks',
              {
                name: values.name,
                account_number: values.number,
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
    </div>
  );
}

export default BankForm;

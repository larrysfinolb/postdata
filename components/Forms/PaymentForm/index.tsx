import {
  Alert,
  Button,
  Checkbox,
  NumberInput,
  Radio,
  TextInput,
} from '@mantine/core';
import React from 'react';
import { updateInDB } from 'utils/db';

type Props = {
  form: any;
  setLoad: Function;
  setShowSpinner: Function;
};

function PaymentForm({ form, setLoad, setShowSpinner }: Props) {
  const [status, setStatus] = React.useState('');
  const [error, setError] = React.useState('');

  return (
    <form
      onSubmit={form.onSubmit(async (values: any) => {
        const { id, ...newValues } = values;

        setShowSpinner(true);

        const result: any = updateInDB('payments', id, newValues);
        if (result) setError(result);

        form.reset();
        setLoad();
        setShowSpinner(false);
      })}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateAreas:
          '"id amount" "client bank" "voucher voucher" "status status" "active active" "submit reset"',
        gap: '1rem',
      }}
    >
      <TextInput
        label="ID"
        placeholder="Tu no debes de llenar este campo."
        disabled
        withAsterisk
        style={{ gridArea: 'id' }}
        {...form.getInputProps('id')}
      />
      <NumberInput
        label="Monto"
        placeholder="Tu no debes de llenar este campo."
        min={0.001}
        step={0.001}
        withAsterisk
        disabled
        style={{ gridArea: 'amount' }}
        {...form.getInputProps('amount')}
      />
      <TextInput
        label="Cliente"
        placeholder="Tu no debes de llenar este campo."
        withAsterisk
        disabled
        style={{ gridArea: 'client' }}
        {...form.getInputProps('client')}
      />
      <TextInput
        label="Banco"
        placeholder="Tu no debes de llenar este campo."
        withAsterisk
        disabled
        style={{ gridArea: 'bank' }}
        {...form.getInputProps('bank')}
      />
      <TextInput
        label="voucher"
        placeholder="Tu no debes de llenar este campo."
        withAsterisk
        disabled
        style={{ gridArea: 'voucher' }}
        {...form.getInputProps('voucher')}
      />
      <Radio.Group
        value={status}
        onChange={setStatus}
        style={{ gridArea: 'status' }}
      >
        <Radio checked color="yellow" value="P" label="Pendiente" />
        <Radio color="yellow" value="A" label="Aceptada" />
        <Radio color="yellow" value="R" label="Rechazada" />
      </Radio.Group>
      <Checkbox
        color="yellow"
        label="Estado"
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

export default PaymentForm;

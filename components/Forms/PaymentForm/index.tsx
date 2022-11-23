import {
  Alert,
  Button,
  Checkbox,
  NumberInput,
  Radio,
  TextInput,
} from '@mantine/core';
import FileInput from 'components/FileInput';
import React from 'react';
import pdxtobs from 'utils/pdxTObs';
import supabase from 'utils/supabase';

type Props = {
  form: any;
  setLoad: Function;
  setShowSpinner: Function;
};

function PaymentForm({ form, setLoad, setShowSpinner }: Props) {
  const [error, setError] = React.useState('');

  return (
    <form
      onSubmit={form.onSubmit(async (values: any) => {
        const { id, status, statusInitial, amount, client, ...newValues } =
          values;

        setShowSpinner(true);

        if (statusInitial === 'P') {
          if (status === 'A') {
            let { data: dataGetBalance, error: errorGetBalance }: any =
              await supabase
                .from('clients')
                .select('balance')
                .eq('email', client);
            if (errorGetBalance) setError(errorGetBalance.message);

            let { error: errorUpdateBalance } = await supabase
              .from('clients')
              .update({ balance: dataGetBalance[0].balance + amount / pdxtobs })
              .eq('email', client);
            if (errorUpdateBalance) setError(errorUpdateBalance.message);
          }

          let { error: errorUpdatePayment } = await supabase
            .from('payments')
            .update({ status, active: newValues.active })
            .eq('id', id);
          if (errorUpdatePayment) setError(errorUpdatePayment.message);
        } else {
          let { error: errorUpdatePayment } = await supabase
            .from('payments')
            .update({ active: newValues.active })
            .eq('id', id);
          if (errorUpdatePayment) setError(errorUpdatePayment.message);
        }

        form.reset();
        setLoad(true);
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
      <FileInput
        withAsterisk
        readonly
        inputPropsUrl={form.getInputProps('voucher')}
        label="Comprobante"
        title="Comprobante del pago"
        style={{ gridArea: 'voucher' }}
      />
      <Radio.Group
        name="status"
        label="Estatus"
        withAsterisk
        style={{ gridArea: 'status' }}
        {...form.getInputProps('status')}
      >
        <Radio
          color="yellow"
          value="P"
          label="Pendiente"
          disabled={form.getInputProps('status').value !== 'P'}
        />
        <Radio
          color="yellow"
          value="A"
          label="Aceptada"
          disabled={form.getInputProps('status').value !== 'P'}
        />
        <Radio
          color="yellow"
          value="R"
          label="Rechazada"
          disabled={form.getInputProps('status').value !== 'P'}
        />
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

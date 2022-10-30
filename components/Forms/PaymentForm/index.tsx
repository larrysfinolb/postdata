import { Button, Checkbox, NumberInput, Radio, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import React from 'react';
import REGEX from 'utils/regex';

function PaymentForm() {
  const [status, setStatus] = React.useState('');

  const form = useForm({
    initialValues: {
      id: '',
      amount: '',
      client: '',
      bank: '',
      voucher: '',
      active: 'false',
    },

    validate: {
      id: (value) => (REGEX.id.test(value) ? null : 'Formato del id invalido.'),
      amount: (value) =>
        REGEX.price.test(value) ? null : 'Formato del monto invalido.',
      client: (value) =>
        REGEX.name.test(value) ? null : 'Formato del cliente invalido.',
      bank: (value) =>
        REGEX.name.test(value) ? null : 'Formato del banco invalido.',
      voucher: (value) => (value ? null : 'Selecciona el comprobante de pago'),
      active: (value) =>
        REGEX.active.test(value) ? null : 'Formato del estado invalido.',
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {})}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateAreas:
          '"id amount" "client bank" "voucher voucher" "status status" "active active" "created created" "submit submit"',
        gap: '1rem',
      }}
    >
      <TextInput
        label="ID"
        placeholder="Tu no debes de llenar este campo."
        disabled
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
        {...form.getInputProps('active')}
      />
      <DatePicker
        label="Fecha de creación"
        placeholder="Tu no debes de llenar este campo."
        withAsterisk
        disabled
        style={{ gridArea: 'created' }}
      />
      <Button color="yellow" type="submit" style={{ gridArea: 'submit' }}>
        Confirmar
      </Button>
    </form>
  );
}

export default PaymentForm;

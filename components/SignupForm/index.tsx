import React from 'react';
import { useForm } from '@mantine/form';
import { PasswordInput, Button, Checkbox, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

type Props = {};

function Index({}: Props) {
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      password: '',
      checkPassword: '',
      email: '',
      birthday: '',
      gender: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Correo no valido'),
    },
  });
  return (
    <form
      onSubmit={form.onSubmit((values) => console.log(values))}
      style={{
        display: 'grid',
        width: '100%',
        gridTemplateAreas: `
                    'firstname lastname'
                    'email email'
                    'pass checkpass'
                    'birthday gender'
                    'termsOfService termsOfService'
                    'acceptTermsOfService acceptTermsOfService'
                    'isRegister submit'
                `,
        gap: '15px',
        placeContent: 'center',
        placeItems: 'stretch',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      <TextInput
        withAsterisk
        label="Nombre"
        placeholder="Alejandro"
        {...form.getInputProps('firstname')}
        style={{ gridArea: 'firstname' }}
      />
      <TextInput
        withAsterisk
        label="Apellido"
        placeholder="Sanchez"
        {...form.getInputProps('lastname')}
        style={{ gridArea: 'lastname' }}
      />
      <TextInput
        withAsterisk
        label="Correo"
        placeholder="tucorreo@email.com"
        {...form.getInputProps('email')}
        style={{ gridArea: 'email' }}
      />
      <PasswordInput
        withAsterisk
        label={'Contraseña'}
        placeholder="abc123"
        {...form.getInputProps('password')}
        style={{ gridArea: 'pass' }}
      />
      <PasswordInput
        withAsterisk
        label={'Confirmar contraseña'}
        placeholder="abc123"
        {...form.getInputProps('checkPassword')}
        style={{ gridArea: 'checkpass' }}
      />
      <DatePicker
        withAsterisk
        label={'Fecha de nacimiento'}
        placeholder="Elije una fecha"
        {...form.getInputProps('birthday')}
        style={{ gridArea: 'birthday' }}
      />

      {/*<Checkbox
        mt="md"
        label="I agree to sell my privacy"
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
      />*/}

      <Button style={{ gridArea: 'isRegister' }}>Ya estas registrado</Button>
      <Button type="submit" style={{ gridArea: 'submit' }}>
        Submit
      </Button>
    </form>
  );
}

export default Index;

import React from 'react';
import { Button, Text, Box, Container, PasswordInput } from '@mantine/core';
import supabase from 'utils/supabase';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/router';

type Props = {};

function NewPassword({}: Props) {
  const router = useRouter();

  React.useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event == 'PASSWORD_RECOVERY') {
        const newPassword: any = prompt(
          'What would you like your new password to be?'
        );
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (data) alert('Password updated successfully!');
        if (error) alert('There was an error updating your password.');
      }
    });
  }, []);

  const form = useForm({
    initialValues: {
      password: '',
      checkpassword: '',
    },

    validate: {
      password: (value) =>
        value.length >= 6
          ? null
          : 'La contraseña debe de contener al menos 6 caracteres',

      checkpassword: (value, object) =>
        value === object.password ? null : 'La contraseña no coincide',
    },
  });
  return (
    <Container>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          width: '600px',
          margin: 'auto',
          marginTop: '20vh',
        }}
        onSubmit={form.onSubmit(async (values) => {
          const { data, error } = await supabase.auth.updateUser({
            password: values.password,
          });
          if (error) {
            alert(error);
          } else {
            router.push('/login');
          }
        })}
      >
        <Text>Escribe tu nueva contraseña</Text>
        <PasswordInput
          style={{ width: '400px' }}
          label="Nueva contraseña"
          {...form.getInputProps('password')}
          required
        />
        <PasswordInput
          style={{ width: '400px' }}
          label="Confirmar contraseña"
          {...form.getInputProps('checkpassword')}
          required
        />
        <Button
          type="submit"
          style={{ backgroundColor: '#FCB84C', width: '400px' }}
        >
          Enviar
        </Button>
      </form>
    </Container>
  );
}

export default NewPassword;

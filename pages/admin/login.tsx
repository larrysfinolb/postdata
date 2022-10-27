import styled from '@emotion/styled';
import { Alert, Button, Modal, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Layout from 'components/Layout';
import Paragraph from 'components/Paragraph';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import supabase from 'utils/supabase';

const ResetPassword = styled.button`
  outline: none;
  border: none;
  background: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

function login() {
  const router = useRouter();
  const [InvalidCredentials, setInvalidCredentials] = React.useState(false);
  const [opened, setOpened] = React.useState(false);

  React.useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;
        if (data) router.push('/admin/book-dashboard');
      } catch (error) {
        console.error(error);
      }
    };

    getSession();
  }, []);

  const formLogin = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: value =>
        /^[a-zA-Z0-9\-\*]{1,64}@[a-zA-Z0-9\-\.]{1,255}$/.test(value) ? null : 'Formato de correo invalido.',
      password: value => (/^.+$/.test(value) ? null : 'Formato de correo invalido.'),
    },
  });
  const formResetPassword = useForm({
    initialValues: {
      email: '',
    },

    validate: {
      email: value =>
        /^[a-zA-Z0-9\-\*]{1,64}@[a-zA-Z0-9\-\.]{1,255}$/.test(value) ? null : 'Formato de correo invalido.',
    },
  });

  return (
    <Layout title='Inicia sesión - Administrador'>
      <Modal opened={opened} onClose={() => setOpened(false)} title='Resetea tu contraseña' centered>
        <form
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          onSubmit={formResetPassword.onSubmit(async values => {
            try {
              const { data, error } = await supabase.auth.resetPasswordForEmail(values.email, {
                redirectTo: 'http://localhost:3000/reset-password',
              });

              if (error) throw error;
              if (data) setOpened(false);
            } catch (error) {
              console.error(error);
            }
          })}>
          <TextInput
            placeholder='ejemplo@ejemplo.com'
            label='Correo eléctronico'
            withAsterisk
            style={{ gridArea: 'email' }}
            {...formResetPassword.getInputProps('email')}
          />
          <Button type='submit' fullWidth color='green'>
            Enviar link al correo.
          </Button>
        </form>
      </Modal>
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <picture>
          <img
            src='https://efqndplvrwsimqbfyssn.supabase.co/storage/v1/object/sign/images/admin-login-lottie.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYWRtaW4tbG9naW4tbG90dGllLnN2ZyIsImlhdCI6MTY2NjcxNDAxNSwiZXhwIjoxOTgyMDc0MDE1fQ.0d3A_8FzsCoSvWIXa0_VKf_wVw0hG6CfXB6bQf6asdI'
            alt='Imagen Lottie que acompaña el inicio de sesión del panel de administrador'
          />
        </picture>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <Title order={1} align='center'>
              Inicia sesión
            </Title>
            <Paragraph align='center'>
              Este es el módulo de administradores y solo podras acceder a sus funcionalidades si posees las
              credenciales.
            </Paragraph>
          </div>
          <form
            onSubmit={formLogin.onSubmit(async values => {
              try {
                const { data, error } = await supabase.auth.signInWithPassword({
                  email: values.email,
                  password: values.password,
                });

                if (error) throw error;
                if (data) throw router.push('/admin/book-dashboard');
              } catch (error) {
                setInvalidCredentials(true);
              }
            })}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateAreas: "'email email' 'password password' 'submit cancel'",
              gap: '1rem',
            }}>
            <TextInput
              placeholder='ejemplo@ejemplo.com'
              label='Correo eléctronico'
              withAsterisk
              style={{ gridArea: 'email' }}
              {...formLogin.getInputProps('email')}
            />
            <PasswordInput
              placeholder='Contraseña super segura'
              label='Contraseña'
              withAsterisk
              style={{ gridArea: 'password' }}
              {...formLogin.getInputProps('password')}
            />
            <Button type='submit' style={{ gridArea: 'submit' }} color='green'>
              Inciar sesión
            </Button>
            <Link href='/index'>
              <Button component='a' variant='outline' style={{ gridArea: 'cancel' }} color='yellow'>
                Regresar como cliente
              </Button>
            </Link>
            <ResetPassword type='button' onClick={() => setOpened(true)}>
              ¿Has olvidado tu contraseña?
            </ResetPassword>
          </form>
          {InvalidCredentials && (
            <Alert title='Credenciales invalidas' color='red'>
              Los datos ingresados son incorrectos, te recordamos que este es el módulo de administador y si no eres uno
              de ellos te invitamos a que regreses al módulo de clientes.
            </Alert>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default login;

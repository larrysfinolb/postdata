import { Alert, Button, PasswordInput, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import Paragraph from 'components/Paragraph';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import supabase from 'utils/supabase';

function AdminLogin() {
  const router = useRouter();
  const [error, setError] = React.useState('');
  const [showSpinner, setShowSpinner] = React.useState(false);

  React.useEffect(() => {
    const getSession = async () => {
      setShowSpinner(true);
      try {
        const result: any = await supabase.auth.getSession();

        if (result.error) throw result.error.toString();

        if (result.data.session) {
          if (
            result.data.session.user.id ===
            '9feda9d6-0cec-4daf-9ce9-10d471104398'
          ) {
            router.push('/admin/client-dashboard');
          } else {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
          }
        }
      } catch (error) {
        console.error(error);
      }
      setShowSpinner(false);
    };

    getSession();
  }, []);

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) =>
        /^[a-zA-Z0-9\-\*]{1,64}@[a-zA-Z0-9\-\.]{1,255}$/.test(value)
          ? null
          : 'Formato de correo invalido.',
      password: (value) =>
        /^.+$/.test(value) ? null : 'Formato de correo invalido.',
    },
  });

  return (
    <Layout title="Inicia sesión - Administrador">
      <Loader show={showSpinner} />
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          position: 'relative',
        }}
      >
        <picture>
          <img
            src="https://efqndplvrwsimqbfyssn.supabase.co/storage/v1/object/sign/images/admin-login-lottie.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYWRtaW4tbG9naW4tbG90dGllLnN2ZyIsImlhdCI6MTY2NjcxNDAxNSwiZXhwIjoxOTgyMDc0MDE1fQ.0d3A_8FzsCoSvWIXa0_VKf_wVw0hG6CfXB6bQf6asdI"
            alt="Imagen Lottie que acompaña el inicio de sesión del panel de administrador"
          />
        </picture>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <Title order={1} align="center">
              Inicia sesión
            </Title>
            <Paragraph align="center">
              Este es el módulo de administradores y solo podras acceder a sus
              funcionalidades si posees las credenciales.
            </Paragraph>
          </div>
          <form
            onSubmit={form.onSubmit(async (values) => {
              setShowSpinner(true);
              try {
                const result: any = await supabase.auth.signInWithPassword({
                  email: values.email,
                  password: values.password,
                });

                if (result.error) throw result.error.toString();

                router.push('/admin/client-dashboard');
                return;
              } catch (error: any) {
                if (error === 'AuthApiError: Invalid login credentials')
                  setError(
                    ' Los datos ingresados son incorrectos, te recordamos que este es el módulo de administador y si no eres uno de ellos te invitamos a que regreses al módulo de clientes.'
                  );
                else setError(error);
              }
              setShowSpinner(false);
            })}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateAreas:
                "'email email' 'password password' 'submit cancel'",
              gap: '1rem',
            }}
          >
            <TextInput
              color="yellow"
              placeholder="ejemplo@ejemplo.com"
              label="Correo eléctronico"
              withAsterisk
              style={{ gridArea: 'email' }}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              color="yellow"
              placeholder="Contraseña super segura"
              label="Contraseña"
              withAsterisk
              style={{ gridArea: 'password' }}
              {...form.getInputProps('password')}
            />
            <Button
              type="submit"
              style={{ gridArea: 'submit' }}
              color="yellow"
              uppercase
            >
              Inciar sesión
            </Button>
            <Link href="/index">
              <Button
                component="a"
                variant="outline"
                style={{ gridArea: 'cancel' }}
                color="green"
                uppercase
              >
                Regresar como cliente
              </Button>
            </Link>
          </form>
          {error && (
            <Alert title="¡Error!" color="red">
              {error}
            </Alert>
          )}
        </div>
      </section>
    </Layout>
  );
}

export default AdminLogin;

import React from 'react';
import { useForm } from '@mantine/form';
import {
  PasswordInput,
  Textarea,
  Button,
  Checkbox,
  Radio,
  TextInput,
  MantineTheme,
  useMantineTheme,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import Link from 'next/link';
import { termsAndConditions } from 'utils/termsAndConditions';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import supabase from 'utils/supabase';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import colors from 'utils/colors';

type Props = {};

const LostPassButton = styled.button`
  color: ${colors.green};
  width: 100%;
  cursor: pointer;
  background-color: #ffffff00;
  grid-area: lostPass;
  border: none;
`;

function Index({}: Props) {
  const theme: MantineTheme = useMantineTheme();

  const router = useRouter();

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
    },
  });
  const textInputStyles = {
    root: {
      'input:focus': {
        borderColor: theme.colors.customYellow[0],
      },
      'textarea:focus': {
        borderColor: theme.colors.customYellow[0],
      },
    },
  };
  const passInputStyles = {
    root: {
      'div:focus': {
        borderColor: theme.colors.customYellow[0],
      },
      'div:focus-within': {
        borderColor: theme.colors.customYellow[0],
      },
    },
  };
  return (
    <form
      onSubmit={form.onSubmit(async (values) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });

        if (!error) {
          router.push('/');
        } else {
          alert('Hubo un error: ' + error);
        }
      })}
      style={{
        display: 'grid',
        width: '100%',
        gridTemplateAreas: `
                    'email email'
                    'password password'
                    'lostPass lostPass'
                    'register submit' 
                `,
        gap: '15px',
        placeContent: 'center',
        placeItems: 'stretch',
        gridTemplateColumns: '1fr 1fr',
      }}
    >
      <TextInput
        withAsterisk
        required
        label="Correo"
        placeholder="tucorreo@email.com"
        {...form.getInputProps('email')}
        style={{ gridArea: 'email' }}
        styles={textInputStyles}
      />
      <PasswordInput
        withAsterisk
        required
        label={'Contraseña'}
        placeholder="abc123"
        {...form.getInputProps('password')}
        style={{ gridArea: 'password' }}
        styles={passInputStyles}
      />

      <div
        style={{
          gridArea: 'register',
          width: '100%',
          height: '100%',
          display: 'grid',
          placeContent: 'center',
        }}
      >
        <Link href={'/signup'}>
          <a
            style={{
              textAlign: 'center',
              textDecoration: 'none',
              color: theme.colors.customGreen[0],
            }}
          >
            ¿No tienes una cuenta?
          </a>
        </Link>
      </div>
      <Button
        type="submit"
        style={{
          gridArea: 'submit',
          backgroundColor: theme.colors.customYellow[0],
        }}
      >
        {'Iniciar sesión'}
      </Button>
      <Link href={'/recovery'}>
        <a
          style={{
            textAlign: 'center',
            textDecoration: 'none',
            color: theme.colors.customGreen[0],
            gridArea: 'lostPass',
          }}
        >
          ¿Olvidaste tu contraseña?
        </a>
      </Link>
    </form>
  );
}

export default Index;

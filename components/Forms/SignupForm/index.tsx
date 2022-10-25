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

type Props = {};

function Index({}: Props) {
  const theme: MantineTheme = useMantineTheme();

  const form = useForm({
    initialValues: {
      firstname: '',
      lastname: '',
      password: '',
      checkPassword: '',
      email: '',
      birthday: '',
      termsOfService: false,
    },

    validate: {
      firstname: (value) =>
        value.length < 3
          ? 'Nombre demasiado corto'
          : /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(value)
          ? null
          : 'Nombre no valido',

      lastname: (value) =>
        value.length < 3
          ? 'Apellido demasiado corto'
          : /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(value)
          ? null
          : 'Apellido no valido',

      checkPassword: (value, object) => {
        return value === object.password ? null : 'La contraseña no es la misma';
      },

      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Correo no valido'),

      birthday: (value) => (value ? null : 'Seleccione una fecha'),
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
  const checkBoxInputStyles = {
    root: {
      'input:checked': {
        borderColor: theme.colors.customYellow[0],
        backgroundColor: theme.colors.customYellow[0],
      },
    },
  };
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
        required
        label="Nombre"
        placeholder="Alejandro"
        {...form.getInputProps('firstname')}
        style={{ gridArea: 'firstname' }}
        styles={textInputStyles}
      />
      <TextInput
        withAsterisk
        label="Apellido"
        required
        placeholder="Sanchez"
        {...form.getInputProps('lastname')}
        style={{ gridArea: 'lastname' }}
        styles={textInputStyles}
      />
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
        style={{ gridArea: 'pass' }}
        styles={passInputStyles}
      />
      <PasswordInput
        withAsterisk
        required
        label={'Confirmar contraseña'}
        placeholder="abc123"
        {...form.getInputProps('checkPassword')}
        style={{ gridArea: 'checkpass' }}
        styles={passInputStyles}
      />
      <DatePicker
        withAsterisk
        required
        label={'Fecha de nacimiento'}
        placeholder="Elije una fecha"
        {...form.getInputProps('birthday')}
        style={{ gridArea: 'birthday' }}
        styles={textInputStyles}
        minDate={dayjs(new Date()).startOf('year').subtract(80, 'years').toDate()}
        maxDate={dayjs(new Date()).startOf('year').subtract(16, 'years').toDate()}
      />
      <Radio.Group name="sex" label="Sexo" withAsterisk required>
        <Radio required value="male" label="Hombre" styles={checkBoxInputStyles} />
        <Radio value="female" label="Mujer" styles={checkBoxInputStyles} />
        <Radio value="other" label="Otro" styles={checkBoxInputStyles} />
      </Radio.Group>

      <Textarea
        label="Terminos y condiciones"
        style={{ gridArea: 'termsOfService' }}
        readOnly
        styles={textInputStyles}
        value={termsAndConditions}
        minRows={6}
      ></Textarea>

      <Checkbox
        required
        label="Acepto los terminos y condiciones"
        style={{ gridArea: 'acceptTermsOfService' }}
        {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        styles={checkBoxInputStyles}
      />
      <div style={{ gridArea: 'isRegister', width: '100%', height: '100%', display: 'grid', placeContent: 'center' }}>
        <Link href={'#'}>
          <a style={{ textAlign: 'center', textDecoration: 'none', color: theme.colors.customGreen[0] }}>
            ¿Ya tienes una cuenta?
          </a>
        </Link>
      </div>
      <Button type="submit" style={{ gridArea: 'submit', backgroundColor: theme.colors.customYellow[0] }}>
        Registrarse
      </Button>
    </form>
  );
}

export default Index;

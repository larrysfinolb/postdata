import React from 'react';
import { Button, Text, Box, Container, TextInput } from '@mantine/core';
import Link from 'next/link';
import supabase from 'utils/supabase';

type Props = {};

function Recovery({}: Props) {
  const [email, setEmail] = React.useState('');
  const [show, setShow] = React.useState(false);

  const handleChange = (e: any) => {
    setEmail(e.target.value);
  };

  const handleButton = async () => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) {
      alert(error);
    } else {
      setShow(true);
    }
  };
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
      >
        <Text>
          Escribe tu email para enviarte un correo de recuperación de la
          contraseña.
        </Text>
        <TextInput
          onChange={(e) => handleChange(e)}
          style={{ width: '400px' }}
        />
        <Button
          onClick={handleButton}
          style={{ backgroundColor: '#FCB84C', width: '400px' }}
        >
          Enviar
        </Button>
        {show && <Text>Revisa tu correo electrónico.</Text>}
      </form>
    </Container>
  );
}

export default Recovery;

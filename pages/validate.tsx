import React from 'react';
import { Button, Modal } from '@mantine/core';
import Link from 'next/link';

type Props = {};

function Validate({}: Props) {
  const [opened, setOpened] = React.useState(true);
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      title="Hemos enviado un correo a tu email, confírmalo e inicia sesión."
    >
      <Link href="/login" passHref>
        <Button color="green" variant="outline" fullWidth component="a">
          Ir al login.
        </Button>
      </Link>
    </Modal>
  );
}

export default Validate;

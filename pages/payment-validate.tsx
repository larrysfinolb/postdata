import React from 'react';
import { Button, Modal } from '@mantine/core';
import Link from 'next/link';

type Props = {};

function PaymentValidate({}: Props) {
  const [opened, setOpened] = React.useState(true);
  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      centered
      closeOnClickOutside={false}
      closeOnEscape={false}
      withCloseButton={false}
      title="Tu pago fue enviado"
    >
      <Link href="/login" passHref>
        <Button color="green" variant="outline" fullWidth component="a">
          Ir a inicio
        </Button>
      </Link>
    </Modal>
  );
}

export default PaymentValidate;

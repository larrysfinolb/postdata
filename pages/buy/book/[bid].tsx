import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import supabase from 'utils/supabase';
import { Text, Button, Stack, Modal, Group } from '@mantine/core';
import styled from '@emotion/styled';
import colors from 'utils/colors';
import Link from 'next/link';

const ColoredText = styled.span`
  color: ${colors.green};
`;
const StyledContainer = styled.div`
  border: 1px solid #000;
  margin: auto;
  width: 500px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 6px;
`;

type Props = {};

function BuyBook({}: Props) {
  const router = useRouter();
  const { bid } = router.query;
  const [book, setBook] = React.useState<any>(null);
  const [opened, setOpened] = React.useState(false);
  const [isLoading, setLoading] = React.useState<any>(true);
  const [hasBought, setHasBought] = React.useState<any>(false);
  const [user, setUser] = React.useState<any>(null);
  const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data: userData, error } = await supabase.auth.getUser();
      error && router.push('/login');
      if (userData?.user) {
        const { data: clients, error: errorClients } = await supabase
          .from('clients')
          .select('*')
          .eq('email', userData.user.email);

        if (clients) {
          setUser(clients[0]);
        }
      }
    };
    const getBook = async () => {
      const { data: bookData, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', bid);

      if (bookData) {
        setBook(bookData[0]);
      }
    };
    getUser();
    getBook();
  }, [bid]);

  const handleBuy = async () => {
    if (user.balance - book.price < 0) {
      setError('Saldo insuficiente');
    } else {
      const { data: updateClients, error } = await supabase
        .from('clients')
        .update({ balance: user.balance - book.price })
        .eq('email', user.email);

      const { data: updateBooks, error: booksError } = await supabase
        .from('books')
        .update({ copies: book.copies - 1 })
        .eq('id', book.id);

      setError('Gracias por su compra');
    }

    setHasBought(true);
  };

  return (
    <Layout Header={<Header />}>
      {hasBought ? (
        <Modal
          opened={opened}
          onClose={() => setOpened(true)}
          centered
          closeOnClickOutside={false}
          closeOnEscape={false}
          withCloseButton={false}
          title={error}
        >
          <Link href="/" passHref>
            <Button color="green" variant="outline" fullWidth component="a">
              Ir a inicio
            </Button>
          </Link>
        </Modal>
      ) : (
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          centered
          closeOnClickOutside={false}
          closeOnEscape={false}
          withCloseButton={false}
          title="¿Estás seguro de que quieres comprar este libro?"
        >
          <Stack style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
            <Button
              color="red"
              variant="outline"
              fullWidth
              component="a"
              onClick={() => setOpened(false)}
            >
              No
            </Button>
            <Button
              color="green"
              variant="outline"
              fullWidth
              component="a"
              onClick={handleBuy}
            >
              Sí
            </Button>
          </Stack>
        </Modal>
      )}
      <Heading order={1} styles={{ textAlign: 'center' }}>
        Comprar libro
      </Heading>
      <Text align="center" weight="bold" color="dark" size={18} mt={35}>
        Estas a punto de comprar el libro{' '}
        <ColoredText>{`"${book?.title}"`}</ColoredText>
      </Text>
      <StyledContainer>
        {book && user && (
          <Stack>
            <Text align="center" weight="bold" color="dark" size={14}>
              {`Saldo actual: ${user.balance}`}
            </Text>
            <Text align="center" weight="bold" color="dark" size={14}>
              {`Precio del libro: ${book.price}`}
            </Text>
            <Text align="center" weight="bold" color="dark" size={14}>
              {`Saldo después de la compra: ${
                user.balance - book.price < 0
                  ? 'Saldo insuficiente'
                  : user.balance - book.price
              }`}
            </Text>
            <Button
              onClick={() => setOpened(true)}
              fullWidth
              style={{ backgroundColor: '#FCB84C' }}
            >
              Comprar
            </Button>
          </Stack>
        )}
      </StyledContainer>
    </Layout>
  );
}

export default BuyBook;

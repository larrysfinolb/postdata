import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import supabase from 'utils/supabase';
import { Text, Button, Stack } from '@mantine/core';
import styled from '@emotion/styled';
import colors from 'utils/colors';

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

const getSessionActive: any = async () => {
  const { data, error } = await supabase.auth.getUser();
  return data;
};

function BuyBook({}: Props) {
  const router = useRouter();
  const { bid } = router.query;
  const [book, setBook] = React.useState<any>(null);
  const [balance, setBalance] = React.useState<any>(null);

  React.useEffect(() => {
    const getBook = async () => {
      const session = await getSessionActive();
      !session.user && router.push('/login');

      const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', bid);

      if (data) {
        console.log(session);
        setBook(data);
      }
    };
    getBook();
  }, [bid]);

  return (
    <Layout Header={<Header />}>
      <Heading order={1} styles={{ textAlign: 'center' }}>
        Comprar libro
      </Heading>
      <Text align="center" weight="bold" color="dark" size={18} mt={35}>
        Estas a punto de comprar el libro{' '}
        <ColoredText>{`"${book?.title}"`}</ColoredText>
      </Text>
      <StyledContainer>
        <Stack>
          <Text align="center" weight="bold" color="dark" size={14}>
            Saldo actual:{' '}
          </Text>
          <Text align="center" weight="bold" color="dark" size={14}>
            Precio del libro:{' '}
          </Text>
          <Text align="center" weight="bold" color="dark" size={14}>
            Saldo restante:{' '}
          </Text>
          <Button fullWidth style={{ backgroundColor: '#FCB84C' }}>
            Comprar
          </Button>
        </Stack>
      </StyledContainer>
    </Layout>
  );
}

export default BuyBook;

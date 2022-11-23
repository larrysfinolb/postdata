import React from 'react';
import { useRouter } from 'next/router';
import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import supabase from 'utils/supabase';
import { Text, Divider } from '@mantine/core';
import styled from '@emotion/styled';
import colors from 'utils/colors';
import Loader from 'components/Loader';

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
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
`;
const StyledList = styled.ul`
  margin: auto;
  width: 500px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 6px;
  list-style: none;
`;

type Props = {};

function History({}: Props) {
  const router = useRouter();
  const [isLoading, setLoading] = React.useState<any>(true);
  const [user, setUser] = React.useState<any>(null);
  const [purchases, setPurchases] = React.useState<any>([]);

  React.useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      const { data: dataUser, error: errorUser } =
        await supabase.auth.getUser();
      errorUser && router.push('/login');
      setUser(dataUser);

      let { data: purchasesData, error } = await supabase
        .from('shoppings')
        .select('id, books_id, created_at')
        .eq('active', true)
        .eq('email', dataUser.user?.email);

      let { data: books, error: bookError } = await supabase
        .from('books')
        .select('id, title');

      const preFilterData = purchasesData?.map((dataP) => {
        const thisTitle = books
          ?.filter((book) => book.id == dataP.books_id)
          .map((book) => book.title)[0];
        return {
          id: dataP.id,
          title: thisTitle,
          date: dataP.created_at,
        };
      });

      const filterData = preFilterData?.sort(function (a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });

      console.log(filterData);

      setPurchases(filterData);
      setLoading(false);
    };
    getUser();
  }, []);

  return (
    <Layout Header={<Header />}>
      <Loader show={isLoading} />
      <Heading order={1} styles={{ textAlign: 'center' }}>
        Historial de compras de libros
      </Heading>
      <Text align="center" weight="bold" color="dark" size={18} mt={35}>
        Este es tu historial de los libros comprados en esta cuenta.
      </Text>
      <StyledContainer>
        {purchases && (
          <StyledList>
            {purchases.map((purchase: any) => {
              return (
                <React.Fragment key={purchase.id}>
                  <li
                    style={{
                      listStyle: 'none',
                      textAlign: 'center',
                      marginBottom: '5px',
                      marginTop: '5px',
                    }}
                  >
                    <Text size={18}>
                      <ColoredText>{purchase.title}</ColoredText>
                      {' el día '}
                      {new Date(purchase.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </Text>
                  </li>
                  <Divider />
                </React.Fragment>
              );
            })}
          </StyledList>
        )}
      </StyledContainer>
    </Layout>
  );
}

export default History;

import { Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import ShoppingForm from 'components/Forms/ShoopingForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import Section from 'components/Section';
import useSearcher from 'hooks/useSearcher';
import React from 'react';
import { getAll } from 'utils/db';
import REGEX from 'utils/regex';

type Props = {};

function ShoppingDashboard({}: Props) {
  const [load, setLoad] = React.useState(true);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [data, setData] = React.useState([]);

  const [books, setBooks] = React.useState([]);

  const { result, setSearch } = useSearcher(data, ['id']);

  React.useEffect(() => {
    if (load) {
      const getData = async () => {
        setShowSpinner(true);
        const result: any = await getAll('shoppings');
        if (result.data) setData(result.data);

        const resultBooks: any = await getAll('books');
        if (resultBooks) setBooks(resultBooks.data);

        setLoad(false);
        setShowSpinner(false);
      };

      getData();
    }
  }, [load]);

  const form = useForm({
    initialValues: {
      id: '',
      client: '',
      book: '',
      active: false,
    },
    validate: {
      client: (value) =>
        REGEX.email.test(value) ? null : 'Formato de cliente invalido.',
      book: (value) =>
        REGEX.title.test(value) ? null : 'Formato de libro invalido.',
    },
  });

  return (
    <AdminAuth>
      <Loader show={showSpinner} />
      <Layout title="Panel de compras" Header={<HeaderAdmin />}>
        <Section>
          <Title order={1} style={{ gridColumn: '1 / 3' }}>
            Panel de compras
          </Title>
          <Container>
            <TextInput
              label="Buscador"
              placeholder="imperio"
              onChange={(event) => setSearch(event.target.value)}
            />
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Libro</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item: any) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      const book: any = books.filter(
                        (book: any) => book.id === item.books_id
                      );

                      form.setValues({
                        id: item.id,
                        client: item.email,
                        book: book[0].title,
                        active: item.active,
                      });
                    }}
                  >
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>
                      {books.map((book: any) => {
                        if (book.id === item.books_id) return book.title;
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          <div>
            <ShoppingForm
              form={form}
              setLoad={setLoad}
              setShowSpinner={setShowSpinner}
            />
          </div>
        </Section>
      </Layout>
    </AdminAuth>
  );
}

export default ShoppingDashboard;

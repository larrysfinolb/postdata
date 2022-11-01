import { Button, Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import ShoppingForm from 'components/Forms/ShoopingForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import Section from 'components/Section';
import useData from 'hooks/useData';
import React from 'react';
import REGEX from 'utils/regex';

type Props = {};

function ShoppingDashboard({}: Props) {
  const [showSpinner, setShowSpinner] = React.useState(false);
  const { data: shoppings, setLoad } = useData('shoppings', setShowSpinner);

  const form = useForm({
    initialValues: {
      id: '',
      client: '',
      book: '',
      active: false,
    },
    validate: {
      client: (value) =>
        REGEX.name.test(value) ? null : 'Formato de cliente invalido.',
      book: (value) =>
        REGEX.title.test(value) ? null : 'Formato de libro invalido.',
    },
  });

  return (
    <AdminAuth>
      <Loader show={showSpinner} />
      <Layout title="Panel de compras" Header={<HeaderAdmin />}>
        <Section>
          <Title
            order={1}
            transform="uppercase"
            style={{ gridColumn: '1 / 3' }}
          >
            Panel de compras
          </Title>
          <Container>
            <TextInput label="Buscador" placeholder="imperio" />
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Libro</th>
                </tr>
              </thead>
              <tbody>
                {shoppings.map((item: any) => (
                  <tr
                    key={item.id}
                    onClick={() =>
                      form.setValues({
                        id: item.id,
                        client: item.clients_id,
                        book: item.books_id,
                      })
                    }
                  >
                    <td>{item.id}</td>
                    <td>{item.client}</td>
                    <td>{item.book}</td>
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

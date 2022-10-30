import { Button, Table, TextInput, Title } from '@mantine/core';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import ShoppingForm from 'components/Forms/ShoopingForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Section from 'components/Section';
import useData from 'hooks/useData';
import React from 'react';

type Props = {};

function ShoppingDashboard({}: Props) {
  const shopping = useData('shopping');

  return (
    <AdminAuth>
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
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Libro</th>
                </tr>
              </thead>
              <tbody>
                {shopping.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.client}</td>
                    <td>{item.book}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button color="yellow" type="submit">
              Generar reporte
            </Button>
          </Container>
          <ShoppingForm />
        </Section>
      </Layout>
    </AdminAuth>
  );
}

export default ShoppingDashboard;

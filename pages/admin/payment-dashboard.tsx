import { Button, Table, TextInput, Title } from '@mantine/core';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import PaymentForm from 'components/Forms/PaymentForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Section from 'components/Section';
import useData from 'hooks/useData';
import React from 'react';

function PaymentDashboard() {
  const payments = useData('payments');

  return (
    <AdminAuth>
      <Layout title="Panal de pagos" Header={<HeaderAdmin />}>
        <Section>
          <Title order={1} style={{ gridColumn: '1 / 3' }}>
            Panel de pagos
          </Title>
          <Container>
            <TextInput label="Buscador" placeholder="1" />
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((item: any) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>client</td>
                    <td>{item.active}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button color="yellow" type="button">
              Generar reporte
            </Button>
          </Container>
          <PaymentForm />
        </Section>
      </Layout>
    </AdminAuth>
  );
}

export default PaymentDashboard;

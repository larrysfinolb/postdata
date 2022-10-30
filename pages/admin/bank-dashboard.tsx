import { Button, Table, TextInput, Title } from '@mantine/core';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import BankForm from 'components/Forms/BankForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Section from 'components/Section';
import useData from 'hooks/useData';
import React from 'react';

type Props = {};

function BankdDashboard({}: Props) {
  const banks = useData('banks');

  return (
    <AdminAuth>
      <Layout title="Panel de bancos" Header={<HeaderAdmin />}>
        <Section>
          <Title order={1} style={{ gridColumn: '1 / 3' }}>
            Panel de bancos
          </Title>
          <Container>
            <TextInput label="Buscador" placeholder="banesco" />
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Número de cuenta</th>
                </tr>
              </thead>
              <tbody>
                {banks.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.number}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button color="yellow" type="button">
              Generar reporte
            </Button>
          </Container>
          <BankForm />
        </Section>
      </Layout>
    </AdminAuth>
  );
}

export default BankdDashboard;

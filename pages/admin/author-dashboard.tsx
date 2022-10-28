import { Button, Table, TextInput, Title } from '@mantine/core';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import AuthorForm from 'components/Forms/AuthorForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Section from 'components/Section';
import useData from 'hooks/useData';
import React from 'react';

function AuthorDashboard() {
  const authors = useData('authors');

  return (
    <AdminAuth>
      <Layout title='Panel de clientes' Header={<HeaderAdmin />}>
        <Section>
          <Title order={1} style={{ gridColumn: '1 / 3' }}>
            Panel de Autores
          </Title>
          <Container>
            <TextInput color='yellow' placeholder='brandon' label='Buscador' />
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {authors.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button color='yellow' type='button' uppercase>
              Generar reporte
            </Button>
          </Container>
          <AuthorForm />
        </Section>
      </Layout>
    </AdminAuth>
  );
}

export default AuthorDashboard;

import { Button, Table, TextInput, Title } from '@mantine/core';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import GenreForm from 'components/Forms/GenreForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Section from 'components/Section';
import useData from 'hooks/useData';
import React from 'react';

function GenreDashboard() {
  const genres = useData('genres');

  return (
    <AdminAuth>
      <Layout title="Panel de clientes" Header={<HeaderAdmin />}>
        <Section>
          <Title order={1} style={{ gridColumn: '1 / 3' }}>
            Panel de Autores
          </Title>
          <Container>
            <TextInput color="yellow" placeholder="acción" label="Buscador" />
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {genres.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.active}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button color="yellow" type="button" uppercase>
              Generar reporte
            </Button>
          </Container>
          <GenreForm />
        </Section>
      </Layout>
    </AdminAuth>
  );
}

export default GenreDashboard;

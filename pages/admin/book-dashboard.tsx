import React from 'react';
import HeaderAdmin from 'components/HeaderAdmin';
import { TextInput, Button, Table, Title } from '@mantine/core';
import Layout from 'components/Layout';
import useData from 'hooks/useData';
import BookForm from 'components/Forms/BookForm';
import Section from 'components/Section';
import Container from 'components/Container';

function ClientDashboard() {
  const books = useData('books');
  const authors = useData('authors');
  const genres = useData('genres');

  return (
    <Layout title='Panel de Libros' Header={<HeaderAdmin />}>
      <Section>
        <Title order={1} style={{ gridColumn: '1 / 3' }}>
          Panel de Libros
        </Title>
        <Container>
          <TextInput color='yellow' placeholder='imperio' label='Buscador' />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Idioma</th>
              </tr>
            </thead>
            <tbody>
              {books.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.title}</td>
                  <td>{item.language}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button color='yellow' type='button' uppercase>
            Generar reporte
          </Button>
        </Container>
        <BookForm authors={authors} genres={genres} />
      </Section>
    </Layout>
  );
}

export default ClientDashboard;

import { Button, LoadingOverlay, Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import AuthorForm from 'components/Forms/AuthorForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Section from 'components/Section';
import useData from 'hooks/useData';
import React from 'react';
import REGEX from 'utils/regex';

function AuthorDashboard() {
  const [showSpinner, setShowSpinner] = React.useState(false);
  const { data: authors, setLoad } = useData('authors', setShowSpinner);

  const form = useForm({
    initialValues: {
      id: '',
      name: '',
      active: false,
    },
    validate: {
      id: (value) => (REGEX.id.test(value) ? null : 'Formato de ID invalido.'),
      name: (value) =>
        REGEX.name.test(value) ? null : 'Formato de nombre invalido.',
    },
  });

  return (
    <AdminAuth>
      <Layout title="Panel de clientes" Header={<HeaderAdmin />}>
        <Section>
          <LoadingOverlay
            loaderProps={{ color: 'yellow' }}
            visible={showSpinner}
            overlayBlur={2}
          />
          <Title order={1} style={{ gridColumn: '1 / 3' }}>
            Panel de Autores
          </Title>
          <Container>
            <TextInput color="yellow" placeholder="brandon" label="Buscador" />
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {authors.map((item: any) => (
                  <tr
                    key={item.id}
                    onClick={() =>
                      form.setValues({
                        id: item.id,
                        name: item.name,
                        active: item.active,
                      })
                    }
                  >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button color="yellow" type="button" uppercase>
              Generar reporte
            </Button>
          </Container>
          <AuthorForm
            form={form}
            setLoad={setLoad}
            setShowSpinner={setShowSpinner}
          />
        </Section>
      </Layout>
    </AdminAuth>
  );
}

export default AuthorDashboard;

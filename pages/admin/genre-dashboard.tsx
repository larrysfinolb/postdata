import { Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import GenreForm from 'components/Forms/GenreForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import Section from 'components/Section';
import useSearcher from 'hooks/useSearcher';
import React from 'react';
import { getAll } from 'utils/db';
import REGEX from 'utils/regex';

function GenreDashboard() {
  const [load, setLoad] = React.useState(true);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [data, setData] = React.useState([]);

  const { result, setSearch } = useSearcher(data, ['name']);

  React.useEffect(() => {
    if (load) {
      const getData = async () => {
        setShowSpinner(true);
        const result = await getAll('genres');
        if (result.data) setData(result.data);
        setLoad(false);
        setShowSpinner(false);
      };

      getData();
    }
  }, [load]);

  const form = useForm({
    initialValues: {
      id: '',
      name: '',
      active: false,
    },
    validate: {
      name: (value) =>
        REGEX.name.test(value) ? null : 'Formato de nombre completo invalido.',
    },
  });

  return (
    <AdminAuth>
      <Loader show={showSpinner} />
      <Layout title="Panel de clientes" Header={<HeaderAdmin />}>
        <Section>
          <Title order={1} style={{ gridColumn: '1 / 3' }}>
            Panel de géneros
          </Title>
          <Container>
            <TextInput
              color="yellow"
              placeholder="acción"
              label="Buscador"
              onChange={(event: any) => setSearch(event.target.value)}
            />
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item: any) => (
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
                    <td>{item.active ? 'Activado' : 'Desactivado'}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          <div>
            <GenreForm
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

export default GenreDashboard;

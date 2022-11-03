import { Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import BankForm from 'components/Forms/BankForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import Section from 'components/Section';
import useSearcher from 'hooks/useSearcher';
import React from 'react';
import { getAll } from 'utils/db';
import REGEX from 'utils/regex';

type Props = {};

function BankdDashboard({}: Props) {
  const [load, setLoad] = React.useState(true);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [data, setData] = React.useState([]);

  const { result, setSearch } = useSearcher(data, [
    'id',
    'name',
    'account_number',
  ]);

  React.useEffect(() => {
    if (load) {
      const getData = async () => {
        setShowSpinner(true);
        const result = await getAll('banks');
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
      account_number: '',
      active: false,
    },

    validate: {
      name: (value) =>
        REGEX.name.test(value) ? null : 'Formato del nombre invalido.',
      account_number: (value) =>
        REGEX.account_number.test(value)
          ? null
          : 'Formato de número de cuenta invalido.',
    },
  });

  return (
    <AdminAuth>
      <Loader show={showSpinner} />
      <Layout title="Panel de bancos" Header={<HeaderAdmin />}>
        <Section>
          <Title order={1} style={{ gridColumn: '1 / 3' }}>
            Panel de bancos
          </Title>
          <Container>
            <TextInput
              label="Buscador"
              placeholder="banesco"
              onChange={(event: any) => setSearch(event.target.value)}
            />
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Número de cuenta</th>
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
                        account_number: item.account_number,
                        active: item.active,
                      })
                    }
                  >
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.account_number}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          <div>
            <BankForm
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

export default BankdDashboard;

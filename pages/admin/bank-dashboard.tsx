import { Button, LoadingOverlay, Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import BankForm from 'components/Forms/BankForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Section from 'components/Section';
import useData from 'hooks/useData';
import React from 'react';
import REGEX from 'utils/regex';

type Props = {};

function BankdDashboard({}: Props) {
  const [showSpinner, setShowSpinner] = React.useState(false);
  const { data: banks, setLoad } = useData('banks', setShowSpinner);

  const form = useForm({
    initialValues: {
      id: '',
      name: '',
      number: '',
      active: false,
    },

    validate: {
      id: (value) => (REGEX.id.test(value) ? null : 'Formato del id invalido.'),
      name: (value) =>
        REGEX.name.test(value) ? null : 'Formato del nombre invalido.',
      number: (value) =>
        REGEX.account.test(value)
          ? null
          : 'Formato de número de cuenta invalido.',
    },
  });

  return (
    <AdminAuth>
      <Layout title="Panel de bancos" Header={<HeaderAdmin />}>
        <Section>
          <LoadingOverlay
            loaderProps={{ color: 'yellow' }}
            visible={showSpinner}
            overlayBlur={2}
          />
          <Title order={1} style={{ gridColumn: '1 / 3' }}>
            Panel de bancos
          </Title>
          <Container>
            <TextInput label="Buscador" placeholder="banesco" />
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Número de cuenta</th>
                </tr>
              </thead>
              <tbody>
                {banks.map((item: any) => (
                  <tr
                    key={item.id}
                    onClick={() =>
                      form.setValues({
                        id: item.id,
                        name: item.name,
                        number: item.account_number,
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
            <Button color="yellow" type="button" uppercase>
              Generar reporte
            </Button>
          </Container>
          <BankForm
            form={form}
            setLoad={setLoad}
            setShowSpinner={setShowSpinner}
          />
        </Section>
      </Layout>
    </AdminAuth>
  );
}

export default BankdDashboard;

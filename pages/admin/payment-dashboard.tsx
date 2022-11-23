import { Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import PaymentForm from 'components/Forms/PaymentForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import Section from 'components/Section';
import useSearcher from 'hooks/useSearcher';
import React from 'react';
import { getAll } from 'utils/db';
import REGEX from 'utils/regex';

function PaymentDashboard() {
  const [load, setLoad] = React.useState(true);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [data, setData] = React.useState([]);

  const [banks, setBanks] = React.useState([]);

  const { result, setSearch } = useSearcher(data, ['id']);

  React.useEffect(() => {
    if (load) {
      const getData = async () => {
        setShowSpinner(true);

        const result: any = await getAll('payments');
        if (result.data) setData(result.data);

        const resultBanks: any = await getAll('banks');
        if (resultBanks.data) setBanks(resultBanks.data);

        setLoad(false);
        setShowSpinner(false);
      };

      getData();
    }
  }, [load]);

  const form = useForm({
    initialValues: {
      id: '',
      amount: '',
      client: '',
      bank: '',
      voucher: '',
      status: 'P',
      active: false,
      statusInitial: '',
    },

    validate: {
      amount: (value) =>
        REGEX.price.test(value) ? null : 'Formato del monto invalido.',
      client: (value) =>
        REGEX.email.test(value) ? null : 'Formato del cliente invalido.',
      bank: (value) =>
        REGEX.name.test(value) ? null : 'Formato del banco invalido.',
      voucher: (value) => (value ? null : 'Selecciona el comprobante de pago'),
      status: (value) =>
        /^(P|A|R){1,1}$/.test(value) ? null : 'Formato de estatus invalido.',
    },
  });

  return (
    <AdminAuth>
      <Loader show={showSpinner} />
      <Layout title="Panal de pagos" Header={<HeaderAdmin />}>
        <Section>
          <Title order={1} style={{ gridColumn: '1 / 3' }}>
            Panel de pagos
          </Title>
          <Container>
            <TextInput
              label="Buscador"
              placeholder="1"
              onChange={(value) => setSearch(value.target.value)}
            />
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item: any) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      const bank: any = banks.filter(
                        (b: any) => b.id === item.banks_id
                      )[0];
                      form.setValues({
                        id: item.id,
                        amount: item.amount,
                        client: item.clients_email,
                        bank: bank.name,
                        voucher: item.voucher_url,
                        active: item.active,
                        status: item.status,
                        statusInitial: item.status,
                      });
                    }}
                  >
                    <td>{item.id}</td>
                    <td>{item.clients_email}</td>
                    <td>
                      {item.status === 'P'
                        ? 'Pendiente'
                        : item.status === 'A'
                        ? 'Aprobado'
                        : 'Rechazado'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          <div>
            <PaymentForm
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

export default PaymentDashboard;

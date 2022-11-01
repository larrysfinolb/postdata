import { Button, Table, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import PaymentForm from 'components/Forms/PaymentForm';
import HeaderAdmin from 'components/HeaderAdmin';
import Layout from 'components/Layout';
import Loader from 'components/Loader';
import Section from 'components/Section';
import useData from 'hooks/useData';
import React from 'react';
import REGEX from 'utils/regex';

function PaymentDashboard() {
  const [showSpinner, setShowSpinner] = React.useState(false);
  const { data: payments, setLoad } = useData('payments', setShowSpinner);

  const form = useForm({
    initialValues: {
      id: '',
      amount: '',
      client: '',
      bank: '',
      voucher: '',
      active: false,
    },

    validate: {
      amount: (value) =>
        REGEX.price.test(value) ? null : 'Formato del monto invalido.',
      client: (value) =>
        REGEX.name.test(value) ? null : 'Formato del cliente invalido.',
      bank: (value) =>
        REGEX.name.test(value) ? null : 'Formato del banco invalido.',
      voucher: (value) => (value ? null : 'Selecciona el comprobante de pago'),
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
            <TextInput label="Buscador" placeholder="1" />
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((item: any) => (
                  <tr
                    key={item.id}
                    onClick={() =>
                      form.setValues({
                        id: item.id,
                        amount: item.amount,
                        client: item.clinets_id,
                        bank: item.banks_id,
                        voucher: item.voucher_url,
                        active: item.active,
                      })
                    }
                  >
                    <td>{item.id}</td>
                    <td>{item.clients_id}</td>
                    <td>{item.active}</td>
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

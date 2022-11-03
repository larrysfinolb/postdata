import React from 'react';
import Layout from 'components/Layout';
import HeaderAdmin from 'components/HeaderAdmin';
import Section from 'components/Section';
import {
  Button,
  Title,
  Table,
  TextInput,
  Radio,
  Checkbox,
  NumberInput,
  Alert,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import { useForm } from '@mantine/form';
import REGEX from 'utils/regex';
import Loader from 'components/Loader';
import { getAll, updateInDB } from 'utils/db';
import useSearcher from 'hooks/useSearcher';

type Props = {};

function ClientDashboard({}: Props) {
  const [load, setLoad] = React.useState(true);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState('');

  const { result, setSearch } = useSearcher(data, ['id', 'name', 'email']);

  React.useEffect(() => {
    if (load) {
      const getData = async () => {
        setShowSpinner(true);
        const result: any = getAll('clients');
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
      email: '',
      firstName: '',
      lastName: '',
      balance: '',
      active: false,
    },
    validate: {
      email: (value) =>
        REGEX.email.test(value) ? null : 'Formato de correo invalido.',
      firstName: (value) =>
        REGEX.name.test(value) ? null : 'Formato de nombre invalido.',
      lastName: (value) =>
        REGEX.name.test(value) ? null : 'Formato de apellido invalido.',
      balance: (value) =>
        REGEX.balance.test(value) ? null : 'Formato de saldo actual invalido.',
    },
  });

  return (
    <AdminAuth>
      <Layout title="Panel de clientes" Header={<HeaderAdmin />}>
        <Loader show={showSpinner} />
        <Section>
          <Title order={1} style={{ gridColumn: '1 / 3' }}>
            Panel de clientes
          </Title>
          <Container>
            <TextInput
              color="yellow"
              placeholder="imperio"
              label="Buscador"
              onChange={(value) => setSearch(value.target.value)}
            />
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre y Apellido</th>
                  <th>Correo electronico</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item: any) => (
                  <tr
                    key={item.id}
                    onClick={() =>
                      form.setValues({
                        id: item.id,
                        email: item.email,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        balance: item.balance,
                        active: item.active,
                      })
                    }
                  >
                    <td>{item.id}</td>
                    <td>{`${item.firstname} ${item.lastname}`}</td>
                    <td>{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Container>
          <form
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateAreas:
                '"id email" "firstName lastName" "birthday balance" "gender gender" "acctive acctive" "submit reset"',
              gap: '1rem',
            }}
            onSubmit={form.onSubmit(async (values: any) => {
              const { id, ...newValues } = values;

              setShowSpinner(true);

              const result: any = await updateInDB('clients', id, newValues);
              if (result) setError(result);

              form.reset();
              setLoad(true);
              setShowSpinner(false);
            })}
          >
            <TextInput
              color="yellow"
              placeholder="No debes llenar este campo"
              label="ID"
              disabled
              withAsterisk
              style={{ gridArea: 'id' }}
              {...form.getInputProps('id')}
            />
            <TextInput
              color="yellow"
              placeholder="ejemplo@ejemplo.com"
              label="Correo electronico"
              withAsterisk
              disabled
              style={{ gridArea: 'email' }}
              {...form.getInputProps('email')}
            />
            <TextInput
              color="yellow"
              placeholder="Ejemplo"
              label="Nombre"
              withAsterisk
              disabled
              style={{ gridArea: 'firstName' }}
              {...form.getInputProps('firstName')}
            />
            <TextInput
              color="yellow"
              placeholder="de Nombre"
              label="Apellido"
              withAsterisk
              disabled
              style={{ gridArea: 'lastName' }}
              {...form.getInputProps('lastName')}
            />
            <DatePicker
              label="Fecha de nacimiento"
              placeholder="Selecciona una fecha"
              style={{ gridArea: 'birthday' }}
              disabled
              withAsterisk
              {...form.getInputProps('birthday')}
            />
            <NumberInput
              color="yellow"
              label="Saldo actual"
              placeholder="300"
              min={0}
              step={0.001}
              precision={3}
              disabled
              withAsterisk
              style={{ gridArea: 'balance' }}
              {...form.getInputProps('balance')}
            />
            <Radio.Group
              name="gender"
              label="Género"
              withAsterisk
              style={{ gridArea: 'gender' }}
            >
              <Radio disabled color="yellow" value="M" label="Masculino" />
              <Radio disabled color="yellow" value="F" label="Femenino" />
              <Radio disabled color="yellow" value="O" label="Otros" />
            </Radio.Group>
            <Checkbox
              color="yellow"
              value="true"
              label="Activo"
              {...form.getInputProps('acctive', { type: 'checkbox' })}
            />
            <Button
              color="yellow"
              type="submit"
              uppercase
              style={{ gridArea: 'submit' }}
            >
              Continuar
            </Button>
            <Button
              color="green"
              type="button"
              variant="outline"
              uppercase
              style={{ gridArea: 'reset' }}
            >
              Eliminar
            </Button>
            {error && (
              <Alert
                title="¡Error!"
                color="red"
                style={{ gridColumn: '1 / 3' }}
              >
                {error}
              </Alert>
            )}
          </form>
        </Section>
      </Layout>
    </AdminAuth>
  );
}

export default ClientDashboard;

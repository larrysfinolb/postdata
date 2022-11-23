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
import { getAll } from 'utils/db';
import useSearcher from 'hooks/useSearcher';
import supabase from 'utils/supabase';

type Props = {};

function ClientDashboard({}: Props) {
  const [load, setLoad] = React.useState(true);
  const [showSpinner, setShowSpinner] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState('');

  const { result, setSearch } = useSearcher(data, [
    'first_name',
    'last_name',
    'email',
  ]);

  React.useEffect(() => {
    if (load) {
      const getData = async () => {
        setShowSpinner(true);
        const result: any = await getAll('clients');
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
      first_name: '',
      last_name: '',
      birthday: new Date(),
      balance: '',
      gender: 'H',
      active: false,
    },
    validate: {
      email: (value) =>
        REGEX.email.test(value) ? null : 'Formato de correo invalido.',
      first_name: (value) =>
        REGEX.name.test(value) ? null : 'Formato de nombre invalido.',
      last_name: (value) =>
        REGEX.name.test(value) ? null : 'Formato de apellido invalido.',
      birthday: (value) =>
        value ? null : 'El cliente no tiene una fecha de nacimiento.',
      balance: (value) =>
        parseFloat(value) >= 0 ? null : 'Rango de saldo actual invalido.',
      gender: (value) =>
        /^(H|F|O){1,1}$/.test(value) ? null : 'Formato de género invalido.',
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
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>Nombre y Apellido</th>
                  <th>Correo electronico</th>
                  <th>Género</th>
                </tr>
              </thead>
              <tbody>
                {result.map((item: any) => (
                  <tr
                    key={item.id}
                    onClick={() => {
                      form.setValues({
                        id: item.id,
                        email: item.email,
                        first_name: item.first_name,
                        last_name: item.last_name,
                        birthday: new Date(item.birthday),
                        balance: item.balance,
                        gender: item.gender,
                        active: item.active,
                      });
                    }}
                  >
                    <td>{`${item.first_name} ${item.last_name}`}</td>
                    <td>{item.email}</td>
                    <td>{item.gender}</td>
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
                '"id email" "first_name last_name" "birthday balance" "gender gender" "acctive acctive" "submit reset"',
              gap: '1rem',
            }}
            onSubmit={form.onSubmit(async (values: any) => {
              const { id, email, ...newValues } = values;

              setShowSpinner(true);

              try {
                const result: any = await supabase
                  .from('clients')
                  .update(newValues)
                  .eq('id', id);

                if (result.error) throw result.error.details;
              } catch (error) {
                setError(result);
              }

              if (result) form.reset();
              setLoad(true);
              setShowSpinner(false);
            })}
          >
            <TextInput
              color="yellow"
              placeholder="No debes llenar este campo"
              label="ID"
              disabled
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
              style={{ gridArea: 'first_name' }}
              {...form.getInputProps('first_name')}
            />
            <TextInput
              color="yellow"
              placeholder="de Nombre"
              label="Apellido"
              withAsterisk
              style={{ gridArea: 'last_name' }}
              {...form.getInputProps('last_name')}
            />
            <DatePicker
              label="Fecha de nacimiento"
              placeholder="Selecciona una fecha"
              style={{ gridArea: 'birthday' }}
              withAsterisk
              {...form.getInputProps('birthday')}
            />
            <NumberInput
              color="yellow"
              label="Saldo actual"
              placeholder="300"
              min={0}
              step={0.01}
              precision={2}
              withAsterisk
              style={{ gridArea: 'balance' }}
              {...form.getInputProps('balance')}
            />
            <Radio.Group
              name="gender"
              label="Género"
              withAsterisk
              style={{ gridArea: 'gender' }}
              {...form.getInputProps('gender')}
            >
              <Radio color="yellow" value="H" label="Hombre" />
              <Radio color="yellow" value="M" label="Mujer" />
              <Radio color="yellow" value="O" label="Otros" />
            </Radio.Group>
            <Checkbox
              color="yellow"
              value="true"
              label="Activo"
              {...form.getInputProps('active', { type: 'checkbox' })}
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
              onClick={() => form.reset()}
            >
              Limpiar
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

import React from 'react';
import Layout from 'components/Layout';
import HeaderAdmin from 'components/HeaderAdmin';
import Section from 'components/Section';
import { Button, Title, Table, TextInput, Radio, Checkbox, NumberInput } from '@mantine/core';
import supabase from 'utils/supabase';
import { DatePicker } from '@mantine/dates';
import AdminAuth from 'components/AdminAuth';
import Container from 'components/Container';
import { useForm } from '@mantine/form';

type Props = {};

function ClientDashboard({}: Props) {
  const [clients, setClients] = React.useState([]);

  React.useEffect(() => {
    const getClients = async () => {
      try {
        type Result = {
          data: any;
          error: any;
        };

        // const { data: dataClients, error: errorClients }: Result = await supabase.from('clients').select('*');
        // if (errorClients) throw errorClients;
        // setClients(dataClients);
        setClients([]);
      } catch (error) {
        console.error(error);
      }
    };

    getClients();
  }, []);

  const form = useForm({
    initialValues: {
      id: '',
      email: '',
      firstName: '',
      lastName: '',
      birthday: '',
      currentBalance: '',
      gender: '',
      status: '',
    },
    validate: {
      id: value => null,
      email: value => null,
      firstName: value => null,
      lastName: value => null,
      birthday: value => null,
      currentBalance: value => null,
      gender: value => null,
      status: value => null,
    },
  });

  return (
    <AdminAuth>
      <Layout title='Panel de clientes' Header={<HeaderAdmin />}>
        <Section>
          <Title order={1} style={{ gridColumn: '1 / 3' }}>
            Panel de clientes
          </Title>
          <Container>
            <TextInput color='yellow' placeholder='imperio' label='Buscador' />
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre y Apellido</th>
                  <th>Correo electronico</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((item: any) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{`${item.firstname} ${item.lastname}`}</td>
                    <td>{item.email}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button color='yellow' type='button' uppercase>
              Generar reporte
            </Button>
          </Container>
          <form
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateAreas:
                '"id email" "firstName lastName" "birthday currentBalance" "gender gender" "status status" "created created" "submit delete"',
              gap: '1rem',
            }}>
            <TextInput
              color='yellow'
              placeholder='No debes llenar este campo'
              label='ID'
              disabled
              style={{ gridArea: 'id' }}
              {...form.getInputProps('id')}
            />
            <TextInput
              color='yellow'
              placeholder='ejemplo@ejemplo.com'
              label='Correo electronico'
              withAsterisk
              style={{ gridArea: 'email' }}
              {...form.getInputProps('email')}
            />
            <TextInput
              color='yellow'
              placeholder='Ejemplo'
              label='Nombre'
              withAsterisk
              style={{ gridArea: 'firstName' }}
              {...form.getInputProps('firstName')}
            />
            <TextInput
              color='yellow'
              placeholder='de Nombre'
              label='Apellido'
              withAsterisk
              style={{ gridArea: 'lastName' }}
              {...form.getInputProps('lastName')}
            />
            <DatePicker
              label='Fecha de nacimiento'
              placeholder='Selecciona una fecha'
              style={{ gridArea: 'birthday' }}
              {...form.getInputProps('birthday')}
            />
            <NumberInput
              color='yellow'
              label='Saldo actual'
              placeholder='300'
              min={0}
              step={0.001}
              precision={3}
              withAsterisk
              disabled
              style={{ gridArea: 'currentBalance' }}
              {...form.getInputProps('currentBalance')}
            />
            <Radio.Group name='gender' label='Género' withAsterisk style={{ gridArea: 'gender' }}>
              <Radio color='yellow' value='M' label='Masculino' />
              <Radio color='yellow' value='F' label='Femenino' />
              <Radio color='yellow' value='O' label='Otros' />
            </Radio.Group>
            <Checkbox.Group label='Estado' withAsterisk style={{ gridArea: 'status' }}>
              <Checkbox value='true' label='Activo' {...form.getInputProps('status')} />
            </Checkbox.Group>
            <DatePicker
              label='Fecha de creación'
              placeholder='No debes llenar este campo'
              disabled
              style={{ gridArea: 'created' }}
            />
            <Button color='yellow' type='submit' uppercase style={{ gridArea: 'submit' }}>
              Continuar
            </Button>
            <Button color='green' type='button' variant='outline' uppercase style={{ gridArea: 'delete' }}>
              Eliminar
            </Button>
          </form>
        </Section>
      </Layout>
    </AdminAuth>
  );
}

export default ClientDashboard;

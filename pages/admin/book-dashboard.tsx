import React from 'react';
import Header from 'components/HeaderUser';
import { Grid } from '@mantine/core';
import Layout from 'components/Layout';
import Heading from 'components/Heading';
import MainTable from 'components/Thead';
import MainButton from 'components/MainButton';
import MainTextInput from 'components/MainTextInput';
import MainTextArea from 'components/MainTextArea';
import MainCheckBox from 'components/Checkbox';

const rows = [
  { id: 1, title: 'El imperio final', lenguage: 'es' },
  { id: 2, title: 'El imperio final', lenguage: 'es' },
  { id: 3, title: 'El imperio final', lenguage: 'es' },
  { id: 4, title: 'El imperio final', lenguage: 'es' },
  { id: 5, title: 'El imperio final', lenguage: 'es' },
  { id: 6, title: 'El imperio final', lenguage: 'es' },
  { id: 7, title: 'El imperio final', lenguage: 'es' },
  { id: 8, title: 'El imperio final', lenguage: 'es' },
  { id: 9, title: 'El imperio final', lenguage: 'es' },
  { id: 10, title: 'El imperio final', lenguage: 'es' },
  { id: 11, title: 'El imperio final', lenguage: 'es' },
  { id: 12, title: 'El imperio final', lenguage: 'es' },
  { id: 13, title: 'El imperio final', lenguage: 'es' },
  { id: 14, title: 'El imperio final', lenguage: 'es' },
  { id: 15, title: 'El imperio final', lenguage: 'es' },
];

function ClientDashboard() {
  return (
    <Layout title='Panel de Libros' Header={<Header />}>
      <Grid>
        <Grid.Col span={12}>
          <Heading order={1}>Panel de Libros</Heading>
        </Grid.Col>
        <Grid.Col span={6}>
          <Grid>
            <Grid.Col span={12}>
              <MainTextInput placeholder='Consultar' />
            </Grid.Col>
            <Grid.Col span={12}>
              <MainTable thead={['ID', 'Título', 'Idioma']} tbody={rows} />
            </Grid.Col>
            <Grid.Col span={12}>
              <MainButton>Generar reporte</MainButton>
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={6}>
          <form>
            <Grid>
              <Grid.Col span={6}>
                <MainTextInput placeholder='ID' />
              </Grid.Col>
              <Grid.Col span={6}>
                <MainTextInput placeholder='Fecha de publicación' />
              </Grid.Col>
              <Grid.Col span={12}>
                <MainTextInput placeholder='Título' />
              </Grid.Col>
              <Grid.Col span={6}>
                <MainTextInput placeholder='Lenguaje' />
              </Grid.Col>
              <Grid.Col span={6}>
                <MainTextInput placeholder='Imagen de portada' />
              </Grid.Col>
              <Grid.Col span={6}>
                <MainTextInput placeholder='Autor' />
              </Grid.Col>
              <Grid.Col span={6}>
                <MainTextInput placeholder='Género' />
              </Grid.Col>
              <Grid.Col span={12}>
                <MainTextArea placeholder='Sinopsis' />
              </Grid.Col>
              <Grid.Col span={6}>
                <MainTextInput placeholder='Copias' />
              </Grid.Col>
              <Grid.Col span={6}>
                <MainTextInput placeholder='Precio' />
              </Grid.Col>
              <Grid.Col span={12}>
                <MainCheckBox label='Activo' />
              </Grid.Col>
              <Grid.Col span={6}>
                <MainTextInput placeholder='Fecha de creación' />
              </Grid.Col>
              <Grid.Col span={6}>
                <MainTextInput placeholder='Fecha de última actualización' />
              </Grid.Col>
              <Grid.Col span={12}>
                <MainButton fullWidth={true}>Continuar</MainButton>
              </Grid.Col>
            </Grid>
          </form>
        </Grid.Col>
      </Grid>
    </Layout>
  );
}

export default ClientDashboard;

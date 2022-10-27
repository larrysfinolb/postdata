import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import { SimpleGrid, Container } from '@mantine/core';
import LoginForm from 'components/Forms/LoginForm';

type Props = {};

function Login({}: Props) {
  return (
    <Layout title="signup" Header={<Header />}>
      <Heading
        order={1}
        size="h1"
        styles={{
          textAlign: 'center',
        }}
      >
        {'Inicia sesión'}
      </Heading>
      <Container
        style={{
          display: 'grid',
          placeItems: 'center',
          marginTop: '10vh',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            width: '100%',
            placeItems: 'center',
          }}
        >
          <LoginForm />
          <div>aqui va el gif</div>
        </div>
      </Container>
    </Layout>
  );
}

export default Login;

import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import { SimpleGrid, Container } from '@mantine/core';
import SignupForm from 'components/SignupForm';

type Props = {};

function signup({}: Props) {
  return (
    <Layout title="signup" Header={<Header />}>
      <Heading
        order={1}
        size="h1"
        styles={{
          textAlign: 'center',
        }}
      >
        {'Registrate para convertirte en usuario de Postdata'}
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
          <SignupForm />
          <div>aqui va el gif</div>
        </div>
      </Container>
    </Layout>
  );
}

export default signup;

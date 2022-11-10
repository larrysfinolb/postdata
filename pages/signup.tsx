import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import { Container } from '@mantine/core';
import SignupForm from 'components/Forms/SignupForm';

function signup() {
  return (
    <Layout title="signup" Header={<Header />}>
      <Heading
        order={1}
        size="h1"
        styles={{
          textAlign: 'center',
        }}
      >
        Registrate para convertirte en usuario de Postdata
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
            gridTemplateColumns: '2fr 1fr',
            width: '100%',
            placeItems: 'center',
          }}
        >
          <SignupForm />
          <picture>
            <img
              src="https://efqndplvrwsimqbfyssn.supabase.co/storage/v1/object/sign/images/admin-login-lottie.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYWRtaW4tbG9naW4tbG90dGllLnN2ZyIsImlhdCI6MTY2NjcxNDAxNSwiZXhwIjoxOTgyMDc0MDE1fQ.0d3A_8FzsCoSvWIXa0_VKf_wVw0hG6CfXB6bQf6asdI"
              alt="Imagen Lottie que acompaña el inicio de sesión del panel de registrarse"
            />
          </picture>
        </div>
      </Container>
    </Layout>
  );
}

export default signup;

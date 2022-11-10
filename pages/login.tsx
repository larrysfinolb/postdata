import Layout from 'components/Layout';
import Header from 'components/HeaderUser';
import Heading from 'components/Heading';
import { Container } from '@mantine/core';
import LoginForm from 'components/Forms/LoginForm';

function Login() {
  return (
    <Layout title="signup" Header={<Header />}>
      <Heading
        order={1}
        size="h1"
        styles={{
          textAlign: 'center',
        }}
      >
        Inicia sesión
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
          <picture>
            <img
              src="https://efqndplvrwsimqbfyssn.supabase.co/storage/v1/object/sign/images/admin-login-lottie.svg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvYWRtaW4tbG9naW4tbG90dGllLnN2ZyIsImlhdCI6MTY2NjcxNDAxNSwiZXhwIjoxOTgyMDc0MDE1fQ.0d3A_8FzsCoSvWIXa0_VKf_wVw0hG6CfXB6bQf6asdI"
              alt="Imagen Lottie que acompaña el inicio de sesión del panel de login"
            />
          </picture>
        </div>
      </Container>
    </Layout>
  );
}

export default Login;

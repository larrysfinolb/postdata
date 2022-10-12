import Layout from 'components/Layout';
import type { NextPage } from 'next';
import Header from 'components/HeaderUser';

const Home: NextPage = () => {
  return (
    <Layout title="home" Header={<Header />}>
      <h1>Home</h1>
    </Layout>
  );
};

export default Home;

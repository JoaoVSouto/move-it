import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/client';

import { MenuBar } from '../components/MenuBar';

import styles from '../styles/pages/Leaderboard.module.scss';

export default function Leaderboard() {
  const [session, isLoading] = useSession();

  if (!session && !isLoading) {
    return <p>Acesso negado!</p>;
  }

  return (
    <main className={styles.container}>
      <Head>
        <title>Leaderboard | Move.it</title>
      </Head>

      <MenuBar />

      <div>
        <h1>Leaderboard</h1>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

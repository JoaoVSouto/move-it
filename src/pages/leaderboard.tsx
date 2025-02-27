import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/client';

import api from '../services/api';

import stringifyCookies from '../utils/stringifyCookies';

import { MenuBar } from '../components/MenuBar';
import { Leaderboard as LeaderboardTable } from '../components/Leaderboard';

import styles from '../styles/pages/Leaderboard.module.scss';

interface User {
  name: string;
  avatar_url: string;
  level: number;
  experience: number;
  challenges_completed: number;
}

interface LeaderboardProps {
  users: Array<User>;
}

export default function Leaderboard({ users }: LeaderboardProps) {
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

        <LeaderboardTable users={users} />
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

  const { data: users } = await api.get('/api/leaderboard', {
    headers: {
      Cookie: stringifyCookies(context.req.cookies),
    },
  });

  return {
    props: {
      users,
    },
  };
};

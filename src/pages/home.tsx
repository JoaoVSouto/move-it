import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/client';

import api from '../services/api';

import stringifyCookies from '../utils/stringifyCookies';

import { ChallengesProvider } from '../contexts/ChallengesContext';
import { CountdownProvider } from '../contexts/CountdownContext';

import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ChallengeBox } from '../components/ChallengeBox';

import styles from '../styles/pages/Home.module.scss';

interface HomeProps {
  level: number;
  totalExperience: number;
  challengesCompleted: number;
  userId: string;
}

export default function Home({
  level,
  totalExperience,
  challengesCompleted,
  userId,
}: HomeProps) {
  const [session, isLoading] = useSession();

  if (!session && !isLoading) {
    return <p>Acesso negado!</p>;
  }

  return (
    <main className={styles.container}>
      <Head>
        <title>Início | Move.it</title>
      </Head>

      <ChallengesProvider
        level={level}
        totalExperience={totalExperience}
        challengesCompleted={challengesCompleted}
        userId={userId}
      >
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </ChallengesProvider>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { req } = context;

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

  const { data: user } = await api.post(
    '/api/users',
    {},
    {
      headers: {
        Cookie: stringifyCookies(req.cookies),
      },
    }
  );

  return {
    props: {
      level: Number(user.data.level),
      totalExperience: Number(user.data.experience),
      challengesCompleted: Number(user.data.challenges_completed),
      userId: user.ref['@ref'].id,
    },
  };
};

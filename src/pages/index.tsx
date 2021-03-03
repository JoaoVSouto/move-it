import * as React from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, useSession, signIn } from 'next-auth/client';

import styles from '../styles/pages/Login.module.scss';

export default function Login() {
  const [session, isLoading] = useSession();

  const handleSignIn = React.useCallback(() => {
    signIn('github');
  }, []);

  if (session && !isLoading) {
    return <p>Acesso negado!</p>;
  }

  return (
    <main className={styles.loginContainer}>
      <Head>
        <title>Login | Move.it</title>
      </Head>

      <section>
        <img src="login-logo.svg" alt="Move.it" />

        <div>
          <strong>Bem-vindo</strong>
          <p>
            <img src="icons/github.svg" alt="Github" />
            Faça login com seu Github para começar
          </p>
          <button type="button" onClick={handleSignIn}>
            Entrar
          </button>
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await getSession(context);

  if (session) {
    return {
      props: {},
      redirect: {
        destination: '/home',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

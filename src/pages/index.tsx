import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { getSession, useSession } from 'next-auth/client';

import styles from '../styles/pages/Login.module.scss';

export default function Login() {
  const [session, isLoading] = useSession();

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
          <button type="button">Entrar</button>
        </div>
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { res } = context;

  const session = await getSession(context);

  if (session) {
    res.writeHead(301, {
      Location: '/home',
    });
    res.end();
  }

  return {
    props: {},
  };
};

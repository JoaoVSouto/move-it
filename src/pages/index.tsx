import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';

export default function Login() {
  const [session, isLoading] = useSession();

  if (session && !isLoading) {
    return <p>Acesso negado!</p>;
  }

  return (
    <main>
      <h1>login!</h1>
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

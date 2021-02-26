import Head from 'next/head';

import { ChallengesProvider } from '../contexts/ChallengesContext';

import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <ChallengesProvider>
        <Component {...pageProps} />
      </ChallengesProvider>
    </>
  );
}

export default MyApp;

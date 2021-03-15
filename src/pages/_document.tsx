import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-BR">
        <Head>
          <meta
            name="description"
            content="Move.it | Foque, exercite-se e ganhe níveis!"
          />
          <meta name="theme-color" content="#5965e0" />

          <meta property="og:site_name" content="Move.it" />
          <meta
            property="og:url"
            content="https://move-it-joaovsouto.vercel.app/"
          />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="pt-BR" />
          <meta
            property="og:title"
            content="Move.it | Foque, exercite-se e ganhe níveis!"
          />
          <meta
            property="og:description"
            content="Move.it | Foque, exercite-se e ganhe níveis!"
          />
          <meta
            property="og:image"
            content="https://move-it-joaovsouto.vercel.app/moveit.png"
          />
          <meta
            property="twitter:image"
            content="https://move-it-joaovsouto.vercel.app/moveit.png"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon-16x16.png"
          />
          <link rel="manifest" href="site.webmanifest" />

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Rajdhani:wght@600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

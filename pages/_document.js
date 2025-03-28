import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* External CSS for nes.css */}
          <link
            rel="stylesheet"
            href="https://unpkg.com/nes.css/css/nes.min.css"
          />
          
          {/* External font (Press Start 2P) */}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

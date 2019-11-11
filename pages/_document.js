import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class TotoDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Rubik:300,400,500&display=swap"
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

export default TotoDocument;

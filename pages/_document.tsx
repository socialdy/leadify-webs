import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-Q3N39S9CXT" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {
            `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-Q3N39S9CXT');`
          }
        </Script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 
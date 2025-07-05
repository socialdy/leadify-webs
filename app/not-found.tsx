import Link from 'next/link';
import { HeroHeader } from '@/components/ui/Header';
import Footer from '@/components/ui/Footer';
import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Seite nicht gefunden | Leadify.at</title>
        <meta name="description" content="Die angeforderte Seite konnte auf Leadify.at nicht gefunden werden." />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Seite nicht gefunden | Leadify.at" />
        <meta property="og:description" content="Die angeforderte Seite konnte auf Leadify.at nicht gefunden werden." />
        <meta property="og:url" content="https://www.leadify.at/404" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/fav.ico" />
      </Head>
      <div className="flex flex-col min-h-screen">
        <HeroHeader />
        <main className="flex-grow flex flex-col items-center justify-center pt-45  text-center pb-15 bg-background text-foreground">
          <h1 className="text-6xl md:text-8xl font-bold text-[var(--color-primary)]">404</h1>
          <h2 className="text-2xl md:text-4xl font-semibold mt-4 mb-6">Seite nicht gefunden</h2>
          <p className="text-lg max-w-md">
            Entschuldigung, die Seite, die Sie suchen, existiert nicht. Möglicherweise wurde sie verschoben oder gelöscht.
          </p>
          <Link href="/" className="mt-8 px-6 py-3 bg-[var(--color-primary)] text-white rounded-lg shadow-md hover:bg-[var(--color-accent)] transition-colors duration-300">
            Zur Startseite
          </Link>
        </main>
        <Footer />
      </div>
    </>
  );
} 
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-[var(--background)] text-[var(--foreground)] p-4">
      <h1 className="text-6xl font-bold mb-4 text-[var(--color-primary)]">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Seite nicht gefunden</h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md">
        Entschuldigung, die Seite, die Sie suchen, konnte nicht gefunden werden.
        Möglicherweise haben Sie die Adresse falsch eingegeben oder die Seite wurde verschoben.
      </p>
      <Link href="/">
        <Button className="button-21 px-8 py-4 text-lg">
          Zur Startseite
        </Button>
      </Link>
    </div>
  );
} 
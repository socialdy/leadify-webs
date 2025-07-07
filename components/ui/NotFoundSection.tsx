import React from 'react';
import Link from 'next/link';
import { Button } from './button';

export default function NotFoundSection({ className }: { className?: string }) {
  return (
    <section className={`w-full max-w-4xl mx-auto py-2 md:py-4 px-4 text-center ${className || ''}`}>
      <h3 className="text-lg font-medium text-[var(--foreground)] mb-1">Nicht gefunden wonach Du suchst?</h3>
      <p className="text-base text-[var(--foreground)] opacity-80 mb-4">Uns stehen alle Branchen österreichweit zur Verfügung.</p>
      <Link href="/#kontakt">
        <Button 
          className="button-21"
        >
          Sende uns deine Anfrage
        </Button>
      </Link>
    </section>
  );
} 
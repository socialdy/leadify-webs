import React from 'react';
import Link from 'next/link';

export default function NotFoundSection({ className }: { className?: string }) {
  return (
    <section className={`w-full max-w-4xl mx-auto py-2 md:py-4 px-4 text-center ${className || ''}`}>
      <h3 className="text-lg font-medium text-[var(--foreground)] mb-1">Nicht gefunden wonach Du suchst?</h3>
      <p className="text-base text-[var(--foreground)] opacity-80 mb-4">Uns stehen alle Branchen österreichweit zur Verfügung.</p>
      <Link
        href="#kontakt"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 button-21"
      >
         Sende uns deine Anfrage
      </Link>
    </section>
  );
} 
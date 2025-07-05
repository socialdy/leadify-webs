import React from 'react';
import Link from 'next/link';

export default function CallToAction2({ className }: { className?: string }) {
  return (
    <section className={`w-full max-w-4xl mx-auto py-12 md:py-24 px-4 text-center ${className || ''}`}>
      <h2 className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-6">
        Jetzt Zeit sparen und Leads günstig kaufen
      </h2>
      <p className="text-base text-[var(--foreground)] opacity-80 mb-8">
        Entdecke jetzt hochwertige Firmenadressen und B2B-Leads speziell für Dein Unternehmen in Österreich. 
        Steigere Deinen Vertriebserfolg mit präzisen und aktuellen Daten.
      </p>
      <Link 
        href="/firmensuche"
        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 button-21"
      >
        <span className="font-normal">Jetzt Firmensuche starten</span>
      </Link>
    </section>
  );
} 
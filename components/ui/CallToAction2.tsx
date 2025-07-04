import React from 'react';
import { Button } from './button';

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
      <Button 
        className="button-21"
        onClick={() => document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="font-normal">Sende uns deine Anfrage</span>
      </Button>
    </section>
  );
} 
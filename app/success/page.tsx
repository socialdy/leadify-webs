import { Metadata } from 'next';
import React from 'react';
import { CheckCircleIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] py-32 px-4 sm:px-6 lg:px-8 text-center">
      <CheckCircleIcon className="w-24 h-24 text-green-500 mb-6" />
      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl mb-4">
        Vielen Dank für Ihre Zahlung!
      </h1>
      <p className="mt-3 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
        Ihre Rechnung und die Leads (im Excel- und CSV-Format) werden Ihnen in Kürze per E-Mail zugeschickt. Dies kann einige Minuten dauern, abhängig von der Anzahl der Leads.
      </p>
      <p className="mt-2 text-base sm:text-lg text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed mb-8">
        Bei offenen Fragen oder Problemen kontaktieren Sie uns bitte jederzeit unter:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 w-full max-w-4xl">
        <div className="flex flex-col items-center p-5 bg-[var(--card)] rounded-lg shadow-md border border-[var(--border)] text-center">
          <MapPinIcon className="w-8 h-8 text-[var(--color-accent)] mb-3" />
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">Adresse</h3>
          <p className="text-sm text-[var(--foreground)] leading-relaxed">
            Scheierlweg 14<br/>
            5303 Thalgau
          </p>
        </div>

        <div className="flex flex-col items-center p-5 bg-[var(--card)] rounded-lg shadow-md border border-[var(--border)] text-center">
          <PhoneIcon className="w-8 h-8 text-[var(--color-accent)] mb-3" />
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">Telefon</h3>
          <p className="text-sm text-[var(--foreground)] leading-relaxed">
            <a href="tel:+436604252271" className="text-[var(--foreground)] hover:text-[var(--color-accent)] duration-150">+43 660 425 2271</a>
          </p>
        </div>

        <div className="flex flex-col items-center p-5 bg-[var(--card)] rounded-lg shadow-md border border-[var(--border)] text-center">
          <MailIcon className="w-8 h-8 text-[var(--color-accent)] mb-3" />
          <h3 className="text-lg font-bold text-[var(--foreground)] mb-1">E-Mail</h3>
          <p className="text-sm text-[var(--foreground)] leading-relaxed">
            <a href="mailto:support@leadify.at" className="text-[var(--foreground)] hover:text-[var(--color-accent)] duration-150">support@leadify.at</a>
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button asChild className="button-21">
          <Link href="/">Zurück zur Startseite</Link>
        </Button>
      </div>
    </div>
  );
} 
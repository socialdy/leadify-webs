'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from "sonner";

export default function CanceledPaymentHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const canceled = searchParams.get('canceled');
    if (canceled === 'true') {
      toast.error("Zahlung abgebrochen!", {
        description: <p>Ihre Zahlung wurde abgebrochen. Falls Sie Probleme hatten, <a href="#kontakt" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>kontaktieren Sie uns bitte</a>.</p>,
        position: "bottom-right",
        duration: 8000,
      });
      router.replace('/');
    }
  }, [searchParams, router]);

  return null; // Diese Komponente rendert nichts visuelles
} 
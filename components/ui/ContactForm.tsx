import React, { useState, FormEvent } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setFeedbackMessage(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setFeedbackMessage(result.message);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); // Formular leeren
      } else {
        setStatus('error');
        setFeedbackMessage(result.message || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.');
      }
    } catch (error) {
      console.error('Fehler beim Senden des Formulars:', error);
      setStatus('error');
      setFeedbackMessage('Netzwerkfehler oder Server nicht erreichbar.');
    }
  };

  return (
    <section id="kontakt" className="w-full py-24 md:py-48 bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl text-[var(--foreground)] mb-4">
            Kontakt aufnehmen
          </h2>
          <p className="mt-4 text-base md:text-lg text-[var(--foreground)] opacity-80 max-w-3xl mx-auto leading-relaxed">
            Du hast Fragen, spezielle Wünsche oder benötigst ein individuelles Angebot? Kontaktiere uns jetzt für eine persönliche Beratung und die perfekte Lösung für Dein Unternehmen.
          </p>
        </div>

        {/* Three Containers for Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="flex flex-col items-center p-6 bg-[var(--card)] rounded-lg shadow-md border border-[var(--border)] text-center">
            <MapPinIcon className="w-10 h-10 text-[var(--color-accent)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Adresse</h3>
            <p className="text-base text-[var(--foreground)] leading-relaxed">
              Scheierlweg 14<br/>
              5303 Thalgau
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-[var(--card)] rounded-lg shadow-md border border-[var(--border)] text-center">
            <PhoneIcon className="w-10 h-10 text-[var(--color-accent)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">Telefon</h3>
            <p className="text-base text-[var(--foreground)] leading-relaxed">
              <Link href="tel:+436604252271" className="text-[var(--foreground)] hover:text-[var(--color-accent)] hover:underline">+43 660 425 2271</Link>
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-[var(--card)] rounded-lg shadow-md border border-[var(--border)] text-center">
            <MailIcon className="w-10 h-10 text-[var(--color-accent)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">E-Mail</h3>
            <p className="text-base text-[var(--foreground)] leading-relaxed">
              <Link href="mailto:support@leadify.at" className="text-[var(--foreground)] hover:text-[var(--color-accent)] hover:underline">support@leadify.at</Link>
            </p>
          </div>
        </div>

        {/* Contact Form below the containers */}
        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <Label htmlFor="name" className="text-[var(--foreground)]">Name <span className="text-red-500">*</span></Label>
              <Input id="name" type="text" placeholder="Ihr Name" className="bg-[var(--card)] text-base text-[var(--foreground)] border-[var(--border)] mt-2 p-3" required value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="email" className="text-[var(--foreground)]">E-Mail <span className="text-red-500">*</span></Label>
              <Input id="email" type="email" placeholder="Ihre E-Mail Adresse" className="bg-[var(--card)] text-base text-[var(--foreground)] border-[var(--border)] mt-2 p-3" required value={formData.email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="phone" className="text-[var(--foreground)]">Telefonnummer</Label>
              <Input id="phone" type="tel" placeholder="Ihre Telefonnummer" className="bg-[var(--card)] text-base text-[var(--foreground)] border-[var(--border)] mt-2 p-3" value={formData.phone} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="subject" className="text-[var(--foreground)]">Betreff <span className="text-red-500">*</span></Label>
              <Input id="subject" type="text" placeholder="Betreff Ihrer Anfrage" className="bg-[var(--card)] text-base text-[var(--foreground)] border-[var(--border)] mt-2 p-3" required value={formData.subject} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="message" className="text-[var(--foreground)]">Nachricht <span className="text-red-500">*</span></Label>
              <Textarea id="message" placeholder="Ihre Nachricht" className="bg-[var(--card)] text-base text-[var(--foreground)] border-[var(--border)] h-32 mt-2 p-3" required value={formData.message} onChange={handleChange} />
            </div>
            <div className="text-center">
              <Button type="submit" className="button-21" disabled={status === 'loading'}>
                {status === 'loading' ? 'Senden...' : 'Jetzt Anfrage senden'}
              </Button>
              {feedbackMessage && (
                <p className={`mt-4 ${status === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                  {feedbackMessage}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 
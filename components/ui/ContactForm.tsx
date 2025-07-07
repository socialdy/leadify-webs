import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PhoneIcon, MailIcon, MapPinIcon } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !subject || !message) {
      toast.error("Fehler", {
        description: "Bitte füllen Sie alle erforderlichen Felder aus (Name, E-Mail, Betreff, Nachricht).",
        position: "bottom-right",
        duration: 5000,
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });

      if (response.ok) {
        toast.success("Erfolg", {
          description: "Ihre Nachricht wurde erfolgreich gesendet!",
          position: "bottom-right",
          duration: 5000,
        });
        // Clear form fields
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        const errorData = await response.json();
        toast.error("Fehler", {
          description: `Nachricht konnte nicht gesendet werden: ${errorData.message || response.statusText}`,
          position: "bottom-right",
          duration: 8000,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Fehler", {
        description: "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
        position: "bottom-right",
        duration: 8000,
      });
    } finally {
      setIsLoading(false);
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
              <a href="tel:+436604252271" className="text-[var(--foreground)] hover:text-[var(--color-accent)] duration-150">+43 660 425 2271</a>
            </p>
          </div>

          <div className="flex flex-col items-center p-6 bg-[var(--card)] rounded-lg shadow-md border border-[var(--border)] text-center">
            <MailIcon className="w-10 h-10 text-[var(--color-accent)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-2">E-Mail</h3>
            <p className="text-base text-[var(--foreground)] leading-relaxed">
              <a href="mailto:support@leadify.at" className="text-[var(--foreground)] hover:text-[var(--color-accent)] duration-150">support@leadify.at</a>
            </p>
          </div>
        </div>

        {/* Contact Form below the containers */}
        <div className="w-full max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <Label htmlFor="name" className="text-[var(--foreground)]">Name <span className="text-red-500">*</span></Label>
              <Input id="name" type="text" placeholder="Ihr Name" className="bg-[var(--card)] text-base text-[var(--foreground)] border-[var(--border)] mt-2 p-3" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="email" className="text-[var(--foreground)]">E-Mail <span className="text-red-500">*</span></Label>
              <Input id="email" type="email" placeholder="Ihre E-Mail Adresse" className="bg-[var(--card)] text-base text-[var(--foreground)] border-[var(--border)] mt-2 p-3" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="phone" className="text-[var(--foreground)]">Telefonnummer</Label>
              <Input id="phone" type="tel" placeholder="Ihre Telefonnummer" className="bg-[var(--card)] text-base text-[var(--foreground)] border-[var(--border)] mt-2 p-3" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="subject" className="text-[var(--foreground)]">Betreff <span className="text-red-500">*</span></Label>
              <Input id="subject" type="text" placeholder="Betreff Ihrer Anfrage" className="bg-[var(--card)] text-base text-[var(--foreground)] border-[var(--border)] mt-2 p-3" required value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="message" className="text-[var(--foreground)]">Nachricht <span className="text-red-500">*</span></Label>
              <Textarea id="message" placeholder="Ihre Nachricht" className="bg-[var(--card)] text-base text-[var(--foreground)] border-[var(--border)] h-32 mt-2 p-3" required value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div className="text-center">
              <Button type="submit" className="button-21" disabled={isLoading}>
                {isLoading ? 'Senden...' : 'Jetzt Anfrage senden'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
} 
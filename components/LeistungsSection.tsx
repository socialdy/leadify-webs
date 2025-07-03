import { Mail, Phone, TrendingUp, BarChart2, Lightbulb, Server, Cloud, PackageCheck, HardDrive } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
}

const AnimatedCounter = ({ end, duration = 1000 }: CounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasBeenVisible = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenVisible.current) {
          hasBeenVisible.current = true;
          let startTimestamp: number | null = null;
          const animateCount = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const animatedValue = Math.min(progress / duration, 1) * end;
            setCount(Math.floor(animatedValue));

            if (progress < duration) {
              requestAnimationFrame(animateCount);
            } else {
              setCount(end); // Ensure it reaches the final value
            }
          };
          requestAnimationFrame(animateCount);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [end, duration]);

  return <div ref={ref} className="text-7xl md:text-9xl font-bold text-[var(--color-primary)]">{count.toLocaleString()}+</div>;
};

export default function LeistungsSection({ className, id }: { className?: string; id?: string }) {
    const applicationAreas = [
        {
            icon: Mail,
            title: 'Briefwerbung & Direktmailings',
            description: 'Perfektionieren Sie Ihre Briefwerbung. Mit unseren präzisen Adressen für Ihre Mailings erreichen Sie Ihre Zielgruppe direkt im Briefkasten und können diese mit persönlicher Anrede ansprechen. Ganz einfach, schnell und ohne viel Aufwand. Profitieren Sie von der hohen Aufmerksamkeitsrate gedruckter Werbung und einem professionellen Auftritt, der Ihre B2B-Kundenakquise spürbar steigert.',
        },
        {
            icon: Phone,
            title: 'Cold Calling',
            description: 'Kein mühsames Recherchieren und manuelles Extrahieren mehr: Unsere fertigen Daten inklusive Geschäftsführer-Kontakten lassen sich je nach Branche direkt in Ihr CRM einbinden. So können Sie sich voll auf effektive Kundenansprache konzentrieren.',
        },
        {
            icon: TrendingUp,
            title: 'E-Mail-Marketing',
            description: 'Maximieren Sie Reichweite und Konversionen mit E-Mail-Marketing-Kampagnen, die wir auch KI-gestützt für Sie aufsetzen. Unsere Firmenadressen ermöglichen Ihnen zielgerichtete Kampagnen mit personalisierten Inhalten.',
        },
        {
            icon: BarChart2,
            title: 'Wettbewerbsanalyse',
            description: 'Erlangen Sie fundierte Einblicke in Ihre Konkurrenz. Mit unseren B2B-Daten stärken Sie Ihre Marktposition strategisch und nachhaltig.',
        },
        {
            icon: Lightbulb,
            title: 'Marktanalysierung',
            description: 'Identifizieren Sie ungenutzte Potenziale und zukünftige Markttrends. Unsere hochwertigen Firmenadressen bilden die Basis für fundierte strategische Entscheidungen.',
        },
        {
            icon: HardDrive,
            title: 'Unternehmensdaten für Ihre Software',
            description: 'Integrieren Sie präzise Unternehmensdaten und B2B-Leads nahtlos über einfache Excel-Importe in Ihre bestehenden CRM- oder ERP-Systeme – für maximale Effizienz und optimierte Prozesse.',
        },
        {
            icon: Cloud,
            title: 'SaaS Datenanreicherung',
            description: 'Erweitern und optimieren Sie Ihre SaaS-Datenbank mit intelligenten und aktuellen Firmenadressen für verbesserte Datenqualität.',
        },
        {
            icon: PackageCheck,
            title: 'Erweiterung Ihrer bestehenden Datenbank',
            description: 'Vergrößern und aktualisieren Sie Ihre Kundendatenbank mit frischen, qualifizierten B2B Leads und Firmenadressen aus Österreich.',
        },
    ];

    return (
        <section id={id} className={`py-24 md:py-40 bg-[var(--background)] ${className || ''}`}>
            {/* Introduction - Leadify Features */}
            <div className="mx-auto max-w-5xl px-4 md:px-8 text-center mb-12 md:mb-24">
                <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl text-[var(--foreground)] mb-4">
                    Unsere Leistungen
                </h2>
                <p className="mt-4 text-base md:text-base text-[var(--foreground)] opacity-80 max-w-3xl mx-auto leading-relaxed">
                    Mit unseren Leads und Leistungen können wir Sie in folgenden Bereichen unterstützen.
                </p>
            </div>

            {/* Application Areas - Re-designed grid (screenshot style) */}
            <div className="mx-auto w-full px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {applicationAreas.slice(0, 6).map((area, index) => {
                        const Icon = area.icon;
                        return (
                            <div
                                key={index}
                                className="p-10 rounded-2xl bg-[var(--color-primary)] shadow-md border border-[var(--color-primary)] flex flex-col items-center md:items-start text-center md:text-left h-[670px]"
                            >
                                <div className="mb-6 flex-shrink-0">
                                    <Icon className="w-10 h-10 text-white" />
                                </div>
                                <h4 className="font-bold text-2xl text-white mb-3">{area.title}</h4>
                                <p className="text-base text-white opacity-80 leading-relaxed">
                                    {area.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Counter Section - Massive Impact (no card background) */}
            <div className="mx-auto max-w-4xl px-4 md:px-8 mt-48 md:mt-72 text-center">
                <p className="text-base md:text-xl text-[var(--foreground)] opacity-80 mb-6">Bereits über</p>
                <AnimatedCounter end={647341} duration={6000} />
                <p className="text-base md:text-xl text-[var(--foreground)] opacity-80 mt-6">qualifizierte österreichische Unternehmen in unserer Datenbank</p>
            </div>
        </section>
    );
}
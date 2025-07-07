import Head from "next/head";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { HeroHeader as Header } from "../../components/ui/Header";
import Footer from "../../components/ui/Footer";
import { MarqueeDemo } from "../../components/ui/marquee";
import LeadSearchSection from "../../components/ui/LeadSearchSection";
import Faqs from "../../components/faqs-2";
import WordRotate from "../../components/magicui/word-rotate";
import Pricing from "../../components/pricing";
import Testimonials from "../../components/testimonials";
import ProcessFlow from "../../components/ui/ProcessFlow";
import LeistungsSection from "@/components/LeistungsSection";
import CallToAction2 from "../../components/ui/CallToAction2";
import ContactForm from "../../components/ui/ContactForm";
import { Toaster } from "sonner";
import { GetStaticPaths, GetStaticProps } from 'next';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

// Liste der österreichischen Bundesländer
const bundeslaender = [
  { name: 'Burgenland', slug: 'burgenland' },
  { name: 'Kärnten', slug: 'kaernten' },
  { name: 'Niederösterreich', slug: 'niederoesterreich' },
  { name: 'Oberösterreich', slug: 'oberoesterreich' },
  { name: 'Salzburg', slug: 'salzburg' },
  { name: 'Steiermark', slug: 'steiermark' },
  { name: 'Tirol', slug: 'tirol' },
  { name: 'Vorarlberg', slug: 'vorarlberg' },
  { name: 'Wien', slug: 'wien' },
];

interface BundeslandPageProps {
  currentLand: {
    name: string;
    slug: string;
  };
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    keywords: string;
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = bundeslaender.map((land) => ({
    params: { slug: land.slug },
  }));

  return { paths, fallback: false }; // fallback: false bedeutet, dass 404 zurückgegeben wird, wenn der Pfad nicht existiert
};

export const getStaticProps: GetStaticProps<BundeslandPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const currentLand = bundeslaender.find((land) => land.slug === slug);

  if (!currentLand) {
    return {
      notFound: true,
    };
  }

  // Dynamische SEO-Texte basierend auf dem Bundesland, orientiert an index.tsx
  const seo = {
    title: `Firmenadressen kaufen ${currentLand.name} | B2B Leads - Leadify.at`,
    description: `Firmenadressen in ${currentLand.name} kaufen: Präzise B2B Leads mit Telefon, E-Mail & Ansprechpartnern. DSGVO-konform, sofortiger Download in Excel/CSV. Ideal für Marketing & Vertrieb in ${currentLand.name}.`,
    ogTitle: `Firmenadressen kaufen aus ${currentLand.name} | B2B Adressen aus ${currentLand.name} kaufen`,
    ogDescription: `Firmenadressen mit unlimitierter Nutzung günstig kaufen aus ${currentLand.name}. Starte die Suche für ${currentLand.name} Adressen. Kostenloses Angebot & sofortiger Excel & CSV Download`,
    keywords: `Leads ${currentLand.name}, Firmenadressen kaufen ${currentLand.name}, B2B Leads ${currentLand.name}, Direktmarketing ${currentLand.name}, Unternehmensdaten ${currentLand.name}`,
  };

  return {
    props: {
      currentLand,
      seo,
    },
  };
};

export default function BundeslandPage({ currentLand, seo }: BundeslandPageProps) {
  const dynamicBranchesWords = [
    "Softwareentwickler", "Kreativagenturen", "Unternehmensberater", "IT-Dienstleister",
    "Architekturbüros", "Einzelhändler", "Hotels", "Restaurants", "Steuerberater",
    "Ärzte", "Rechtsanwälte", "Webdesigner", "Immobilienmakler", "Eventplaner",
  ];

  const dynamicCitiesWords = [
    "Wien", "Graz", "Linz", "Salzburg", "Innsbruck", "Klagenfurt", "Bregenz", "Eisenstadt",
  ].filter(city => {
    // Basic logic to show relevant cities for the state.
    // This could be made more sophisticated with a mapping if needed.
    if (currentLand.name === 'Wien') return city === 'Wien';
    if (currentLand.name === 'Steiermark') return city === 'Graz';
    if (currentLand.name === 'Oberösterreich') return city === 'Linz';
    if (currentLand.name === 'Salzburg') return city === 'Salzburg';
    if (currentLand.name === 'Tirol') return city === 'Innsbruck';
    if (currentLand.name === 'Kärnten') return city === 'Klagenfurt';
    if (currentLand.name === 'Vorarlberg') return city === 'Bregenz';
    if (currentLand.name === 'Burgenland') return city === 'Eisenstadt';
    return true; // For Niederösterreich, show all or default
  });


  return (
    <>
      <Head>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta property="og:title" content={seo.ogTitle} />
        <meta property="og:description" content={seo.ogDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={seo.keywords} />
        <link rel="icon" href="/fav.ico" />
      </Head>
      <div
        className={`${poppins.className} grid grid-rows-[auto_1fr_auto] min-h-screen bg-[var(--background)] overflow-x-hidden`}
      >
        <Header />
        <main className="pt-20 md:pt-30 lg:pt-40 overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[var(--foreground)] mb-4 break-words text-center">
                Firmenadressen kaufen <br/> {currentLand.name}
              </h1>
              <p className="text-base md:text-sm text-[var(--foreground)] max-w-2xl mx-auto mb-6">
                Firmenadressen günstig kaufen in {currentLand.name}. Starte jetzt die Suche nach B2B Adressen. Kostenloses Angebot & Sofortiger Kauf und Download in Excel, CSV und DSGVO konform. Daten aus {currentLand.name} mit Qualität.
              </p>

              <div className="flex gap-4 mb-10 justify-center mx-auto">
                <button
                  className="button-21"
                  role="button"
                  onClick={() => document.getElementById('firmensuche')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="text">
                    Jetzt Firmensuche starten in {currentLand.name}
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-6 mb-16 mx-auto w-full max-w-[160px] md:max-w-[160px] flex justify-center">
              <Image src="/img/website-badges-dsgvo-austria.png" alt="Trust Badges" width={150} height={75} className="w-[120px] h-auto md:w-full" />
            </div>

            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
              <section className="w-full my-8 md:my-16">
                <p className="text-base text-center font-medium text-[var(--foreground)]">Unternehmen die uns vertrauen in {currentLand.name}</p>
                <MarqueeDemo />
              </section>
            </div>

            <section id="firmensuche">
              <LeadSearchSection className="my-8 md:my-16" defaultState={currentLand.name}></LeadSearchSection>
            </section>

            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
              {/* <NotFoundSection className="my-8 md:my-16" /> */}

              <div className="flex items-center justify-center my-8 md:my-16 text-center flex-wrap w-full">
                <h2 className="text-2xl md:text-5xl font-bold text-[var(--foreground)] leading-tight flex items-center justify-center flex-wrap">
                  Ich suche alle
                  <WordRotate
                    words={dynamicBranchesWords}
                    duration={4000}
                    className="inline-block text-[var(--color-primary)] align-baseline"
                  />
                  <span className="inline-block align-baseline">aus</span>
                  <WordRotate
                    words={dynamicCitiesWords}
                    duration={4000}
                    className="inline-block text-[var(--color-primary)] align-baseline"
                  />
                </h2>
              </div>

              <section id="ablauf" className=" w-full">
                  <ProcessFlow />
              </section>
            </div>

            <LeistungsSection id="leistungen" className="my-4 md:my-8" />

            <section id="kunden" className="py-8 md:py-16 w-full">
                <Testimonials />
            </section>

            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
              <CallToAction2 className="my-8 md:my-16" />

              <section id="preise" className="py-8 md:py-16 w-full">
                  <Pricing />
              </section>

              <section id="faq" className="py-8 md:py-16 w-full">
                  <Faqs />
              </section>

              <ContactForm />
            </div>
          </div>
        </main>

        <Footer />
      </div>
      <Toaster />
    </>
  );
} 
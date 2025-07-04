import Head from "next/head";
import Image from "next/image";
import { Poppins } from "next/font/google";
import { HeroHeader as Header } from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import { MarqueeDemo } from "../components/ui/marquee";
import LeadSearchSection from "../components/ui/LeadSearchSection";
import NotFoundSection from "../components/ui/NotFoundSection";
import Faqs from "../components/faqs-2";
import WordRotate from "../components/magicui/word-rotate";
import Pricing from "../components/pricing";
import Testimonials from "../components/testimonials";
import ProcessFlow from "../components/ui/ProcessFlow";
import LeistungsSection from "@/components/LeistungsSection";
import CallToAction2 from "../components/ui/CallToAction2";
import ContactForm from "../components/ui/ContactForm";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function Home() {
  const router = useRouter();
  const [showCancelMessage, setShowCancelMessage] = useState(false);

  useEffect(() => {
    if (router.query.canceled === 'true') {
      toast.error("Zahlung abgebrochen!", {
        description: <p>Ihre Zahlung wurde abgebrochen. Falls Sie Probleme hatten, <span style={{ color: 'var(--color-primary)' }}>kontaktieren</span> Sie uns bitte.</p>,
        position: "bottom-right",
        duration: 8000,
      });
      router.replace('/', undefined, { shallow: true });
    }
  }, [router.query.canceled, router]);

  // Define a subset of branches for the WordRotate component
  const dynamicBranchesWords = [
    "Softwareentwickler",
    "Kreativagenturen",
    "Unternehmensberater",
    "IT-Dienstleister",
    "Architekturbüros",
    "Einzelhändler",
    "Hotels",
    "Restaurants",
    "Steuerberater",
    "Ärzte",
    "Rechtsanwälte",
    "Webdesigner",
    "Immobilienmakler",
    "Eventplaner",
  ];

  return (
    <>
      <Head>
        <title>Firmenadressen kaufen Österreich | B2B Leads - Leadify.at</title>
        <meta name="description" content="Firmenadressen in Österreich kaufen: Präzise B2B Leads mit Telefon, E-Mail & Ansprechpartnern. DSGVO-konform, sofortiger Download in Excel/CSV. Ideal für Marketing & Vertrieb." />
        <meta property="og:title" content="Firmenadressen kaufen aus Österreich | B2B Adressen aus Österreich kaufen" />
        <meta property="og:description" content="Firmenadressen mit unlimitierter Nutzung günstig kaufen aus Österreich. Starte die Suche für österreichische Adressen. Kostenloses Angebot &amp; sofortiger Excel &amp; CSV Download" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Leads Österreich, Firmenadressen kaufen, B2B Leads, Direktmarketing Österreich, Unternehmensdaten" />
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
                Firmenadressen kaufen <br/> Österreich
              </h1>
              <p className="text-base md:text-sm text-[var(--foreground)] max-w-2xl mx-auto mb-6">
                Firmenadressen günstig kaufen in Österreich. Starte jetzt die Suche nach B2B Adressen. Kostenloses Angebot & Sofortiger Kauf und Download in Excel, CSV und DSGVO konform. Daten aus Österreich mit Qualität.
              </p>

              <div className="flex gap-4 mb-10 justify-center mx-auto">
                <button
                  className="button-21"
                  role="button"
                  onClick={() => document.getElementById('firmensuche')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span className="text">
                    Jetzt Firmensuche starten
                  </span>
                </button>
              </div>

              {/* Secure Payment Section */}
              {/* Moved to below LeadSearchSection */}
            </div> {/* Close max-w-4xl div here */}

            {/* Image Badges outside the max-w-4xl div */}
            <div className="mt-6 mb-16 mx-auto w-full max-w-[160px] md:max-w-[160px] flex justify-center">
              <Image src="/img/website-badges-dsgvo-austria.png" alt="Trust Badges" width={150} height={75} className="w-[120px] h-auto md:w-full" />
            </div>

            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center"> {/* Open new max-w-4xl div here for subsequent content */}
              {/* Avatar Images */}
              {/* Removed avatar images as requested */}

              {/* Removed Badge components as requested */}

              {/* Marquee section moved inside main */}
              <section className="w-full my-8 md:my-16">
                <p className="text-base text-center font-medium text-[var(--foreground)]">Unternehmen die uns vertrauen</p>
                <MarqueeDemo />
              </section>
            </div>

            {/* New Lead Search Section outside the max-w-4xl div */}
            <section id="firmensuche">
              <LeadSearchSection className="my-8 md:my-16"></LeadSearchSection>
            </section>

            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
              {/* Not Found Section - Moved here */}
              <NotFoundSection className="my-8 md:my-16" />

              {/* Animated Industry Search Text - Moved here */}
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
                    words={[
                      "Wien",
                      "Graz",
                      "Linz",
                      "Salzburg",
                      "Innsbruck",
                      "Klagenfurt",
                      "Bregenz",
                      "Eisenstadt",
                    ]}
                    duration={4000}
                    className="inline-block text-[var(--color-primary)] align-baseline"
                  />
                </h2>
              </div>

              {/* Process Flow Section */}
              <section id="ablauf" className=" w-full">
                  <ProcessFlow />
              </section>
            </div>

            {/* LeistungsSection outside the max-w-4xl div */}
            <LeistungsSection id="leistungen" className="my-4 md:my-8" />

            {/* Testimonials */}
            <section id="kunden" className="py-8 md:py-16 w-full">
                <Testimonials />
            </section>

            <div className="max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center">
              {/* Call to Action 2 */}
              <CallToAction2 className="my-8 md:my-16" />

              {/* Pricing Section */}
              <section id="preise" className="py-8 md:py-16 w-full">
                  <Pricing />
              </section>

              {/* FAQ Section */}
              <section id="faq" className="py-8 md:py-16 w-full">
                  <Faqs />
              </section>

              {/* Contact Form Section */}
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

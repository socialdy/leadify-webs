import Head from "next/head";
import { Poppins } from "next/font/google";
import { HeroHeader as Header } from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function ImpressumPage() {
  return (
    <>
      <Head>
        <title>Impressum | Leadify.at - Rechtliche Informationen & Kontakt</title>
        <meta name="description" content="Impressum von Leadify mit allen rechtlich erforderlichen Angaben, Kontaktinformationen, UID-Nummer und Details zur Gewerbeordnung." />
        <meta name="keywords" content="Impressum, Leadify.at, Kontakt, rechtliche Informationen, Firmeninformationen, UID-Nummer, Datenschutzbeauftragter, Werbeagentur Österreich" />
        <meta property="og:title" content="Impressum | Leadify.at - Rechtliche Informationen & Kontakt" />
        <meta property="og:description" content="Impressum von Leadify mit allen rechtlich erforderlichen Angaben, Kontaktinformationen, UID-Nummer und Details zur Gewerbeordnung." />
        <meta property="og:url" content="https://www.leadify.at/impressum" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/fav.ico" />
      </Head>
      <div className="min-h-screen bg-[var(--background)] flex flex-col overflow-hidden">
        <Header />
        <main className={`flex-grow pt-20 md:pt-30 lg:pt-40 py-8 ${poppins.className}`}>
          <div className="max-w-screen-xl mx-auto  sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-8 text-center">Impressum</h1>
            <div className="max-w-3xl mx-auto text-muted-foreground text-center lg:text-left">
              <section className="mb-8  bg-white/5 border border-white/10 rounded-lg space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Leadify</h3>
                  <p>Markus Wallner</p>
                  <p>Scheierlweg 14</p>
                  <p>5303 Thalgau</p>
                  <p className="mt-2">Unternehmensgegenstand: Werbeagentur</p>
                  <p>UID-Nummer: ATU78676112</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Kontakt</h3>
                  <p>Tel.: <a href="tel:+436604252271" className="hover:text-[var(--color-accent)]">+43 660 425 2271</a></p>
                  <p>E-Mail: <a href="mailto:support@leadify.at" className="hover:text-[var(--color-accent)]">support@leadify.at</a></p>
                  <p className="mt-3">Mitglied bei: WKO, Landesinnung, etc.</p>
                  <p>Gewerbeordnung: <a href="https://www.ris.bka.gv.at" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] underline">www.ris.bka.gv.at</a></p>
                  <p>Aufsichtsbehörde/Gewerbebehörde: Bezirkshauptmannschaft Salzburg</p>
                  <p>Verleihungsstaat: Österreich</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Kontaktdaten des Verantwortlichen für Datenschutz</h3>
                  <p>Sollten Sie Fragen zum Datenschutz haben, finden Sie nachfolgend die Kontaktdaten der verantwortlichen Person bzw. Stelle:</p>
                  <p className="mt-3 font-bold">Social Dynamics</p>
                  <p>Markus Wallner</p>
                  <p>Scheierlweg 14</p>
                  <p>5303 Thalgau</p>
                  <p className="mt-3">Tel.: <a href="tel:+436604252271" className="hover:text-[var(--color-accent)]">+43 660 425 2271</a></p>
                  <p>E-Mail: <a href="mailto:support@leadify.at" className="hover:text-[var(--color-accent)]">support@leadify.at</a></p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">EU-Streitschlichtung</h3>
                  <p>Gemäß Verordnung über Online-Streitbeilegung in Verbraucherangelegenheiten (ODR-Verordnung) möchten wir Sie über die Online-Streitbeilegungsplattform (OS-Plattform) informieren.</p>
                  <p>Verbraucher haben die Möglichkeit, Beschwerden an die Online-Streitbeilegungsplattform der Europäischen Kommission unter <a href="https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=DE" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] underline">https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=DE</a> zu richten. Die dafür notwendigen Kontaktdaten finden Sie oberhalb in unserem Impressum.</p>
                  <p className="mt-3">Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder verpflichtet sind, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Haftung für Inhalte dieser Website</h3>
                  <p>Wir entwickeln die Inhalte dieser Website ständig weiter und bemühen uns, korrekte und aktuelle Informationen bereitzustellen. Leider können wir keine Haftung für die Korrektheit aller Inhalte auf dieser Website übernehmen, speziell für jene, die seitens Dritter bereitgestellt wurden. Als Diensteanbieter sind wir nicht verpflichtet, die von Ihnen übermittelten oder gespeicherten Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
                  <p className="mt-3">Unsere Verpflichtungen zur Entfernung von Informationen oder zur Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen aufgrund von gerichtlichen oder behördlichen Anordnungen bleiben auch im Falle unserer Nichtverantwortlichkeit davon unberührt.</p>
                  <p className="mt-3">Sollten Ihnen problematische oder rechtswidrige Inhalte auffallen, bitten wir Sie, uns umgehend zu kontaktieren, damit wir die rechtswidrigen Inhalte entfernen können. Sie finden die Kontaktdaten im Impressum.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Haftung für Links auf dieser Website</h3>
                  <p>Unsere Website enthält Links zu anderen Websites, für deren Inhalt wir nicht verantwortlich sind. Haftung für verlinkte Websites besteht für uns nicht, da wir keine Kenntnis rechtswidriger Tätigkeiten hatten und haben, uns solche Rechtswidrigkeiten auch bisher nicht aufgefallen sind und wir Links sofort entfernen würden, wenn uns Rechtswidrigkeiten bekannt werden.</p>
                  <p className="mt-3">Wenn Ihnen rechtswidrige Links auf unserer Website auffallen, bitten wir Sie uns zu kontaktieren. Sie finden die Kontaktdaten im Impressum.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Urheberrechtshinweis</h3>
                  <p>Alle Inhalte dieser Webseite (Bilder, Fotos, Texte, Videos) unterliegen dem Urheberrecht. Bitte fragen Sie uns, bevor Sie die Inhalte dieser Website verbreiten, vervielfältigen oder verwerten, wie zum Beispiel auf anderen Websites erneut veröffentlichen. Falls notwendig, werden wir die unerlaubte Nutzung von Teilen der Inhalte unserer Seite rechtlich verfolgen.</p>
                  <p className="mt-3">Sollten Sie auf dieser Webseite Inhalte finden, die das Urheberrecht verletzen, bitten wir Sie, uns zu kontaktieren.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">Bildernachweis</h3>
                  <p>Die Bilder, Fotos und Grafiken auf dieser Webseite sind urheberrechtlich geschützt. Die Bilderrechte liegen bei:</p>
                  <ul className="list-disc list-inside ml-4 mt-2">
                    <li>Unsplash</li>
                    <li>Behance</li>
                    <li>Pexels</li>
                  </ul>
                  <p className="mt-3">Alle Texte sind urheberrechtlich geschützt.</p>
                </div>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
} 
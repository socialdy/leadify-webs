import Head from "next/head";
import { Poppins } from "next/font/google";
import { HeroHeader as Header } from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function DatenschutzPage() {
  return (
    <>
      <Head>
        <title>Datenschutzerklärung | Leadify.at - Informationen zur Datenverarbeitung</title>
        <meta name="description" content="Erfahren Sie, wie Ihre Daten verarbeitet werden, welche Rechte Sie haben und wie wir Ihre Privatsphäre schützen. DSGVO-konform." />
        <meta name="keywords" content="Datenschutzerklärung, Leadify.at, Datenschutz, DSGVO, Datenverarbeitung, Nutzerrechte, Privatsphäre, Cookie-Richtlinie, Google Analytics" />
        <meta property="og:title" content="Datenschutzerklärung | Leadify.at - Informationen zur Datenverarbeitung" />
        <meta property="og:description" content="Erfahren Sie, wie Ihre Daten verarbeitet werden, welche Rechte Sie haben und wie wir Ihre Privatsphäre schützen. DSGVO-konform." />
        <meta property="og:url" content="https://www.leadify.at/datenschutz" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/fav.ico" />
      </Head>
      <div className="min-h-screen bg-[var(--background)] flex flex-col overflow-hidden">
        <Header />
        <main className={`${poppins.className} flex-grow pt-20 md:pt-30 lg:pt-40 py-8`}>
          <div className="max-w-4xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-8 text-center">Datenschutzerklärung</h1>
            <div className="max-w-3xl mx-auto text-muted-foreground text-center lg:text-left">
              <section className="mb-8 p-6 bg-white/5 border border-white/10 rounded-lg space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">1. Inhalt des Onlineangebotes:</h3>
                  <p>Der Autor übernimmt keinerlei Gewähr für die Aktualität, Richtigkeit und Vollständigkeit der bereitgestellten Informationen auf unserer Website. Haftungsansprüche gegen den Autor, die sich auf Schäden materieller oder ideeller Art beziehen, die durch die Nutzung oder Nichtnutzung der dargebotenen Informationen bzw. durch die Nutzung fehlerhafter und unvollständiger Informationen verursacht wurden, sind grundsätzlich ausgeschlossen, sofern seitens des Autors kein nachweislich vorsätzliches oder grob fahrlässiges Verschulden vorliegt. Alle Angebote sind freibleibend und unverbindlich.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">2. Verweise und Links:</h3>
                  <p>Bei direkten oder indirekten Verweisen auf fremde Webseiten (&quot;Hyperlinks&quot;), die außerhalb des Verantwortungsbereiches des Autors liegen, tritt eine Haftungsverpflichtung nur in Kraft, wenn der Autor Kenntnis von den Inhalten der verlinkten Seite hat und es ihm technisch möglich und zumutbar gewesen wäre, die Nutzung im Falle rechtswidriger Inhalte zu verhindern. Der Autor hat keinerlei Einfluss auf die aktuelle und zukünftige Gestaltung, Inhalte oder Urheberschaft der verlinkten Seiten. Eine Haftung für illegale, fehlerhafte oder unvollständige Inhalte wird ausdrücklich ausgeschlossen.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">3. Urheber- und Kennzeichenrecht:</h3>
                  <p>Der Autor ist bestrebt, in allen Publikationen die Urheberrechte der verwendeten Bilder, Grafiken, Tondokumente, Videosequenzen und Texte zu beachten. Alle innerhalb des Internetangebotes genannten Marken und Warenzeichen unterliegen den Bestimmungen des Kennzeichenrechts und den Besitzrechten der jeweiligen eingetragenen Eigentümer. Das Copyright für veröffentlichte, vom Autor selbst erstellte Objekte bleibt beim Autor. Eine Vervielfältigung oder Verwendung dieser Inhalte ohne ausdrückliche Zustimmung des Autors ist nicht gestattet.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">4. Datenschutz:</h3>
                  <p>Sofern innerhalb des Internetangebotes die Möglichkeit zur Eingabe persönlicher oder geschäftlicher Daten (wie E-Mail-Adressen, Namen, Anschriften) besteht, erfolgt die Preisgabe dieser Daten auf freiwilliger Basis. Die Inanspruchnahme aller angebotenen Dienste ist, soweit technisch möglich, auch ohne Angabe solcher Daten oder unter Angabe anonymisierter Daten gestattet. Die Nutzung der veröffentlichten Kontaktdaten zur Übersendung von unaufgeforderter Werbung ist nicht gestattet.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">5. Datenschutzerklärung für die Nutzung von Google Analytics:</h3>
                  <p>Diese Website verwendet Google Analytics, einen Webanalysedienst von Google. Google Analytics verwendet Cookies, die auf Ihrem Computer gespeichert werden, um die Nutzung der Website zu analysieren. Die durch das Cookie erzeugten Informationen werden an Server von Google übertragen und dort gespeichert. Die IP-Adresse wird in der Regel innerhalb der EU gekürzt, nur in Ausnahmefällen wird die vollständige IP-Adresse übertragen und dort gekürzt. Weitere Informationen zur Datenschutzerklärung von Google Analytics finden Sie unter: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] underline">Google Analytics Datenschutzübersicht</a>. Sie können die Erfassung durch Google Analytics verhindern, indem Sie auf folgenden Link klicken: <a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-accent)] underline">Google Analytics Opt-Out Browser Add-On</a></p>
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
import Head from "next/head";
import { Poppins } from "next/font/google";
import { HeroHeader as Header } from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export default function AgbPage() {
  return (
    <>
      <Head>
        <title>Allgemeine Geschäftsbedingungen | Leadify.at - günstig Firmenadressen & B2B Leads kaufen</title>
        <meta name="description" content="Allgemeine Geschäftsbedingungen von Leadify.at." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen bg-[var(--background)] flex flex-col overflow-hidden">
        <Header />
        <main className={`flex-grow pt-20 md:pt-30 lg:pt-40 py-8 ${poppins.className}`}>
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-8 text-center">Allgemeine Geschäftsbedingungen</h1>
            <div className="max-w-3xl mx-auto text-muted-foreground text-center lg:text-left">
              <section className="mb-8 p-6 bg-white/5 border border-white/10 rounded-lg space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">1 Rahmenbedingungen für alle Leistungen</h3>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.1 Geltungsbereich</h4>
                  <p>Unsere Lieferungen, Leistungen und Angebote erfolgen, soweit nicht ausdrücklich schriftlich anderweitig vereinbart, ausschließlich aufgrund dieser Geschäftsbedingungen. Abweichende Bedingungen des Kunden, die wir nicht ausdrücklich anerkennen, sind für uns unverbindlich, auch wenn wir ihnen nicht ausdrücklich widersprechen.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.2 Vertragsschluss</h4>
                  <p>Der Vertrag mit dem Kunden kommt erst mit unserer Auftragsbestätigung bzw. mit Ausführung des Auftrags zustande.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.3 Zahlungsbedingungen</h4>
                  <p>Es gelten die Preise gem. aktueller Preisliste bzw. Auftragsbestätigung. Alle Preise sind Nettopreise zzgl. MwSt., Verpackungs-, Versand- und sonstiger Nebenkosten. Unsere Rechnungen sind ohne Abzug sofort nach Erhalt fällig. Bei Zahlungsverzug oder Stundung sind Verzugszinsen bzw. Stundungszinsen in Höhe von 5 %-Punkten über dem jeweils fälligen Basiszinssatz zu zahlen. Gerät der Kunde mit einer bereits fälligen Zahlungsverpflichtung aus dem Vertrag in Zahlungsverzug, so sind wir berechtigt, die bei normalem Verlauf erst später zu erfüllende Restschuld auch sofort fällig zu stellen.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.4 Lieferung</h4>
                  <p>Der Liefertermin ergibt sich aus der Auftragsbestätigung und ist grundsätzlich unverbindlich. Die angegebenen Liefertermine beziehen sich auf den Übergabezeitpunkt an die zum Transport bestimmte Person oder Anstalt. Durch den Kunden oder durch von ihm beauftragte Unternehmen oder Personen verursachte Verzögerungen (Änderungswünsche, verspätete Informationsbereitstellung o.ä.) können die Liefertermine auch über den zeitlichen Rahmen der Verzögerung hinaus verlängern. Anspruch auf vorrangige Bearbeitung verspäteter Aufträge besteht nicht. Höhere Gewalt, Arbeitskämpfe, unverschuldetes Unvermögen auf unserer Seite oder auf der Seite unserer Vorlieferanten verlängern die Liefer- bzw. Leistungsfrist um die Dauer der Behinderung.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.5 Versand</h4>
                  <p>Der Versand erfolgt stets auf Rechnung und Gefahr des Kunden. Verzögert sich der Versand aus Gründen, die der Kunde zu vertreten hat, so geht die Gefahr mit Anzeige der Versandbereitschaft auf den Kunden über.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.6 Geheimhaltung</h4>
                  <p>Wir sind Dritten gegenüber bezüglich Inhalt und Umfang der für den Auftraggeber zu erbringenden Leistungen und der vom Auftraggeber erhaltenen Daten zur Verschwiegenheit verpflichtet. Wir sind nicht berechtigt, Informationen, die im Rahmen einer Auftragsabwicklung zugänglich gemacht wurden, Dritten zu überlassen.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.7 Eigentumsvorbehalt</h4>
                  <p>Die gelieferte Ware bleibt bis zur vollständigen Bezahlung des Rechnungswertes unser Eigentum.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.8 Anwendbares Recht, Erfüllungsort, Gerichtsstand</h4>
                  <p>Erfüllungsort und Gerichtsstand ist Salzburg.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.9 Mehr- oder Minderlieferungen</h4>
                  <p>Firmenadressen und die zugehörigen Kommunikations-, Marketing- und Wirtschaftsinformationen unterliegen einem permanenten Änderungsprozess. Hierdurch bedingt können sich Abweichungen zu den in Publikationen oder Auftragsbestätigungen von uns genannten Stückzahlen ergeben. Eine daraus resultierende Mehr- oder Minderlieferung hat eine Anpassung des Preises gemäß Preisliste zur Folge, es sei denn, dass diese dem Auftraggeber im Einzelfalle unzumutbar ist.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.10 Verwendung der Adressen, Vertragsstrafe</h4>
                  <p>Leadify räumt dem Kunden ein zeitlich und räumlich unbeschränktes Nutzungsrecht an den gelieferten Daten ein, wenn es sich um vom Kunden gekaufte Daten handelt.</p>
                  <p>Leadify räumt dem Kunden kein exklusives Nutzungsrecht an den Daten ein. Die Veräußerung oder Überlassung an Dritte sowie die Nutzung für Verbundwerbung ist unzulässig. Leadify ist berechtigt, die Daten selber zu nutzen, sowie anderen Parteien Nutzungsrechte einzuräumen.</p>
                  <p>Leadify behält sich das Recht vor, dass ein geringer Anteil des gelieferten Datenmaterials mit Prüfdaten angereichert werden kann.</p>
                  <p>Leadify weist ausdrücklich darauf hin, dass der Kunde die gelieferten Daten für seine Werbe-, Kampagnen- und Marketingzwecke nur unter Berücksichtigung der jeweils geltenden Rechtslage, insbesondere des Wettbewerbs- und Datenschutzrechts, verwenden darf.</p>
                  <p>Der Kunde ist verpflichtet, eigenständig zu überprüfen, inwieweit und in welchem Umfang die übermittelten Daten in seinem Unternehmen datenschutzrechtlich gespeichert werden dürfen. Den Kunden trifft hier eine eigene Kontroll- und Überwachungspflicht.</p>
                  <p>Leadify weist den Kunden ausdrücklich darauf hin, dass der Verkauf der Daten nicht die Befugnis (sog. Opt-In / Opt-Out) umfasst, den Kunden zu kontaktieren. Das Risiko einer eventuellen Abmahnung trägt der Kunde. Dem Kunden ist bewusst, dass für die Kontaktaufnahme vielmehr die geltende Rechtslage maßgeblich ist. Den Kunden trifft hier eine eigene Kontroll- und Überwachungspflicht.</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.11 Haftung</h4>
                  <p>Wir übernehmen kein Gewähr für die Richtigkeit der gelieferten Adressen/Informationen. Wir haften bei Vertragsanbahnung, Vertragserfüllung oder bei unerlaubter Handlung nur für Vorsatz und grobe Fahrlässigkeit. Dies gilt auch für Personen und Unternehmen, die durch uns mit der Erfüllung des Auftrages beauftragt werden. Eine Haftung für weitergehende Schäden, insbesondere für Mangelfolgeschäden, ist ausgeschlossen, es sei denn, dass wir vorsätzlich oder grob fahrlässig gehandelt haben. Die Haftungsbeschränkung entfällt, wenn uns oder unseren Erfüllungsgehilfen Vorsatz oder grobe Fahrlässigkeit zur Last fällt. Bei allen weiteren Ansprüchen, gleich aus welchem Rechtsgrund, soweit in den vorliegenden Bedingungen nicht geregelt, haften wir stets nur, soweit wir bzw. unsere Erfüllungsgehilfen Vorsatz oder grobe Fahrlässigkeit zu vertreten haben.</p>
                  <p>Basierend auf den unter 1.9. genannten Veränderungsprozessen und der Tatsache, dass bereits die Datenquellen fehlerhafte Informationen enthalten können, übernehmen wir keine Gewähr für die postalische oder elektronische und sonstige Korrektheit und Vollständigkeit der durch uns gelieferten Adresslisten/Informationen. Weiterhin haften wir auch nicht dafür, dass der Adressat das ist oder noch ist, wofür er sich ausgibt oder ausgegeben wird. Eine Haftung für weitergehende Schäden, insbesondere für Mangelfolgeschäden, ist ausgeschlossen; ausgenommen sind vorsätzliche oder grob fahrlässige Handlungen</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.12 Bereinigung- und Korrektur von kundenbestände</h4>
                  <p>Die Korrektur oder Löschung von fehlerhaften Kundenanschriften erfolgt auf Basis der von uns zur Verfügung stehenden aktuellsten Referenzdateien und Programme. Fehler können aufgrund der unter 2.1 genannten Fluktuation der Unternehmen, sowie der marktüblichen Einschränkungen der EDV-technischen Verfahren nicht grundsätzlich ausgeschlossen werden</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-2 text-[var(--foreground)]">1.13 Informationsanreicherung von kundenbestände</h4>
                  <p>Die Referenz und die Informationsergänzung unterliegt den in 4.1. genannten Einschränkungen.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">2 Sonstiges</h3>
                  <p>Alle von den o.g. Bedingungen abweichenden Vereinbarungen bedürfen zur Gültigkeit der Schriftform. Sollte eine der o.g. Bedingungen unwirksam sein, so wird die Gültigkeit der übrigen Bedingungen davon nicht berührt.</p>
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQsTwo() {
    const faqItems = [
        {
            id: 'item-1',
            question: 'Wie werden die Daten aussehen?',
            answer: `
<div class="overflow-x-auto">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Firmenname</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branche</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bundesland</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Straße</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PLZ</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ort</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rechtsform</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-Mail</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefon</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Geschäftsführer</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anrede</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titel 1</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vorname</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nachname</th>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titel 2</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Muster Marketing e.U.</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Werbeagentur</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Wien</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Testgasse 10</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1010</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Wien</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Einzelunternehmen</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">info@muster-marketing.at</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+43 1 7654321</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">https://www.muster-marketing.at</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Herr Mag. Markus Gruber</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Herr</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Mag.</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Markus</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gruber</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Restaurant Zum Hirschen</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gastronomie</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tirol</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Dorfstraße 22</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">6020</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Innsbruck</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">OG</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">kontakt@hirschen.at</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+43 512 987654</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">https://www.hirschen.at</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Herr Peter Gruber</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Herr</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Peter</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gruber</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
      </tr>
      <tr>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Rechtsanwaltskanzlei Dr. Huber</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rechtsanwalt</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Salzburg</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Gerichtsring 5</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5020</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Salzburg</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">GmbH</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">office@kanzlei-huber.at</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">+43 662 123456</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">https://www.kanzlei-huber.at</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Herr Dr. Stefan Huber</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Herr</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Stefan</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Huber</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
      </tr>
    </tbody>
  </table>
</div>
`,
        },
        {
            id: 'item-2',
            question: 'In welchen Dateiformaten wirst Du die Daten erhalten?',
            answer: 'Die aufbereiteten Daten wirst Du als Excel (.xlsx) und CSV (.csv) erhalten.',
        },
        {
            id: 'item-3',
            question: 'Wie werden die Daten geliefert?',
            answer: 'Nach erfolgreichem Zahlungseingang erhältst Du automatisch eine E-Mail von unserem System mit der beigefügten Liste in Excel (.xlsx) und CSV (.csv)',
        },
        {
            id: 'item-4',
            question: 'Kannst Du auch Daten ohne Adressen kaufen?',
            answer: 'Das Standard Paket bildet das Fundament aller Daten und beinhaltet die Firmenadressen. Die Erweiterungen (Tel, E-Mail, etc.) können dazu gekauft werden, aber nicht einzeln bestellt werden.',
        },
        {
            id: 'item-5',
            question: 'Welche Länder sind inbegriffen?',
            answer: 'Du kannst bei uns ausschließlich Top Adressen / Firmenadressen aus Österreich kaufen. Wir haben eine österreichische Adressdatenbank mit Telefon, Email, Website und Ansprechpartnern. Bald werden auch deutsche und Schweizer Adressen verfügbar sein.',
        },
        {
            id: 'item-6',
            question: 'Wofür kannst Du die Daten verwenden?',
            answer: 'Nutze unsere österreichischen Firmenadressen für eine zielgerichtete B2B-Kundenakquise. Ideal für E-Mail-Marketing, postalische Mailings, Telemarketing oder zur Integration in Deine eigene Software und Dienstleistungen.',
        },
        {
            id: 'item-7',
            question: 'Handelt es sich um DSGVO konforme Direktmarketing Daten?',
            answer: 'Ja, denn die Datensätze unserer Adresslisten stammen ausnahmslos aus freien, öffentlich zugänglichen Quellen (dazu zählen auch unsere Telefonnummern, E-Mail Adressen und Webseiten). Allgemein ist die Werbung per Post, wie zuvor auch, erlaubt. Du darfst also Unternehmen über die Firmenanschrift anschreiben. Deine Bestandskunden kannst Du wie zuvor ohne Einwilligung kontaktieren und Deine Daten mit unseren Daten erweitern.',
        },
        {
            id: 'item-8',
            question: 'Wie lange dauert es bis Du die Daten erhältst?',
            answer: 'Du erhältst Deine Lieferung innerhalb von 5-10 Minuten, je nach Anzahl der Leads, automatisch per Download-Link per E-Mail.',
        },
        {
            id: 'item-9',
            question: 'Welche Zahlungsmöglichkeiten stehen zur Verfügung?',
            answer: 'Es stehen alle gängigen Zahlungssysteme zur Verfügung: Klarna, Visa, Mastercard, American Express, Paypal, Apple Pay, EPS Überweisung, Banküberweisung',
        },
    ]

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">FAQ</h2>
                    <p className="text-base text-muted-foreground mt-4 text-balance">Hier findest Du Antworten auf die häufigsten Fragen zu unseren Firmenadressen.</p>
                </div>

                <div className="mx-auto mt-12 max-w-2xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0">
                        {faqItems.map((item) => (
                            <AccordionItem
                                key={item.id}
                                value={item.id}
                                className="border-dashed">
                                <AccordionTrigger className="cursor-pointer text-base font-semibold text-[var(--foreground)] hover:no-underline">{item.question}</AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-base text-left" dangerouslySetInnerHTML={{ __html: item.answer }}></p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>

                    <p className="text-base text-muted-foreground mt-6 px-8 text-center">
                        Nicht gefunden wonach Du suchen? Kontaktiere unser <br/>{" "}
                        <Link
                            href="mailto:support@leadify.at"
                            className="text-primary font-semibold hover:text-[var(--color-accent)] transition-colors duration-200">
                            Kundensupport-Team
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

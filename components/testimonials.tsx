import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent } from '@/components/ui/card'

type Testimonial = {
    name: string
    role: string
    image: string
    quote: string
}

const testimonials: Testimonial[] = [
    {
        name: 'Lisa M.',
        role: 'Geschäftsführerin bei "KreativKonzept"',
        image: 'https://randomuser.me/api/portraits/women/1.jpg',
        quote: 'Wir nutzen die Firmenadressen von Leadify hauptsächlich für unsere E-Mail-Marketing-Kampagnen. Endlich erreichen wir gezielt Ansprechpartner und sehen messbar bessere Öffnungs- und Klickraten. Es ist wirklich beeindruckend, wie Leadify unseren Workflow optimiert hat und uns hilft, unsere B2B-Ziele schneller zu erreichen.',
    },
    {
        name: 'Max S.',
        role: 'Saas-Entwickler',
        image: 'https://randomuser.me/api/portraits/men/2.jpg',
        quote: 'Als neues etabliertes Software-Unternehmen ist es entscheidend, schnell die richtigen Kontakte zu finden. Ich war anfangs etwas unsicher, ob Leadify das wirklich leisten kann und ob die Daten, wirklich so sind, wie abgebildet auf der Website. Aber die Adressen waren nicht nur topaktuell, sondern ich konnte damit direkt potenzielle Kunden ansprechen, die wirklich Interesse hatten. Das hat mir viel Recherchearbeit abgenommen und den Akquise-Prozess enorm beschleunigt. Absolut empfehlenswert für jeden, der hochwertige Leads sucht und seine Zeit effizient nutzen möchte.',
    },
    {
        name: 'Sandra K.',
        role: 'Vertriebsleiterin, "B & S Logistik GmbH"',
        image: 'https://randomuser.me/api/portraits/women/3.jpg',
        quote: 'Endlich eine Plattform, die hält, was sie verspricht! Die Filtermöglichkeiten sind genial und die Qualität sowie auch der Preis der Leads ist hervorragend. Unser Vertriebsteam liebt es. 🥰',
    },
    {
        name: 'Thomas B.',
        role: 'Geschäftsführer von "Tasteit Weinhandel"',
        image: 'https://randomuser.me/api/portraits/men/4.jpg',
        quote: 'Als Weinhändler war ich auf der Suche nach einer effektiven Möglichkeit, neue Gastronomiebetriebe zu erreichen. Mit Leadify konnte ich eine gezielte E-Mail-Kampagne aufsetzen, die sich speziell an Restaurants in Salzburg richtete. Die Qualität der Leads war beeindruckend – ich konnte unzählige personalisierte E-Mails versenden, was vorher undenkbar gewesen wäre. Dank Leadify erfahren nun viel mehr Restaurants von meinen Weinen, und das hat uns schon einige vielversprechende neue Partnerschaften eingebracht. Ein echter Gewinn für mein Geschäft!💯',
    },
    {
        name: 'Julia F.',
        role: 'Gründerin, "GastroFlow"',
        image: 'https://randomuser.me/api/portraits/women/10.jpg',
        quote: 'Als Gründerin von GastroFlow Solutions, einer SaaS-Plattform für effizientes Küchenmanagement, war unsere größte Herausforderung, die richtigen Gastronomiebetriebe in Österreich zu identifizieren. Wir brauchten präzise Daten, um unsere Zielgruppe – Restaurants, Cafés und Großküchen – passgenau anzusprechen. Leadify hat uns hier absolut überrascht: Die Datenqualität war hervorragend, und wir konnten unsere Leads nach genauen Kriterien wie der Rechtsform oder dem direkten Kontakt zum Geschäftsführer filtern. Dadurch konnten wir unsere Vertriebsressourcen extrem effizient einsetzen und haben in kürzester Zeit viele neue Testkunden gewonnen, die perfekt zu unserem Angebot passen. Für uns als Startup, das schnell skalieren muss, ist Leadify ein unverzichtbarer Partner geworden.',
    },
    {
        name: 'Patrick R.',
        role: 'Vertriebler bei "TechPulse"',
        image: 'https://randomuser.me/api/portraits/men/6.jpg',
        quote: 'Für unser IT-Softwareunternehmen war es immer eine Herausforderung, die richtigen Kontakte zu bekommen. Mit Leadify ist das jetzt ein Kinderspiel! Wir kriegen super präzise Daten und direkte Ansprechpartner. Das spart uns enorm viel Recherchezeit ⏰, sodass mein Team mehr Calls machen und sich auf die wichtigen Gespräche konzentrieren kann. ✨',
    },
    {
        name: 'Anna L.',
        role: 'Freiberufliche Grafikerin',
        image: 'https://randomuser.me/api/portraits/women/7.jpg',
        quote: 'Als freiberufliche Grafikerin ist die Neukundenakquise oft ein echter Zeitfresser. Ich musste ewig recherchieren, um potenzielle Kunden im Kreativbereich zu finden. Mit Leadify hat sich das total verändert! Ich kann jetzt super schnell gezielte Firmenadressen bekommen, zum Beispiel von Agenturen oder Verlagen, die wirklich Designleistungen brauchen. Das spart mir so viel manuelle Arbeit, und ich kann mich voll aufs Kreative konzentrieren. Meine E-Mail-Kampagnen laufen viel effektiver und ich habe schon einige spannende Projekte darüber gewonnen. Absolut top für alle Freelancer, die effizient wachsen wollen! 🎨🚀',
    },
    {
        name: 'Michael H.',
        role: 'Projektmanager, "PrintSmart Media"',
        image: 'https://randomuser.me/api/portraits/men/8.jpg',
        quote: 'Für unser letztes Projekt wollten wir mal wieder auf die gute alte postalische Werbung setzen. Mit Leadify konnten wir das super einfach umsetzen! Wir haben gezielt Adressen ausgewählt und so über 4.000 personalisierte Briefe versenden, ohne dass es viel Aufwand war. Die Datenqualität war top und die Kampagne lief reibungslos. Wir sind begeistert! 📬',
    },
    {
        name: 'Laura G.',
        role: 'Gründerin, "EventHorizon GmbH"',
        image: 'https://randomuser.me/api/portraits/women/9.jpg',
        quote: 'Als Gründerin von EventHorizon GmbH, einer Agentur für Firmenveranstaltungen, war es entscheidend, direkt die richtigen Ansprechpartner in Unternehmen zu finden. Früher war die Recherche nach Firmen, die größere Events planen, extrem zeitaufwendig. Mit Leadify ist das jetzt ein Kinderspiel! Ich konnte unsere Zielgruppe gezielt nach Branchen und Rechtsform filtern und bekam sofort präzise Firmenadressen mit den Kontakten der Geschäftsführung. Das Ergebnis? Wir haben in den letzten drei Monaten vier neue Großaufträge für Unternehmensevents gewonnen! Die Zeitersparnis ist enorm und der Return on Investment unschlagbar. Leadify ist für uns ein absolutes Must-have im B2B-Vertrieb. ✨',
    },
    {
        name: 'Stefan V.',
        role: 'Geschäftsführer, "SalesBoost Data Solutions"',
        image: 'https://randomuser.me/api/portraits/men/10.jpg',
        quote: 'Haben mit Leadify neue Zulieferer und Partner gefunden. Die Datenqualität ist beeindruckend. Kein mühsames Recherchieren mehr. Bin froh, dass wir das entdeckt haben. 🚀',
    },
    {
        name: 'Carina P.',
        role: 'HR-Managerin, "Talent Scout Personalberatung"',
        image: 'https://randomuser.me/api/portraits/women/11.jpg',
        quote: 'Auch für HR super! Wir suchen oft nach Unternehmen in bestimmten Regionen für Rekrutierung. Leadify liefert die Infos schnell und unkompliziert. Hilft uns enorm bei der Kandidatensuche. Top! 👍',
    },
    {
        name: 'Lukas M.',
        role: 'Vertriebler bei "Econ Solutions"',
        image: 'https://randomuser.me/api/portraits/men/12.jpg',
        quote: 'Leadify als Datenlieferant ist jetzt fester Bestandteil unseres Verkaufsprozesses. Absolut spitze! 🌟',
    },
]

const chunkArray = (array: Testimonial[], chunkSize: number): Testimonial[][] => {
    const result: Testimonial[][] = []
    for (let i = 0; i < array.length; i += chunkSize) {
        result.push(array.slice(i, i + chunkSize))
    }
    return result
}

const testimonialChunks = chunkArray(testimonials, Math.ceil(testimonials.length / 3))

export default function WallOfLoveSection() {
    return (
        <section>
            <div className="py-12 md:py-20">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="text-center">
                        <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl text-[var(--foreground)]">Was unsere Kunden sagen</h2>
                        <p className="text-base mt-6">So haben Kunden unsere Firmenadressen eingesetzt.</p>
                    </div>
                    <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
                        {testimonialChunks.map((chunk, chunkIndex) => (
                            <div
                                key={chunkIndex}
                                className="space-y-3">
                                {chunk.map(({ name, role, quote, image }, index) => (
                                    <Card key={index} className="bg-white border border-[var(--border)]">
                                        <CardContent className="p-5 grid grid-cols-[auto_1fr] gap-3">
                                            <Avatar className="size-9">
                                                <AvatarImage
                                                    alt={name}
                                                    src={image}
                                                />
                                                <AvatarFallback>ST</AvatarFallback>
                                            </Avatar>

                                            <div className="text-left">
                                                <h3 className="font-medium text-[var(--foreground)]">{name}</h3>

                                                <span className="text-[var(--foreground)] block text-sm tracking-wide opacity-80">{role}</span>

                                                <blockquote className="mt-3">
                                                    <p className="text-base text-[var(--foreground)]">{quote}</p>
                                                </blockquote>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

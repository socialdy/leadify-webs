import { Package, PlusCircle } from 'lucide-react'

export default function Pricing() {
    return (
        <div className="relative py-16 md:py-32">
            <div className="mx-auto max-w-6xl px-4">
                {/* Centered Headline and Paragraph */}
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl text-[var(--foreground)]">
                        Preise
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-black">
                        Du zahlst genau für die Firmenadressen und B2B-Leads, die Du brauchst – keine versteckten Kosten, einfach passend für Dich.
                    </p>
                </div>

                {/* Pricing Cards Side-by-Side */}
                <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center items-stretch">
                    {/* Standard Paket Card */}
                    <div className="w-full max-w-md bg-[var(--color-primary)] rounded-3xl p-8 text-center shadow-lg mb-8 border border-[var(--color-primary)] h-full">
                        <p className="text-base md:text-lg text-white font-semibold mb-6">Standard Paket</p>
                        <div className="bg-white rounded-full p-4 mx-auto w-20 h-20 flex items-center justify-center mb-6 border border-white">
                            <Package className="w-12 h-12 text-[var(--color-primary)]" />
                        </div>
                        <p className="text-white text-5xl font-semibold mb-4">0,20 €</p>
                        <ul className="text-white text-lg space-y-2 mb-5">
                            <li className="py-2 border-t border-b border-white border-opacity-50 text-center">Firmenname</li>
                            <li className="py-2 border-b border-white border-opacity-50 text-center">Branche</li>
                            <li className="py-2 border-b border-white border-opacity-50 text-center">Bundesland</li>
                            <li className="py-2 border-b border-white border-opacity-50 text-center">Straße</li>
                            <li className="py-2 border-b border-white border-opacity-50 text-center">PLZ</li>
                            <li className="py-2 border-b border-white border-opacity-50 text-center">Ort</li>
                            <li className="py-2 border-b border-white border-opacity-50 text-center">Rechtsform</li>
                        </ul>
                        <button
                            className="button-21 mt-32"
                            role="button"
                            onClick={() => document.getElementById('firmensuche')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            <span className="text-white">Firmensuche starten</span>
                        </button>
                    </div>

                    {/* Erweiterungen Card */}
                    <div className="w-full max-w-md bg-white rounded-3xl p-8 text-center shadow-lg border border-[var(--border)] h-full">
                        <p className="text-base md:text-lg text-[var(--foreground)] font-semibold mb-6">Erweiterungen</p>
                        <div className="bg-white rounded-full p-4 mx-auto w-20 h-20 flex items-center justify-center mb-6 border border-[var(--border)]">
                            <PlusCircle className="w-12 h-12 text-[var(--foreground)]" />
                        </div>
                        <p className="text-[var(--foreground)] text-5xl font-semibold mb-2">+0,02 €</p>
                        <p className="text-base text-muted-foreground mb-4">Sofern verfügbar</p>
                        <ul className="text-[var(--foreground)] text-lg space-y-2">
                            <li className="py-2 border-t border-b border-[var(--border)] text-center">E-Mail Adresse</li>
                            <li className="py-2 border-b border-[var(--border)] text-center">Telefonnummer</li>
                            <li className="py-2 border-b border-[var(--border)] text-center">Website</li>
                            <li className="py-2 border-b border-[var(--border)] text-center">Geschäftsführer</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

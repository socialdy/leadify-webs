'use client';

import { Logo } from '@/components/ui/logo'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation';

export default function FooterSection() {
    const pathname = usePathname() || '';

    const bundeslandLinks = [
        { title: 'Firmenadressen Burgenland', href: '/firmenadressen/bundesland/burgenland' },
        { title: 'Firmenadressen Kärnten', href: '/firmenadressen/bundesland/kaernten' },
        { title: 'Firmenadressen Niederösterreich', href: '/firmenadressen/bundesland/niederoesterreich' },
        { title: 'Firmenadressen Oberösterreich', href: '/firmenadressen/bundesland/oberoesterreich' },
        { title: 'Firmenadressen Salzburg', href: '/firmenadressen/bundesland/salzburg-land' }, // Angepasst auf salzburg-land
        { title: 'Firmenadressen Steiermark', href: '/firmenadressen/bundesland/steiermark' },
        { title: 'Firmenadressen Tirol', href: '/firmenadressen/bundesland/tirol' },
        { title: 'Firmenadressen Vorarlberg', href: '/firmenadressen/bundesland/vorarlberg' },
        { title: 'Firmenadressen Wien', href: '/firmenadressen/bundesland/wien' },
    ];

    const stadtLinks = [
        { title: 'Firmenadressen Bregenz', href: '/firmenadressen/stadt/bregenz' },
        { title: 'Firmenadressen Eisenstadt', href: '/firmenadressen/stadt/eisenstadt' },
        { title: 'Firmenadressen Graz', href: '/firmenadressen/stadt/graz' },
        { title: 'Firmenadressen Innsbruck', href: '/firmenadressen/stadt/innsbruck' },
        { title: 'Firmenadressen Klagenfurt', href: '/firmenadressen/stadt/klagenfurt' },
        { title: 'Firmenadressen Linz', href: '/firmenadressen/stadt/linz' },
        { title: 'Firmenadressen Salzburg', href: '/firmenadressen/stadt/salzburg' },
        { title: 'Firmenadressen St. Pölten', href: '/firmenadressen/stadt/st-poelten' },
        { title: 'Firmenadressen Wien', href: '/firmenadressen/stadt/wien' },
    ];

    let displayedLinks = bundeslandLinks;

    if (pathname.startsWith('/firmenadressen/stadt/')) {
        displayedLinks = stadtLinks;
    } else if (pathname.startsWith('/firmenadressen/bundesland/')) {
        displayedLinks = bundeslandLinks;
    }

    const half = Math.ceil(displayedLinks.length / 2);
    const firstHalf = displayedLinks.slice(0, half);
    const secondHalf = displayedLinks.slice(half);

    return (
        <footer className=" bg-white pt-20 dark:bg-transparent">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid gap-12 md:grid-cols-5">
                    {/* Column 1: Logo and Social Media */}
                    <div className="md:col-span-1 text-center md:text-left">
                        <Link
                            href="/"
                            aria-label="go home"
                            className="block size-fit mx-auto md:mx-0">
                            <Logo />
                        </Link>
                        <div className="mt-8 flex justify-center gap-6 text-sm md:justify-start">
                            <Link
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X/Twitter"
                                className="text-muted-foreground hover:text-[var(--color-accent)] transition-colors duration-200 block">
                                <svg
                                    className="size-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
                                </svg>
                            </Link>
                            <Link
                                href="https://www.linkedin.com/company/leadify-firmenadressen-kaufen-oesterreich/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="text-muted-foreground hover:text-[var(--color-accent)] transition-colors duration-200 block">
                                <svg
                                    className="size-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z"></path>
                                </svg>
                            </Link>
                            <Link
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="text-muted-foreground hover:text-[var(--color-accent)] transition-colors duration-200 block">
                                <svg
                                    className="size-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95"></path>
                                </svg>
                            </Link>
                            <Link
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="text-muted-foreground hover:text-[var(--color-accent)] transition-colors duration-200 block">
                                <svg
                                    className="size-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"></path>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Column 2: Menu */}
                    <div className="space-y-4 text-sm text-center md:text-left">
                        <span className="block font-medium">Menu</span>
                        {[ 
                            { title: 'Leistungen', href: '#leistungen' },
                            { title: 'Kunden', href: '#kunden' },
                            { title: 'Preise', href: '#preise' },
                            { title: 'FAQ', href: '#faq' },
                            { title: 'Kontakt', href: '#kontakt' },
                            { title: 'Blog', href: '/blog' }, // Add Blog link here
                        ].map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                onClick={(e) => {
                                    // Only prevent default for anchor links on the same page
                                    if (item.href.startsWith('#') && pathname === '/') {
                                        e.preventDefault();
                                        const targetId = item.href.substring(1);
                                        const targetElement = document.getElementById(targetId);
                                        if (targetElement) {
                                            targetElement.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    } else if (item.href === '/blog') {
                                        // For the blog link, do nothing, let Link component handle navigation
                                    }
                                }}
                                className="text-muted-foreground hover:text-[var(--color-accent)] transition-colors duration-200 block"
                            >
                                <span>{item.title}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Column 3: Firmenadressen (first half) */}
                    <div className="md:col-span-1 space-y-4 text-sm text-center md:text-left">
                        <span className="block font-medium">Firmenadressen</span>
                        {firstHalf.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="text-muted-foreground hover:text-[var(--color-accent)] transition-colors duration-200 block"
                            >
                                <span>{item.title}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Column 4: Firmenadressen (second half) */}
                    <div className="md:col-span-1 space-y-4 pt-7 text-sm text-center md:text-left">
                        {/* Adjusted padding to align with first column's header */}
                        {secondHalf.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="text-muted-foreground hover:text-[var(--color-accent)] transition-colors duration-200 block"
                            >
                                <span>{item.title}</span>
                            </Link>
                        ))}
                    </div>

                    {/* Column 5: Zahlungsmethoden */}
                    <div className="md:col-span-1 space-y-4 text-sm text-center md:text-left">
                        <span className="block font-medium">Zahlungsmethoden</span>
                        <div className="flex flex-wrap items-center gap-2 w-full justify-center md:justify-start">
                            <Image
                                src="/img/visa.svg"
                                alt="Visa"
                                width={40}
                                height={25}
                                className="h-auto object-contain"
                            />
                            <Image
                                src="/img/mastercard.svg"
                                alt="Mastercard"
                                width={40}
                                height={25}
                                className="h-auto object-contain"
                            />
                            <Image
                                src="/img/paypal.svg"
                                alt="PayPal"
                                width={40}
                                height={25}
                                className="h-auto object-contain"
                            />
                            <Image
                                src="/img/stripe.svg"
                                alt="Stripe"
                                width={40}
                                height={25}
                                className="h-auto object-contain"
                            />
                            <Image
                                src="/img/klarna.svg"
                                alt="Klarna"
                                width={40}
                                height={25}
                                className="h-auto object-contain"
                            />
                        </div>
                       
                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-center gap-6 border-t py-6 md:flex-row md:items-end md:justify-between">
                    <span className="text-muted-foreground order-last block text-center text-sm md:order-first md:text-left">© {new Date().getFullYear()} Leadify - Alle Rechte vorbehalten</span>
                    <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last md:justify-start">
                        <div className="flex flex-wrap gap-4 text-sm">
                            {[ 
                                { title: 'Impressum', href: '/impressum' },
                                { title: 'Datenschutz', href: '/datenschutz' },
                                { title: 'AGB', href: '/agb' },
                            ].map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.title === 'Impressum' ? '/impressum' : item.href}
                                    className="text-muted-foreground hover:text-[var(--color-accent)] transition-colors duration-200 block"
                                >
                                    <span>{item.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

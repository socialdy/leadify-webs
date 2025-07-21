'use client'
import Link from 'next/link'
import { Logo } from './logo'
import { Menu, X } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

const menuItems = [
    { name: 'Leistungen', href: '/#leistungen' },
    { name: 'Kunden', href: '/#kunden' },
    { name: 'Preise', href: '/#preise' },
    { name: 'FAQ', href: '/#faq' },
    { name: 'Kontakt', href: '/#kontakt' },
]

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const pathname = usePathname()
    
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20  left-0 right-0 px-5 top-3"
                >
                <div 
                    className={cn('mx-auto w-full max-w-4xl px-8 md:px-5 rounded-2xl border dark:border-gray-800 backdrop-blur-lg bg-background/50 dark:bg-background/80 transition-all duration-300', 
                    isScrolled && 'shadow-sm')}
                    >
                    <div className="relative flex flex-wrap items-center justify-center md:justify-between gap-6 py-4 md:gap-0 md:py-3">
                        <div 
                            className="flex w-full justify-between lg:w-auto dark:text-white"
                            >
                            <Link
                                href="/"
                                aria-label="home"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="flex items-center">
                                <div
                                    >
                                    <Logo />
                                </div>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                            >
                                <Menu className={cn(
                                    "m-auto size-6 duration-200",
                                    menuState && "rotate-180 scale-0 opacity-0"
                                )} />
                                <X className={cn(
                                    "absolute inset-0 m-auto size-6 -rotate-180 duration-200",
                                    menuState ? "rotate-0 scale-100 opacity-100" : "scale-0 opacity-0"
                                )} />
                            </button>
                        </div>

                        {/* Desktop menu */}
                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul 
                                className="flex gap-8 text-sm dark:text-gray-300"
                                >
                                {menuItems.map((item, index) => (
                                    <li 
                                        key={index}
                                        >
                                        <Link
                                            href={item.href}
                                            onClick={(e) => {
                                                if (pathname === '/') {
                                                    e.preventDefault();
                                                    const targetId = item.href.split('#')[1];
                                                    const targetElement = document.getElementById(targetId);
                                                    if (targetElement) {
                                                        targetElement.scrollIntoView({ behavior: 'smooth' });
                                                    }
                                                } else {
                                                    // For other non-anchor links, navigate normally
                                                    window.location.href = item.href;
                                                }
                                                setMenuState(false); // Close mobile menu regardless
                                            }}
                                            className="text-[black] hover:text-[#30E87A]  block duration-150">
                                            <span
                                                >
                                                {item.name}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Button group */}
                        <div className="ml-auto hidden items-center justify-end gap-6 lg:flex">
                            <Link
                                href="/#firmensuche"
                                onClick={(e) => {
                                    if (pathname === '/') {
                                        e.preventDefault();
                                        const targetId = "firmensuche";
                                        const targetElement = document.getElementById(targetId);
                                        if (targetElement) {
                                            targetElement.scrollIntoView({ behavior: 'smooth' });
                                        }
                                    }
                                    setMenuState(false); // Close mobile menu regardless
                                }}
                                className="button-21 flex items-center justify-center text-center"
                            >
                                <span className="relative whitespace-nowrap">
                                    <span className="relative z-10">Jetzt Firmensuche starten</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {menuState && (
                    <div
                        className="relative z-10 lg:hidden"
                    >
                        <div className="left-0 right-0  mt-2 rounded-2xl border dark:border-gray-800 bg-background/50 dark:bg-background/80 backdrop-blur-lg md:px-5">
                            <div className="flex w-full flex-col gap-4 px-8 pt-16 pb-8">
                                {menuItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className="block list-none"
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={(e) => {
                                                if (pathname === '/') {
                                                    e.preventDefault();
                                                    const targetId = item.href.split('#')[1];
                                                    const targetElement = document.getElementById(targetId);
                                                    if (targetElement) {
                                                        targetElement.scrollIntoView({ behavior: 'smooth' });
                                                    }
                                                } else {
                                                    // For other non-anchor links, navigate normally
                                                    window.location.href = item.href;
                                                }
                                                setMenuState(false); // Close mobile menu regardless
                                            }}
                                            className="-ml-1 block text-base text-[black] hover:text-[#30E87A] duration-150 dark:text-gray-300"
                                        >
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                                <Link
                                    href="/#firmensuche"
                                    onClick={(e) => {
                                        if (pathname === '/') {
                                            e.preventDefault();
                                            const targetId = "firmensuche";
                                            const targetElement = document.getElementById(targetId);
                                            if (targetElement) {
                                                targetElement.scrollIntoView({ behavior: 'smooth' });
                                            }
                                        }
                                        setMenuState(false); // Close mobile menu regardless
                                    }}
                                    className="button-21 mt-6 flex items-center justify-center text-center text-[black] dark:text-gray-300"
                                >
                                    <span className="relative whitespace-nowrap">
                                        <span className="relative z-10">Jetzt Firmensuche starten</span>
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
} 
import { Search, FileText, ShoppingCart, CreditCard, Truck, Award } from 'lucide-react';
import { useState, useRef, useEffect, useMemo } from 'react';

export default function ProcessFlow() {
    const steps = useMemo(() => [
        {
            id: 1,
            title: '1. Suche starten',
            description: 'Entweder Du verwendest die Suchfunktion auf der Webseite oder Du sendest uns direkt per Email Deine Datenanfrage.',
            icon: Search,
        },
        {
            id: 2,
            title: '2. Angebot erhalten',
            description: 'Erhalte unser Angebot mit der genauen Aufstellung der Daten und Kosten.',
            icon: FileText,
        },
        {
            id: 3,
            title: '3. Bestellung aufgeben',
            description: 'Gib die Bestellung der Firmenadressen aus Österreich direkt über die Webseite oder per Email auf.',
            icon: ShoppingCart,
        },
        {
            id: 4,
            title: '4. Zahlung',
            description: 'Bezahle direkt auf der Webseite über Sofort Überweisung, Visa, Mastercard, American Express, Paypal oder EPS Überweisung. Eine Bezahlung auf Rechnung ist per Email auch möglich.',
            icon: CreditCard,
        },
        {
            id: 5,
            title: '5. Lieferung',
            description: 'Du erhältst Deine Lieferung innerhalb von 5-10 Minuten, je nach Anzahl der Leads, automatisch per Download-Link per E-Mail.',
            icon: Truck,
        },
        {
            id: 6,
            title: '6. Glückwunsch',
            description: 'Du hast erfolgreich Deine Firmenadressen aus Österreich erhalten und kannst diese direkt und unbegrenzt nutzen.',
            icon: Award,
        },
    ], []);

    const [activeStepId, setActiveStepId] = useState<number | null>(null);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
    const timelineRef = useRef<HTMLDivElement>(null);
    const [progressBarHeight, setProgressBarHeight] = useState(0);
    const [iconYPercentages, setIconYPercentages] = useState<Array<{ id: number; y: number }>>([]);
    const rafId = useRef<number | null>(null); // Ref to store requestAnimationFrame ID

    // Calculate icon Y positions once on mount or resize
    useEffect(() => {
        const calculateIconPositions = () => {
            if (timelineRef.current) {
                const timelineRect = timelineRef.current.getBoundingClientRect();
                const positions: Array<{ id: number; y: number }> = [];

                stepRefs.current.forEach((ref) => {
                    if (ref) {
                        const stepRect = ref.getBoundingClientRect();
                        const iconCenterYRelativeToTimelineTop = (stepRect.top - timelineRect.top) + (stepRect.height / 2);
                        const percentage = (iconCenterYRelativeToTimelineTop / timelineRect.height) * 100;
                        positions.push({ id: parseInt(ref.id), y: percentage });
                    }
                });
                setIconYPercentages(positions);
            }
        };

        calculateIconPositions();
        window.addEventListener('resize', calculateIconPositions);

        return () => {
            window.removeEventListener('resize', calculateIconPositions);
        };
    }, [steps]); // `steps` is a dependency if steps array can change dynamically

    // Scroll handler for progress bar and active step
    useEffect(() => {
        const handleScroll = () => {
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }

            rafId.current = requestAnimationFrame(() => {
                if (timelineRef.current) {
                    const element = timelineRef.current;
                    const timelineRect = element.getBoundingClientRect();
                    const viewportHeight = window.innerHeight;

                    // Calculate the scroll position relative to the timeline container
                    const scrollYRelativeToTimeline = window.scrollY - (timelineRect.top + window.scrollY - viewportHeight);

                    // Total scrollable distance for the timeline section to fully pass through the viewport
                    const totalScrollableDistance = timelineRect.height + viewportHeight;

                    // Progress percentage for the bar (0% to 100%)
                    const currentProgressBarPercentage = Math.min(100, Math.max(0, (scrollYRelativeToTimeline / totalScrollableDistance) * 100));
                    setProgressBarHeight(currentProgressBarPercentage);

                    // Determine active step based on currentProgressBarPercentage
                    let newActiveStepId: number | null = null;
                    for (let i = iconYPercentages.length - 1; i >= 0; i--) {
                        if (currentProgressBarPercentage >= iconYPercentages[i].y) {
                            newActiveStepId = iconYPercentages[i].id;
                            break;
                        }
                    }
                    setActiveStepId(newActiveStepId);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial call to set state on mount

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, [iconYPercentages]); // Recalculate scroll effects if icon positions change (due to resize)

    return (
        <section className="py-20 md:py-32">
            <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
                <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl text-[var(--foreground)] mb-4">
                    Der Ablauf
                </h2>
                <p className="mt-4 text-lg text-[var(--foreground)] opacity-70">
                    Erfahre, wie Du zu Deinen Firmenadressen aus Österreich kommst
                </p>
            </div>

            <div className="mt-12 mx-auto max-w-6xl px-4 md:px-6">
                <div className="relative" ref={timelineRef}>
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-[var(--border)]"></div>
                    <div
                        className="absolute left-1/2 transform -translate-x-1/2 top-0 w-0.5 bg-[var(--color-primary)]"
                        style={{ height: `${progressBarHeight}%` }}
                    ></div>

                    {steps.map((step, index) => {
                        const IconComponent = step.icon;
                        const isLeftAligned = index % 2 === 0;
                        const isActive = activeStepId === step.id;

                        const cardBgClass = isActive ? 'bg-[var(--color-primary)]' : 'bg-white';
                        const cardTextColorClass = isActive ? 'text-white' : 'text-[var(--foreground)]';
                        const cardBorderClass = isActive ? 'border-[var(--color-primary)]' : 'border-[var(--border)]';
                        const iconBgClass = isActive ? 'bg-[var(--color-primary)] text-white' : 'bg-white text-[var(--foreground)] border border-[var(--border)]';

                        return (
                            <div
                                key={step.id}
                                id={step.id.toString()}
                                ref={(el) => { stepRefs.current[index] = el; }}
                                className="relative py-16"
                            >
                                <div className={`w-full py-6 px-12 rounded-lg shadow-lg border transition-all duration-300 ease-out
                                    ${cardBgClass} ${cardBorderClass}
                                    ${isLeftAligned ? 'md:w-[calc(50%-50px)] md:mr-auto' : 'md:w-[calc(50%-50px)] md:ml-auto'}
                                    flex flex-col items-center text-center md:items-start md:text-left`}>
                                    
                                    <div className={`mb-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-colors duration-300 ease-out
                                        ${iconBgClass} md:mx-auto md:hidden`}>
                                        <IconComponent className="w-5 h-5" />
                                    </div>

                                    <h3 className={`font-semibold text-lg mb-2 ${cardTextColorClass}`}>{step.title}</h3>
                                    <p className={`text-sm opacity-80 ${cardTextColorClass}`}>{step.description}</p>
                                </div>

                                {/* Absolutely positioned icon for desktop */}
                                <div className={`hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full items-center justify-center shadow-md transition-colors duration-300 ease-out
                                    ${iconBgClass}`}>
                                    <IconComponent className="w-5 h-5" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
} 
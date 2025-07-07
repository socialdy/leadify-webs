"use client";

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Input } from './input';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Label } from './label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from './select';
import LeadResultsTable from './LeadResultsTable';
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Lead } from './LeadResultsTable';
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from 'next/image';
import { toast } from "sonner";
import { loadStripe, Stripe } from '@stripe/stripe-js';

export const allBranches = [
  "Wäscherei / chemische Reinigung", "Fremdenführer / Reiseführer", "Esoterik", "Musikgruppe / Musikverein",
  "Verkehrsbetriebe", "Altstoffe / Abfallstoffe", "Gießerei", "Musikinstrumente / Produktion",
  "Filteranlagen", "Kläranlage", "Produktion von Spielzeug", "Mobile Disko / Vermieten von Diskothekenanlagen",
  "Casino / Spielcasino", "Anlagen zur Wasserversorgung", "Umweltschutz", "Wirtschaftstreuhänder / Buchprüfer",
  "Schifffahrt", "Recycling", "Tierpräparator", "Reparatur Elektrogeräte / Haushaltsgeräte",
  "Logistik", "Sonstige Reparaturen", "Ferienunterkünfte", "Privatzimmer",
  "Begleitservice / Escort", "Taxi", "Luftfahrt / Dienstleistungen", "Vermietung von Gebrauchsgütern",
  "Automaten", "Vermieten von Maschinen und Geräten", "Ferienhaus / Ferienwohnung", "Spedition / Transport",
  "Reparatur von Waschmaschinen", "Recycling sortierter Werkstoffe", "Parkhaus / Parkgarage", "Pensionen",
  "Entsorgungsunternehmen / Beseitigung von Umweltverschmutzungen", "Verkehr / Logistik",
  "Güterbeförderung in der Schifffahrt", "Lagerhäuser / Lagern", "Hundesalon / Katzensalon",
  "Herstellen, Veredeln und Bearbeiten von Glas", "Fotolabor", "Buchhaltung / Büro, Kanzlei",
  "Rechtsanwalt", "Spedition / Zollbüro", "Personenbeförderung", "Wettbüros: Wetten, Toto, Lotto",
  "Vermietung Flugzeuge / Hubschrauber", "Campingzubehör", "Veranstalter für Messe, Ausstellung und Kongresse",
  "Kühlhäuser", "Abenteuer Sport", "Spedition / Erde, Kies, Schotter", "Schwimmbad / Freibad / Erlebnisbad",
  "Bordell", "Güterbeförderung / Gütertransport auf der Straße", "Skiverleih / Leihski",
  "Herstellung von Schleifkörpern und Schleifmitteln", "Verpackungsservice", "Sattler / Sattlerei",
  "Jugendherberge", "beeidete Wirtschaftsprüfer", "Technische Bedarfsartikel", "Tennisschule / Tennistrainer",
  "Segelschule", "Sportartikel und Sportgeräte, Produktion", "Tauchsport / Tauchen", "Wirtschaftsberatung",
  "Kompost / Kompostierung", "Mautstraßen", "Bestattung / Bestattungsunternehmen", "Personalberatung",
  "Hotels", "Nähmaschinen / Reparatur", "Kino", "Sonstige Beherbergung",
  "Medizinische Behelfe u Bedarfsartikel", "Autobusse, Busse / Personentransport", "Bootsvermietung / Boote mieten",
  "Filmverleih / Filmvertrieb", "Übersetzen / Dolmetschen", "Kegelbahn / Kegeln / Bowling",
  "Eventagentur", "Technische Gase", "Videothek", "Disko",
  "Projekt-Management", "Veranstalter für Messe, Ausstellung und Kongresse", "Gasthöfe und Pensionen",
  "Herstellung von sonstigen Waren", "Steuerberater", "Fiaker / Fahrt mit der Pferdekutsche",
  "Reisebüro / Reiseveranstalter", "Schmiermittel", "Fotoausarbeitungen",
  "Events / Organisation, Veranstaltungsorganisation", "Hütte / Schutzhütte", "Unternehmensberatung",
  "Unterhaltung / Erholung", "Airline / Luftfahrt Personenbeförderung", "Veranstaltungslocation",
  "Kanalreinigung / Kanalräumung", "Autoverwerter", "Motorsport", "Hallenbad",
  "Pension / Frühstückspension", "Wasserversorgung", "Zelte", "Vermietung von beweglichen Sachen",
  "Boote / Bootsbau und Yachtbau", "Sonstige Erzeugnisse", "Vermietung Sportgeräte / Sport",
  "technische Teile aus Keramik", "Reparaturen aller Art", "Luftfracht / Transportflugzeuge",
  "Abfallentsorgung / Müllabfuhr", "Container / Produktion und Handel", "Güterbeförderung im Eisenbahnverkehr",
  "Private Haushalte mit Hauspersonal", "Tanzsport", "Sportverein / Sportverband",
  "Feuerwerkskörper / Pyrotechnik", "Möbeltransporte", "Golfplatz",
  "Reinigungsbedarf, Reinigungsmittel, Seifen", "Übersiedlungen / Umzüge / Umzugsservice",
  "Transportunternehmen / Transport / Logistik", "Kran, Autokran / Verkauf, Vermietung",
  "Messen und Ausstellungen", "Sonstige freiberufliche Tätigkeiten",
  "Flughafen / Flughafenbetriebsgesellschaft", "Flugzeuge / Verkauf, Vertrieb", "Busunternehmen",
  "Sportveranstalter / Kulturveranstalter", "Spedition / Holztransporte",
  "Sonstige freiberufliche, wissenschaftliche und technische Tätigkeiten", "Freizeitzentrum",
  "Obst und Gemüse Verwertung", "Detektei / Detektiv", "Schädlingsbekämpfung / Kammerjäger",
  "Postdienste von Universaldienstleistungsanbietern", "Sondermüll / Sondermüllentsorgung",
  "botanischer Garten / Naturpark", "Yachtcharter", "Seminarhotel", "Botendienst",
  "Vermieten von Lichtanlagen / Musikanlagen", "Chigong / Qigong und Taiji", "Spedition / Kleintransporte",
  "Schlüsseldienst / Schlüsselnotdienst / Aufsperrdienst", "Bühnenbeleuchtung",
  "Zerlegen von Schiffs- und Fahrzeugwracks und anderen Altwaren", "Eisenbahn, Zug / Personenbeförderung",
  "Bühnen / Tribünen", "Vermietung LKW / Busse, Reisebusse", "Mülldeponien / Müllentsorgung",
  "Vergnügungsparks / Themenparks / Freizeitparks", "Skilift", "Events / Künstlerisches Schaffen",
  "Fitnesscenter", "Abwasserentsorgung / Abwasseraufbereitung", "Luftfahrt / Flugzeuge",
  "Konzertagentur", "Management / Management-Beratung", "Nachtclub / Nightclub",
  "Gefahrgutbeauftragter", "Reitsport", "Museum / Ausstellungen", "Gummi / Gummiwaren",
  "Minigolf / Minigolfanlage", "Festspiele", "Appartement / Ferienwohnung",
  "Reparatur und Ersatzteile für Baumaschinen / Baugeräte", "Sportanlagen / Sportplätze",
  "Glücksspielautomaten", "sonstige wirtschaftliche Dienstleistungen", "Touristeninformation",
  "Abfüllen und Verpacken", "sonstige Reservierungsdienstleistungen a.n.g.", "Sonstige Dienstleistungen",
  "Reitstall / Reitschule", "Notar", "Büchsenmacher", "Sporthallen",
  "Bilanzbuchhalter", "Vermietung landwirtschaftliche Maschinen und Geräte", "Kartenbüro", "Reiseveranstalter",
  "Tennishalle / Tennisplatz", "Wachdienste, Sicherheitsdienste / Bewachung", "Hotel Garni", "Campingplatz",
  "Skischule / Schischule", "Paketdienste / Expressdienste", "Dienstleistungen / Sport", "Schrott",
  "Darstellende Kunst", "Astrologie / Astrologen", "Eisenbahnbau", "Reiseleiter",
  "Tierpension", "Übersetzungen / Übersetzer", "Seilbahn, Sessellift / Bergbahnen", "Kabaret",
  "Altpapier", "Reparatur und Instandhaltung von Luft- und Raumfahrzeugen", "Container Vermietung",
  "Kultur / Unterhaltung", "Mediation", "Veranstaltungstechnik / Lichtanlagen / Musikanlagen",
  "Theater und Opernhäuser", "Spedition / Kühltransporte", "Reparatur von sonstigen Ausrüstungen",
  "Modellbau", "Wasseraufbereitung / Wasserreinigung", "Grabsteine"
];

const allStates = [
  'Burgenland',
  'Kärnten',
  'Niederösterreich',
  'Oberösterreich',
  'Salzburg',
  'Steiermark',
  'Tirol',
  'Vorarlberg',
  'Wien',
];

const allLegalForms = [
  'Alle',
  'Einzelunternehmen',
  'GmbH',
  'OG',
  'KG',
  'AG',
  'Verein',
  'Sonstige',
];

// Simple fuzzy matching function
const fuzzyMatch = (text: string, query: string): boolean => {
  const t = text.toLowerCase();
  const q = query.toLowerCase();
  let i = 0, j = 0;
  while (i < t.length && j < q.length) {
    if (t[i] === q[j]) {
      j++;
    }
    i++;
  }
  return j === q.length;
};

interface SearchCriteria {
  branch: string | null;
  state: string | null;
  city: string | null;
  zipCode: string | null;
  legalForm: string | null;
  includePhone: boolean;
  includeWebsite: boolean;
  includeEmail: boolean;
  includeCEO: boolean;
}

// Define the discount percentage as a constant
const DISCOUNT_PERCENTAGE = 0.50;

let stripePromise: Promise<Stripe | null>;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  }
  return stripePromise;
};

export default function LeadSearchSection({ className, defaultState }: { className?: string, defaultState?: string }) {
  const [branchQuery, setBranchQuery] = useState<string>('');
  const [debouncedBranchQuery, setDebouncedBranchQuery] = useState('');
  const [filteredBranches, setFilteredBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedState, setSelectedState] = useState(defaultState || 'all');
  const [includePhone, setIncludePhone] = useState(false);
  const [includeWebsite, setIncludeWebsite] = useState(false);
  const [includeEmail, setIncludeEmail] = useState(false);
  const [includeCEO, setIncludeCEO] = useState(false);
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [selectedLegalForm, setSelectedLegalForm] = useState('Alle');
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [totalLeadsFound, setTotalLeadsFound] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [leadsPerPage] = useState(20);
  const [optionalCounts, setOptionalCounts] = useState({
    phone: 0,
    email: 0,
    website: 0,
    ceo: 0,
  });

  // New state variables for pending checkbox selections
  const [pendingIncludePhone, setPendingIncludePhone] = useState(false);
  const [pendingIncludeWebsite, setPendingIncludeWebsite] = useState(false);
  const [pendingIncludeEmail, setPendingIncludeEmail] = useState(false);
  const [pendingIncludeCEO, setPendingIncludeCEO] = useState(false);

  const prevSearchCriteriaRef = useRef<SearchCriteria | null>(null);

  // State to hold the combined list of all branches and fetched sub-industries
  // const [combinedBranches, setCombinedBranches] = useState<string[]>([]); // Removed: no longer needed
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const ignorePageEffect = useRef(false);

  const projectId = "ijilcjvjtdcggzrxgtrf"; // Your Supabase project ID

  useEffect(() => {
    // console.log('useEffect for fetching sub-industries running...'); // Removed: no longer needed
    // Load saved search criteria from sessionStorage on component mount
    const savedCriteria = sessionStorage.getItem('lastSearchCriteria');
    if (savedCriteria) {
      try {
        // Removed: const parsedCriteria = JSON.parse(savedCriteria);
        // if (parsedCriteria) {
        //   setSelectedBranch(parsedCriteria.branch || '');
        //   setSelectedState(parsedCriteria.state || 'all');
        //   setCity(parsedCriteria.city || '');
        //   setZipCode(parsedCriteria.zipCode || '');
        //   setSelectedLegalForm(parsedCriteria.legalForm || 'Alle');
        //   setIncludePhone(parsedCriteria.includePhone || false);
        //   setIncludeWebsite(parsedCriteria.includeWebsite || false);
        //   setIncludeEmail(parsedCriteria.includeEmail || false);
        //   setIncludeCEO(parsedCriteria.includeCEO || false);
        //   setShowResults(true); // Show results section if criteria were loaded
        //   // Do not trigger a new search here, only load the UI state
        // }
      } catch {
        // console.error("Error parsing saved search criteria:", error);
      }
    }

    // Initialize filteredBranches directly with allBranches now that it's static
    setFilteredBranches(allBranches);

    // Removed the fetchSubIndustries function and its call as it's no longer needed
    // const fetchSubIndustries = async () => {
    //   try {
    //     const response = await fetch('/api/leads');
    //     const data = await response.json();
    //     // Removed Debugging logs

    //     // if (Array.isArray(data)) {
    //     //   // Only use sub-industries from the database, do not combine with hardcoded allBranches
    //     //   setCombinedBranches(Array.from(new Set([...data])); 
    //     //   console.log('Fetched sub-industries data:', data); // Add this log to see what the API returns
    //     //   // Removed Debugging logs
    //     // }
    //   } catch {
    //     console.error("Error fetching sub-industries:", error); // Temporarily re-enable for debugging
    //   }
    // };
    // console.log('Calling fetchSubIndustries...'); // Add this log
    // fetchSubIndustries();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedBranchQuery(branchQuery);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [branchQuery]);

  useEffect(() => {
    if (debouncedBranchQuery.length > 0) {
      setFilteredBranches(
        allBranches.filter(branch => // Filter allBranches directly
          fuzzyMatch(branch, debouncedBranchQuery)
        )
      );
    } else {
      setFilteredBranches(allBranches); // Set to allBranches when query is empty
    }
  }, [debouncedBranchQuery]); // Removed combinedBranches from dependency array

  // Memoized handleSearch function to ensure stable identity
  const handleSearch = useCallback(async () => {
    ignorePageEffect.current = true;
    setIsLoading(true);
    setShowResults(false);
    setLeads([]);

    // Update the actual include states from the pending states
    setIncludePhone(pendingIncludePhone);
    setIncludeWebsite(pendingIncludeWebsite);
    setIncludeEmail(pendingIncludeEmail);
    setIncludeCEO(pendingIncludeCEO);

    const searchCriteria = {
      branch: selectedBranch === 'Alle' ? null : selectedBranch,
      state: selectedState === 'all' ? null : selectedState,
      city: city.trim() === '' ? null : city.trim(),
      zipCode: zipCode.trim() === '' ? null : zipCode.trim(),
      legalForm: selectedLegalForm === 'Alle' ? null : selectedLegalForm,
      includePhone: pendingIncludePhone, // Use pending state for search criteria
      includeWebsite: pendingIncludeWebsite, // Use pending state for search criteria
      includeEmail: pendingIncludeEmail, // Use pending state for search criteria
      includeCEO: pendingIncludeCEO, // Use pending state for search criteria
    };
    prevSearchCriteriaRef.current = searchCriteria;

    const pagination = {
      limit: leadsPerPage,
      offset: (currentPage - 1) * leadsPerPage,
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchCriteria, pagination }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const fetchedLeads = data.leads || [];
      setLeads(fetchedLeads);
      setTotalLeadsFound(data.totalCount || 0);

      setOptionalCounts(data.counts || { phone: 0, email: 0, website: 0, ceo: 0 });

      setIsLoading(false);
      setShowResults(true);

      if (fetchedLeads.length === 0) {
        toast.info("Keine Leads gefunden", {
          description: "Es wurden leider keine Leads mit deinen Filtern gefunden. Bitte passen Sie Ihre Suchkriterien an.",
          position: "bottom-right",
          duration: 5000,
        });
      }

    } catch {
      // console.error('Error during leads search:', error);
      toast.error("Fehler", {
        description: "Es ist ein unerwarteter Fehler bei der Leads-Suche aufgetreten. Bitte versuchen Sie es erneut.",
        position: "bottom-right",
        duration: 8000,
      });
      setLeads([]);
      setTotalLeadsFound(0);
      setOptionalCounts({ phone: 0, email: 0, website: 0, ceo: 0 });
    } finally {
      setIsLoading(false);
      ignorePageEffect.current = false;
    }
  }, [
    selectedBranch,
    selectedState,
    city,
    zipCode,
    selectedLegalForm,
    leadsPerPage,
    currentPage,
    setLeads,
    setTotalLeadsFound,
    setOptionalCounts,
    setIsLoading,
    setShowResults,
    pendingIncludePhone,
    pendingIncludeWebsite,
    pendingIncludeEmail,
    pendingIncludeCEO,
  ]);

  // Effect to re-run search when currentPage changes (pagination)
  useEffect(() => {
    if (ignorePageEffect.current) {
      // This means handleSearch was just called directly, so prevent duplicate
      return;
    }

    // Only trigger if a previous search criteria exists (i.e., not initial render or fresh start)
    // AND if the currentPage is greater than 1 (meaning it's an actual pagination change, not the initial page 1 search).
    if (prevSearchCriteriaRef.current !== null && currentPage > 1) {
      handleSearch();
    }
  }, [currentPage, handleSearch, prevSearchCriteriaRef]);

  // Scroll to the total sum section when results are shown
  useEffect(() => {
    if (showResults) {
      const totalSumSection = document.getElementById('total-sum-section');
      if (totalSumSection) {
        totalSumSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [showResults]);

  // const totalCost = leads.length * 0.50; // This will be replaced by the detailed cost calculation

  // Define the cost structure based on user's request
  const { costItems, subtotal, discountAmount, totalExclUSt } = useMemo(() => {
    const items = [
    { label: "Standard Paket", pricePerItem: 0.10, count: totalLeadsFound },
  ];

  if (includePhone) {
      items.push({ label: "Telefonnummer", pricePerItem: 0.02, count: optionalCounts.phone });
  }
  if (includeEmail) {
      items.push({ label: "Email", pricePerItem: 0.02, count: optionalCounts.email });
  }
  if (includeWebsite) {
      items.push({ label: "Website", pricePerItem: 0.02, count: optionalCounts.website });
  }
  if (includeCEO) {
      items.push({ label: "Geschäftsführer", pricePerItem: 0.02, count: optionalCounts.ceo });
    }

    let currentSubtotal = 0;
    items.forEach(item => {
      currentSubtotal += item.pricePerItem * item.count;
    });

    // const discountPercentage = 0.50; // 50% - Moved to global constant
    const currentDiscountAmount = currentSubtotal * DISCOUNT_PERCENTAGE;
    const currentTotalExclUSt = currentSubtotal - currentDiscountAmount;

    return {
      costItems: items,
      subtotal: currentSubtotal,
      discountAmount: currentDiscountAmount,
      totalExclUSt: currentTotalExclUSt,
    };
  }, [totalLeadsFound, includePhone, includeEmail, includeWebsite, includeCEO, optionalCounts]);

  const handleBranchSearch = useCallback((value: string) => {
    setBranchQuery(value);
    setOpenCombobox(true);
  }, []);

  const selectBranch = useCallback((branch: string) => {
    setSelectedBranch(branch);
    setBranchQuery(branch);
    setOpenCombobox(false);
  }, []);

  // const handlePurchaseSuccess = useCallback((projectId: string) => {
  //   toast.success("Zahlung erfolgreich", {
  //     description: "Vielen Dank für Ihren Kauf! Die Leads werden Ihrem Konto gutgeschrieben.",
  //       position: "bottom-right",
  //       duration: 5000,
  //     });
  //   // Optionally redirect or update UI
  // }, []);

  const handleCheckout = useCallback(async () => {
    setIsCheckoutLoading(true);
    try {
      const stripe = await getStripe();

      if (!stripe) {
        toast.error("Fehler beim Checkout", {
          description: "Stripe konnte nicht initialisiert werden. Bitte versuchen Sie es später erneut.",
          position: "bottom-right",
          duration: 8000,
        });
        setIsCheckoutLoading(false);
        return;
      }

      const response = await fetch('/api/stripe/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: totalExclUSt,
          projectId: projectId,
          searchCriteria: prevSearchCriteriaRef.current,
          totalLeadsFound: totalLeadsFound,
          costItems: costItems, // Pass cost breakdown to backend
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const { sessionId } = await response.json();
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        // console.error('Stripe checkout error:', error.message);
        toast.error("Fehler beim Checkout", {
          description: error.message || "Es ist ein unbekannter Fehler beim Weiterleiten zum Checkout aufgetreten.",
          position: "bottom-right",
          duration: 8000,
        });
      }
    } catch {
      // console.error('Error in handleCheckout:', error);
      toast.error("Fehler", {
        description: "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.",
        position: "bottom-right",
        duration: 8000,
      });
    } finally {
      setIsCheckoutLoading(false);
    }
  }, [costItems, prevSearchCriteriaRef, totalLeadsFound, totalExclUSt, projectId]);

  return (
    <section id="firmensuche-section" className={`w-full max-w-sm md:max-w-3xl py-8 lg:max-w-4xl mx-auto px-2 sm:px-6 md:px-8 bg-background/40 dark:bg-background/80 rounded-2xl border border-[var(--border)] dark:border-gray-800 backdrop-blur-xl shadow-md transition-shadow ${className || ''}`}>
      <h3 className="text-center text-lg font-bold text-[var(--color-accent)]">Angebot -50% Gutscheincode: &quot;Juli-50&quot;</h3>

      <h2 className="text-balance text-2xl font-bold md:text-3xl lg:text-4xl text-center text-[var(--foreground)] mt-4 mb-4">Firmensuche</h2>
      <p className="text-base text-center text-[var(--foreground)] mb-10">Finde jetzt die passenden österreichischen Unternehmen aufgrund deiner Auswahlkriterien</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-2 sm:gap-x-4 md:gap-x-6">
        <div className="relative lg:col-span-2">
          <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 mb-2 text-center" htmlFor="branchSearch">Branche | Beruf | Begriff</label>
          <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCombobox}
                className="w-full justify-between font-[var(--font-poppins)] text-left font-normal"
              >
                {selectedBranch ? selectedBranch : "Branche wählen..."}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0 z-[9999]">
              <Command>
                <CommandInput
                  placeholder="Branche suchen..."
                  value={branchQuery}
                  onValueChange={handleBranchSearch}
                />
                <CommandList>
                  <CommandEmpty>Keine Branche gefunden.</CommandEmpty>
                  <CommandGroup>
                    {filteredBranches.map((branch) => (
                      <CommandItem
                        key={branch}
                        value={branch}
                        onSelect={(currentValue) => {
                          selectBranch(currentValue);
                        }}
                        className="font-[var(--font-poppins)]"
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedBranch === branch ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {branch}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="md:flex md:flex-col md:items-center">
          <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 mb-2 text-center" htmlFor="cityInput">Ort</label>
          <Input
            id="cityInput"
            type="text"
            className="w-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="md:flex md:flex-col md:items-center">
          <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 mb-2 text-center" htmlFor="zipCodeInput">PLZ</label>
          <Input
            id="zipCodeInput"
            type="text"
            className="w-full"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>

        <div>
          <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 mb-2 text-center" htmlFor="stateSelect">Bundesländer</label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Bundesland auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Alle</SelectItem>
                {allStates.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 mb-2 text-center" htmlFor="legalFormSelect">Rechtsform</label>
          <Select
            value={selectedLegalForm}
            onValueChange={(value) => setSelectedLegalForm(value)}
          >
            <SelectTrigger
              className="w-full font-[var(--font-poppins)] capitalize"
              id="legalForm"
            >
              <SelectValue placeholder="Alle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {allLegalForms.map(form => (
                  <SelectItem key={form} value={form}>{form}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

      </div>

      <div className="mt-14">
        <h3 className="text-lg font-medium text-[var(--foreground)] mb-6 text-center">Erweiter deine Leads mit passenden Optionen, insofern verfügbar</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-[var(--border)] rounded-md">
          <div className="flex items-center space-x-2">
            <Checkbox id="phone" checked={pendingIncludePhone} onCheckedChange={(checked: boolean) => setPendingIncludePhone(checked)} />
            <Label htmlFor="phone" className="text-sm text-gray-800">Telefonnummer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="website" checked={pendingIncludeWebsite} onCheckedChange={(checked: boolean) => setPendingIncludeWebsite(checked)} />
            <Label htmlFor="website" className="text-sm text-gray-800">Website</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="email" checked={pendingIncludeEmail} onCheckedChange={(checked: boolean) => setPendingIncludeEmail(checked)} />
            <Label htmlFor="email" className="text-sm text-gray-800">E-Mail Adresse</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="ceo" checked={pendingIncludeCEO} onCheckedChange={(checked: boolean) => setPendingIncludeCEO(checked)} />
            <Label htmlFor="ceo" className="text-sm text-gray-800">Geschäftsführer</Label>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center mb-4">
        <Button onClick={handleSearch} className="button-21">
          Jetzt Leads suchen
        </Button>
        {isLoading && (
          <div className="flex justify-center items-center mt-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="ml-2 text-[var(--foreground)]">Leads werden gesucht...</p>
          </div>
        )}
      </div>

      {showResults && (
        <div id="results-and-calculation-section" className="mt-12">
          {totalLeadsFound === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-4">Es wurden leider keine Leads mit deinen Filtern gefunden.</h3>
              <p className="text-gray-600">Bitte passe deine Suchkriterien an, um Ergebnisse zu erhalten.</p>
            </div>
          ) : (
            <>
              <h3 className="text-2xl font-semibold text-center text-[var(--foreground)] mb-6">Es wurden <span className="text-[var(--color-accent)] font-bold">{totalLeadsFound.toLocaleString('de-DE')}</span> Leads gefunden</h3>
              <LeadResultsTable 
                leads={leads} 
                className="mb-8" 
                includePhone={includePhone}
                includeWebsite={includeWebsite}
                includeEmail={includeEmail}
                includeCEO={includeCEO}
              />

              <div className="mt-4 p-4 bg-background/50 rounded-lg">
                {isLoading ? (
                  <div className="flex justify-center items-center py-4">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-[var(--color-primary)] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="ml-2 text-[var(--foreground)]">Leads werden geladen...</p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={() => setCurrentPage(prev => prev - 1)}
                      disabled={currentPage === 1}
                      className="bg-transparent text-[var(--foreground)] hover:bg-[var(--border)] hover:text-[var(--color-primary)] mr-2 cursor-pointer"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <span className="text-sm text-gray-500">
                      Seite {currentPage.toLocaleString('de-DE')} von {Math.ceil(totalLeadsFound / leadsPerPage).toLocaleString('de-DE')}
                    </span>
                    <Button
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={currentPage * leadsPerPage >= totalLeadsFound}
                      className="bg-transparent text-[var(--foreground)] hover:bg-[var(--border)] hover:text-[var(--color-primary)] ml-2 cursor-pointer"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-4 p-4 bg-background/50 rounded-lg">
                
                <div className="space-y-4">
                  {costItems.map((item, index) => (
                    <div key={index} className={`flex items-center text-gray-600 ${index < costItems.length - 1 ? 'border-b border-dashed border-[var(--border)] pb-2 mb-2' : ''} gap-x-1 md:gap-x-4`}>
                      <span className="flex-1 font-medium text-sm text-left">{item.label}</span>
                      <span className="min-w-[30px] md:min-w-[50px] text-center text-xs sm:text-sm">{item.pricePerItem.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} &euro;</span>
                      <span className="min-w-[30px] md:min-w-[50px] text-center text-xs sm:text-sm">{item.count} x</span>
                      <span className="min-w-[60px] md:min-w-[60px] text-center text-sm sm:text-base font-bold">{(item.pricePerItem * item.count).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} &euro;</span>
                    </div>
                  ))}
                  
                  <div className="border-t border-dashed border-[var(--border)] pt-2 mt-2"></div>

                  <div className="flex items-center text-gray-800 font-bold gap-x-1 md:gap-x-4">
                    <span className="flex-1 text-sm text-left">Zwischensumme</span>
                    <span className="min-w-[30px] md:min-w-[50px] text-right"></span>
                    <span className="min-w-[30px] md:min-w-[50px] text-right"></span>
                    <span className="min-w-[60px] md:min-w-[60px] text-right text-sm sm:text-base">{subtotal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} &euro;</span>
                  </div>

                  <div className="border-t border-dashed border-[var(--border)] pt-2 mt-2 flex items-center text-[var(--color-accent)] gap-x-1 md:gap-x-4">
                    <span className="flex-1 font-semibold text-sm text-left font-bold">Juli Aktion: &apos;Juli-50&apos;</span>
                    <span className="min-w-[30px] md:min-w-[50px] text-right text-sm sm:text-sm font-semibold">- {Math.round(DISCOUNT_PERCENTAGE * 100)}%</span>
                    <span className="min-w-[30px] md:min-w-[50px] text-right"></span>
                    <span className="min-w-[60px] md:min-w-[60px] text-right text-sm sm:text-base font-semibold">- {discountAmount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} &euro;</span>
                  </div>

                  <div className="border-t border-dashed border-[var(--border)] pt-2 mt-2"></div>

                  <div className="flex items-center text-gray-800 text-lg font-bold border-b border-dashed border-[var(--border)] pb-2 gap-x-1 md:gap-x-4" id="total-sum-section">
                    <span className="flex-1 text-base sm:text-lg text-left">Gesamtsumme</span>
                    <span className="min-w-[30px] md:min-w-[50px] text-right"></span>
                    <span className="min-w-[30px] md:min-w-[50px] text-right"></span>
                    <span className="min-w-[60px] md:min-w-[60px] text-right text-base sm:text-lg">{totalExclUSt.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} &euro;</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <div
                  onClick={() => {
                    if (!isCheckoutLoading && totalExclUSt < 1) {
                      toast.error("Mindestbestellwert", {
                        description: "Der Mindestbestellwert für Leads beträgt 1 Euro.",
                        position: "bottom-right",
                        duration: 8000,
                      });
                    } else if (!isCheckoutLoading && totalLeadsFound === 0) {
                      toast.error("Keine Leads gefunden", {
                        description: "Bitte passen Sie Ihre Suchkriterien an.",
                        position: "bottom-right",
                        duration: 5000,
                      });
                    }
                  }}
                  style={{ cursor: (totalExclUSt < 1 || totalLeadsFound === 0) ? 'not-allowed' : 'pointer' }}
                >
                  <Button
                    onClick={handleCheckout}
                    className="button-21 mx-auto"
                    disabled={isCheckoutLoading || totalLeadsFound === 0 || totalExclUSt < 1}
                  >
                    {isCheckoutLoading ? 'Umleiten...' : 'Zum Checkout'}
                  </Button>
                </div>
                <div className="mt-4 text-sm text-[var(--foreground)] opacity-80">
                  Sicher & bequem bezahlen
                </div>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <Image src="/img/visa.svg" alt="Visa" width={40} height={25} className="h-auto object-contain" />
                  <Image src="/img/mastercard.svg" alt="Mastercard" width={40} height={25} className="h-auto object-contain" />
                  <Image src="/img/paypal.svg" alt="PayPal" width={40} height={25} className="h-auto object-contain" />
                  <Image src="/img/stripe.svg" alt="Stripe" width={40} height={25} className="h-auto object-contain" />
                  <Image src="/img/klarna.svg" alt="Klarna" width={40} height={25} className="h-auto object-contain" />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
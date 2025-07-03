"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Input } from './input';
import { Button } from './button';
import { Checkbox } from './checkbox';
import { Label } from './label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from './select';
import LeadResultsTable from './LeadResultsTable';
import { useRouter } from 'next/router';
import getStripe from '@/utils/get-stripejs';
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
import Image from 'next/image';
import { Lead } from './LeadResultsTable';
import { ChevronLeft, ChevronRight } from "lucide-react";

export const allBranches = [
  // Industries
  "Anlagenbau", "Appartements", "Architekturbüro", "Autohandel", "Bäckerei", "Banken",
  "Bau", "Baunebengewerbe", "Baustoffhandel", "Beherbergung", "Bekleidung", "Beratung",
  "Bergbau", "Bestattung", "Betreuung und Pflege", "Bildung", "Biotechnologie", "Bootsbau",
  "Buchhandel", "Catering", "Chemie", "Dachdecker", "Design", "Dienstleistung",
  "Druck", "E-Commerce", "Einzelhandel", "Elektro", "Energie", "Entsorgung",
  "Eventmanagement", "Fahrzeughandel", "Finanzdienstleistung", "Fischerei", "Fleischerei", "Forstwirtschaft",
  "Fotografie", "Friseur", "Gastronomie", "Gartenbau", "Gebäudemanagement", "Gesundheit",
  "Großhandel", "Handel", "Handwerk", "Hausverwaltung", "Heizung", "Immobilien",
  "Industrie", "Informationstechnologie", "Ingenieurbüro", "Internet", "IT-Dienstleistung", "Juwelier",
  "KFZ", "Kino", "Klempner", "Kommunikation", "Kosmetik", "Krankenhaus",
  "Kunst", "Landwirtschaft", "Logistik", "Maler", "Marketing", "Maschinenbau",
  "Medien", "Medizintechnik", "Metallbau", "Möbel", "Mode", "Musik",
  "Nahrungsmittel", "Naturheilkunde", "Optiker", "Papier", "Personalvermittlung", "Pharma",
  "Physiotherapie", "Planung", "Produktion", "Psychologie", "Reinigung", "Reisebüro",
  "Reparatur", "Restaurant", "Rohstoffgewinnung", "Sanitär", "Schlosserei", "Schmuck",
  "Schuhhandel", "Sicherheit", "Software", "Solar", "Sport", "Stahlbau",
  "Steuerberatung", "Tourismus", "Transport", "Trockenbau", "Unternehmensberatung", "Versicherung",
  "Vertrieb", "Werbung", "Werkstatt", "Weinbau", "Wellness", "Wohnungsbau",
  "Zahnarzt", "Zeitarbeit", "Zellstoff",
  // Professions / Concepts (examples, can be expanded)
  "Anwalt", "Arzt", "Berater", "Bauer", "Designer", "Entwickler", "Finanzberater",
  "Handwerker", "Ingenieur", "Kaufmann", "Koch", "Künstler", "Lehrer",
  "Maler", "Manager", "Marketingexperte", "Musiker", "Pflegefachkraft", "Programmierer",
  "Psychologe", "Therapeut", "Tierarzt", "Tischler", "Verkäufer", "Zahntechniker",
  "Startups", "KMU", "Gewerbebetriebe", "Freiberufler", "Non-Profit-Organisationen",
  "B2B Dienstleister", "Produzierende Unternehmen", "Online-Shops", "Boutiquen",
  "Fitnessstudios", "Spas", "Hotels", "Pensionen", "Ferienwohnungen", "Campingplätze",
  "Eventlocations", "Caterer", "Hochzeitsplaner", "Messebauer", "Webagenturen",
  "SEO-Agenturen", "Social Media Agenturen", "PR-Agenturen", "Übersetzungsbüros",
  "Rechtsanwaltskanzleien", "Steuerkanzleien", "Wirtschaftsprüfer", "Notare",
  "Ärztepraxen", "Zahnarztpraxen", "Physiotherapiepraxen", "Apotheken", "Pflegedienste",
  "Bauunternehmen", "Immobilienmakler", "Architekten", "Garten- und Landschaftsbauer",
  "Elektriker", "Installateure", "Dachdecker", "Maler und Lackierer", "Tischlereien",
  "Schreinereien", "Metallbauunternehmen", "Maschinenbauunternehmen", "Anlagenbauunternehmen",
  "Softwareunternehmen", "IT-Beratungen", "Hardware-Hersteller", "Telekommunikationsanbieter",
  "Einzelhandelsgeschäfte", "Online-Händler", "Großhändler", "Export-Import-Unternehmen",
  "Gaststätten", "Cafés", "Bars", "Nachtclubs", "Hotels", "Restaurants",
  "Verlage", "Druckereien", "Werbeagenturen", "Filmproduktionen", "Tonstudios",
  "Reiseveranstalter", "Fluggesellschaften", "Busunternehmen", "Kreuzfahrtanbieter",
  "Logistikunternehmen", "Speditionen", "Kurierdienste", "Lagerhäuser",
  "Reinigungsgewerbe", "Gebäudereiniger", "Textilreinigung", "Industriereinigung",
  "Sicherheitsdienste", "Detekteien", "Alarmanlagen", "Videoüberwachung",
  "Finanzberater", "Versicherungsagenten", "Banken", "Bausparkassen", "Investmentfonds",
  "Bildungseinrichtungen", "Nachhilfeinstitute", "Sprachschulen", "Fahrschulen",
  "Sportvereine", "Fitnessstudios", "Yoga-Studios", "Tanzschulen",
  "Tierärzte", "Tierheime", "Zoohandlungen", "Tierpensionen",
  "Museen", "Galerien", "Theater", "Opernhäuser", "Konzerthäuser",
  "Gärtnereien", "Blumenläden", "Baumschulen", "Pflanzenhandel",
  "Landwirtschaftliche Betriebe", "Winzer", "Obstbauern", "Gemüsebauern",
  "Forstbetriebe", "Holzhandel", "Sägewerke", "Papierfabriken",
  "Recyclingunternehmen", "Müllentsorgung", "Abwasserbehandlung", "Luftreinhaltung",
  "Modeboutiquen", "Schuhgeschäfte", "Schmuckgeschäfte", "Uhrmacher",
  "Kosmetikstudios", "Friseursalons", "Nagelstudios", "Wellnesszentren",
  "Optiker", "Hörgeräteakustiker",
  "Eventagenturen", "Catering-Services", "Hochzeitslocations", "Ton- und Lichttechnik",
  "Filmstudios", "Medienproduzenten", "Verlage", "Rundfunkanstalten",
  "Immobilienverwaltung", "Facility Management", "Sicherheitsmanagement",
  "Bauträger", "Projektentwickler",
  "IT-Security", "Cloud Computing", "Big Data", "Künstliche Intelligenz", "Blockchain",
  "Robotik", "Automatisierung", "3D-Druck", "Nanotechnologie",
  "Erneuerbare Energien", "Photovoltaik", "Windkraft", "Wasserkraft", "Biomasse",
  "Umweltberatung", "Nachhaltigkeitsmanagement",
  "Forschung & Entwicklung", "Laboratorien", "Biopharmazeutika", "Gentherapie",
  "Telemedizin", "E-Health", "Mobile Health",
  "Consulting", "Interim Management", "Coaching", "Training",
  "E-Learning", "Online-Kurse", "Webinare",
  "Grafikdesign", "Webdesign", "App-Entwicklung", "UX/UI Design",
  "Content Marketing", "E-Mail Marketing", "Suchmaschinenmarketing",
  "Public Relations", "Krisenkommunikation",
  "Bauingenieure", "Maschinenbauingenieure", "Elektroingenieure", "Softwareingenieure",
  "Mediziner", "Ärzte", "Krankenschwestern", "Pfleger",
  "Juristen", "Rechtsanwälte", "Notare", "Richter",
  "Steuerberater", "Wirtschaftsprüfer", "Buchhalter",
  "Handelsvertreter", "Key Account Manager", "Vertriebsleiter",
  "Kundenservice", "Call Center", "Help Desk",
  "HR-Manager", "Recruiter", "Personalentwickler",
  "Logopäden", "Ergotherapeuten", "Heilpraktiker",
  "Archäologen", "Historiker", "Soziologen", "Philosophen",
  "Journalisten", "Autoren", "Redakteure", "Lektoren",
  "Kameraleute", "Regisseure", "Produzenten", "Schauspieler",
  "Tänzer", "Choreografen", "Bühnenbildner", "Kostümbildner",
  "Bildhauer", "Maler", "Zeichner", "Fotografen",
  "Chemiker", "Physiker", "Biologen", "Mathematiker",
  "Geologen", "Meteorologen", "Ozeanographen",
  "Tierpfleger", "Zooärzte", "Wildhüter",
  "Forstwirte", "Jäger", "Fischer",
  "Landwirte", "Gärtner", "Floristen",
  "Imker", "Winzer", "Brauer",
  "Köche", "Bäcker", "Konditoren", "Fleischer",
  "Restaurantfachleute", "Hotelfachleute", "Barkeeper",
  "Reiseverkehrskaufleute", "Flugbegleiter", "Piloten",
  "Tourismusmanager", "Fremdenführer",
  "Sportlehrer", "Fitnesstrainer", "Personal Trainer",
  "Masseure", "Physiotherapeuten", "Ernährungsberater",
  "Psychotherapeuten", "Psychologen", "Coaches",
  "Sozialarbeiter", "Pädagogen", "Erzieher",
  "Wissenschaftler", "Forscher", "Dozenten", "Professoren",
  "Bibliothekare", "Archivare", "Kuratoren",
  "Techniker", "Mechatroniker", "Elektroniker", "Informatiker",
  "Mechaniker", "Klempner", "Schweißer",
  "Sicherheitskräfte", "Polizisten", "Feuerwehrleute", "Sanitäter",
  "Soldaten", "Offiziere", "Piloten",
  "Architekten", "Bauleiter", "Statiker",
  "Entwicklungshelfer", "Humanitäre Helfer",
  "Geomaten", "Kartografen", "Vermessungstechniker",
  "Umweltberater", "Energieberater",
  "Dolmetscher", "Übersetzer",
  "Grafiker", "Illustratoren", "Animatoren",
  "SEO-Spezialisten", "SEM-Spezialisten", "Social Media Manager",
  "Data Scientists", "Datenanalysten", "Business Intelligence Spezialisten",
  "Blockchain-Entwickler", "KI-Entwickler", "Robotics-Ingenieure",
  "Cybersecurity-Experten", "Forensiker",
  "Qualitätsmanager", "Prozessmanager",
  "Supply Chain Manager", "Logistikplaner",
  "Fahrzeugbauer", "Flugzeugbauer", "Schiffbauer",
  "Textiltechniker", "Modedesigner",
  "Chemielaboranten", "Pharmakanten",
  "Biologen", "Mediziner", "Zahnmediziner",
  "Psychiater", "Neurologen",
  "Forstwissenschaftler", "Agrarwissenschaftler",
  "Geowissenschaftler", "Meteorologen",
  "Kriminalisten", "Ermittler",
  "Reiseberater", "Hotelmanager",
  "Sportwissenschaftler", "Ernährungswissenschaftler",
  "Fitnesstrainer", "Personal Coach",
  "Tanzlehrer", "Musikpädagogen",
  "Schriftsteller", "Journalisten", "Redakteure",
  "Künstleragenten", "Galeristen",
  "Restauratoren", "Kunsthistoriker"
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

export default function LeadSearchSection({ children, className }: { children?: React.ReactNode, className?: string }) {
  const [branchQuery, setBranchQuery] = useState<string>('');
  const [debouncedBranchQuery, setDebouncedBranchQuery] = useState('');
  const [filteredBranches, setFilteredBranches] = useState<string[]>([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [openCombobox, setOpenCombobox] = useState(false);
  const [selectedState, setSelectedState] = useState('all');
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
  const [leadsPerPage, setLeadsPerPage] = useState(20);
  const [optionalCounts, setOptionalCounts] = useState({
    phone: 0,
    email: 0,
    website: 0,
    ceo: 0,
  });

  const router = useRouter();

  const prevSearchCriteriaRef = useRef<any>(null); // Ref to store previous search criteria

  // State to hold the combined list of all branches and fetched sub-industries
  const [combinedBranches, setCombinedBranches] = useState<string[]>([]);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false); // New state for checkout loading

  useEffect(() => {
    // Load saved search criteria from sessionStorage on component mount
    const savedCriteria = sessionStorage.getItem('lastSearchCriteria');
    if (savedCriteria) {
      try {
        const parsedCriteria = JSON.parse(savedCriteria);
        setSelectedBranch(parsedCriteria.branch || '');
        setSelectedState(parsedCriteria.state || 'all');
        setCity(parsedCriteria.city || '');
        setZipCode(parsedCriteria.zipCode || '');
        setSelectedLegalForm(parsedCriteria.legalForm || 'Alle');
        setIncludePhone(parsedCriteria.includePhone || false);
        setIncludeWebsite(parsedCriteria.includeWebsite || false);
        setIncludeEmail(parsedCriteria.includeEmail || false);
        setIncludeCEO(parsedCriteria.includeCEO || false);
        // You might want to trigger a search here as well if the user returns to the page
        // However, for simplicity, we'll just restore the form fields for now.
        sessionStorage.removeItem('lastSearchCriteria'); // Clear after loading to prevent persistence across sessions
      } catch (error) {
        console.error("Error parsing saved search criteria:", error);
        sessionStorage.removeItem('lastSearchCriteria'); // Clear corrupted data
      }
    }

    // Fetch sub-industries from the backend
    const fetchSubIndustries = async () => {
      try {
        const response = await fetch('/api/leads', { method: 'GET' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const subIndustries = await response.json() as string[];
        const uniqueSubIndustries = Array.from(new Set(subIndustries));
        setCombinedBranches(['Alle', ...uniqueSubIndustries.sort()]);
      } catch (error) {
        console.error("Error fetching sub-industries:", error);
      }
    };
    fetchSubIndustries();
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
        combinedBranches.filter(branch =>
          fuzzyMatch(branch, debouncedBranchQuery)
        )
      );
    } else {
      setFilteredBranches(combinedBranches);
    }
  }, [debouncedBranchQuery, combinedBranches]);

  // Memoized handleSearch function to ensure stable identity
  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    setShowResults(false);
    setLeads([]);

    const searchCriteria = {
      branch: selectedBranch === 'Alle' ? null : selectedBranch,
      state: selectedState === 'all' ? null : selectedState,
      city: city.trim() === '' ? null : city.trim(),
      zipCode: zipCode.trim() === '' ? null : zipCode.trim(),
      legalForm: selectedLegalForm === 'Alle' ? null : selectedLegalForm,
      includePhone: includePhone,
      includeWebsite: includeWebsite,
      includeEmail: includeEmail,
      includeCEO: includeCEO,
    };

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

      setShowResults(true);
      prevSearchCriteriaRef.current = searchCriteria; // Update ref after successful search

    } catch (error) {
      console.error("Error fetching leads:", error);
      alert("Failed to fetch leads. Please try again.");
      setLeads([]);
      setTotalLeadsFound(0);
      setOptionalCounts({ phone: 0, email: 0, website: 0, ceo: 0 });
    } finally {
      setIsLoading(false);
    }
  }, [
    selectedBranch,
    selectedState,
    city,
    zipCode,
    selectedLegalForm,
    includePhone,
    includeWebsite,
    includeEmail,
    includeCEO,
    leadsPerPage,
    currentPage,
    setLeads,
    setTotalLeadsFound,
    setOptionalCounts,
    setIsLoading,
    setShowResults,
  ]);

  // Effect to re-run search when currentPage changes (pagination)
  useEffect(() => {
    if (prevSearchCriteriaRef.current !== null) {
      handleSearch();
    }
  }, [currentPage, handleSearch]); // handleSearch is a dependency as it's memoized

  // New useEffect to debounce search criteria changes
  useEffect(() => {
    const currentSearchCriteria = {
      branch: selectedBranch === 'Alle' ? null : selectedBranch,
      state: selectedState === 'all' ? null : selectedState,
      city: city.trim() === '' ? null : city.trim(),
      zipCode: zipCode.trim() === '' ? null : zipCode.trim(),
      legalForm: selectedLegalForm === 'Alle' ? null : selectedLegalForm,
      includePhone: includePhone,
      includeWebsite: includeWebsite,
      includeEmail: includeEmail,
      includeCEO: includeCEO,
    };

    // Only trigger if an initial search has been performed AND criteria have actually changed
    if (prevSearchCriteriaRef.current === null ||
        JSON.stringify(currentSearchCriteria) === JSON.stringify(prevSearchCriteriaRef.current)) {
      return; // No initial search done or no change in criteria, do nothing
    }

    const handler = setTimeout(() => {
      handleSearch();
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [
    selectedBranch,
    selectedState,
    city,
    zipCode,
    selectedLegalForm,
    includePhone,
    includeWebsite,
    includeEmail,
    includeCEO,
    handleSearch, // `handleSearch` is now stable due to `useCallback`
  ]);

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
  const costItems = [
    { label: "Standard Paket", pricePerItem: 0.10, count: totalLeadsFound },
  ];

  if (includePhone) {
    costItems.push({ label: "Telefonnummer", pricePerItem: 0.02, count: optionalCounts.phone });
  }
  if (includeEmail) {
    costItems.push({ label: "Email", pricePerItem: 0.02, count: optionalCounts.email });
  }
  if (includeWebsite) {
    costItems.push({ label: "Website", pricePerItem: 0.02, count: optionalCounts.website });
  }
  if (includeCEO) {
    costItems.push({ label: "Geschäftsführer", pricePerItem: 0.02, count: optionalCounts.ceo });
  }

  let subtotal = 0;
  costItems.forEach(item => {
    subtotal += item.pricePerItem * item.count;
  });

  const discountPercentage = 0.50; // 50%
  const discountAmount = subtotal * discountPercentage;
  const totalExclUSt = subtotal - discountAmount;

  const handleBranchSearch = useCallback((value: string) => {
    setBranchQuery(value);
    setOpenCombobox(true);
  }, []);

  const selectBranch = useCallback((branch: string) => {
    setSelectedBranch(branch);
    setBranchQuery(branch);
    setOpenCombobox(false);
  }, []);

  const handleCheckout = async () => {
    setIsCheckoutLoading(true); // Use new state for checkout loading
    try {
      const stripe = await getStripe();

      if (!stripe) {
        console.error("Stripe.js failed to load.");
        setIsCheckoutLoading(false);
        return;
      }

      // Capture all search criteria
      const searchCriteria = {
        branch: selectedBranch === 'Alle' ? null : selectedBranch,
        state: selectedState === 'all' ? null : selectedState,
        city: city.trim() === '' ? null : city.trim(),
        zipCode: zipCode.trim() === '' ? null : zipCode.trim(),
        legalForm: selectedLegalForm === 'Alle' ? null : selectedLegalForm,
        includePhone: includePhone,
        includeWebsite: includeWebsite,
        includeEmail: includeEmail,
        includeCEO: includeCEO,
      };

      sessionStorage.setItem('lastSearchCriteria', JSON.stringify(searchCriteria));

      // Pass costItems and searchCriteria to the backend
      const response = await fetch('/api/stripe/checkout_sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ costItems: costItems, searchCriteria: searchCriteria }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create checkout session.');
      }

      const { sessionId } = await response.json();

      if (!sessionId) {
        throw new Error('Session ID not received from backend.');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Error redirecting to Stripe Checkout:", error.message);
        alert(`Error: ${error.message}`);
      }
    } catch (error: any) {
      console.error("Checkout process failed:", error.message);
      alert(`An error occurred during checkout: ${error.message}`);
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <section id="firmensuche-section" className={`w-full max-w-sm md:max-w-3xl py-8 lg:max-w-4xl mx-auto px-2 sm:px-6 md:px-8 bg-background/40 dark:bg-background/80 rounded-2xl border border-[var(--border)] dark:border-gray-800 backdrop-blur-xl shadow-md transition-shadow ${className || ''}`}>
      <h3 className="text-center text-lg font-bold text-[var(--color-accent)]">Angebot -50% Gutscheincode: "Juli-50"</h3>

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
          <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 mb-2 text-center" htmlFor="cityInput">Stadt</label>
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
          <Select value={selectedState} onValueChange={(value) => setSelectedState(value)}>
            <SelectTrigger id="stateSelect" className="w-full">
              <SelectValue placeholder="Alle" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Alle</SelectItem>
                {allStates.map(state => (
                  <SelectItem key={state} value={state}>{state}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 block text-sm font-medium text-gray-700 mb-2 text-center" htmlFor="legalFormSelect">Rechtsform</label>
          <Select value={selectedLegalForm} onValueChange={(value) => setSelectedLegalForm(value)}>
            <SelectTrigger id="legalFormSelect" className="w-full">
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
        <h3 className="text-lg font-medium text-[var(--foreground)] mb-6 text-center">Erweiter deine Suche mit passenden Optionen, insofern verfügbar</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-[var(--border)] rounded-md">
          <div className="flex items-center space-x-2">
            <Checkbox id="phone" checked={includePhone} onCheckedChange={(checked: boolean) => setIncludePhone(checked)} />
            <Label htmlFor="phone" className="text-sm text-gray-800">Telefonnummer</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="website" checked={includeWebsite} onCheckedChange={(checked: boolean) => setIncludeWebsite(checked)} />
            <Label htmlFor="website" className="text-sm text-gray-800">Website</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="email" checked={includeEmail} onCheckedChange={(checked: boolean) => setIncludeEmail(checked)} />
            <Label htmlFor="email" className="text-sm text-gray-800">E-Mail Adresse</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="ceo" checked={includeCEO} onCheckedChange={(checked: boolean) => setIncludeCEO(checked)} />
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
                  <span className="min-w-[30px] md:min-w-[50px] text-center text-xs sm:text-sm">{item.pricePerItem.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                  <span className="min-w-[30px] md:min-w-[50px] text-center text-xs sm:text-sm">{item.count} x</span>
                  <span className="min-w-[60px] md:min-w-[60px] text-center text-sm sm:text-base font-bold">{(item.pricePerItem * item.count).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                </div>
              ))}
              
              <div className="border-t border-dashed border-[var(--border)] pt-2 mt-2"></div>

              <div className="flex items-center text-gray-800 font-bold gap-x-1 md:gap-x-4">
                <span className="flex-1 text-sm text-left">Zwischensumme</span>
                <span className="min-w-[30px] md:min-w-[50px] text-right"></span>
                <span className="min-w-[30px] md:min-w-[50px] text-right"></span>
                <span className="min-w-[60px] md:min-w-[60px] text-right text-sm sm:text-base">{subtotal.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
              </div>

              <div className="border-t border-dashed border-[var(--border)] pt-2 mt-2 flex items-center text-[var(--color-accent)] gap-x-1 md:gap-x-4">
                <span className="flex-1 font-semibold text-sm text-left font-bold">Juli Aktion: 'Juli-50'</span>
                <span className="min-w-[30px] md:min-w-[50px] text-right text-sm sm:text-base font-semibold">- {Math.round(discountPercentage * 100)}%</span>
                <span className="min-w-[30px] md:min-w-[50px] text-right"></span>
                <span className="min-w-[60px] md:min-w-[60px] text-right text-sm sm:text-base font-semibold">- {discountAmount.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
              </div>

              <div className="border-t border-dashed border-[var(--border)] pt-2 mt-2"></div>

              <div className="flex items-center text-gray-800 text-lg font-bold border-b border-dashed border-[var(--border)] pb-2 gap-x-1 md:gap-x-4" id="total-sum-section">
                <span className="flex-1 text-base sm:text-lg text-left">Gesamtsumme</span>
                <span className="min-w-[30px] md:min-w-[50px] text-right"></span>
                <span className="flex-1 text-sm sm:text-base text-right">{totalExclUSt.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} € exkl. USt.</span>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <Button className="button-21" onClick={handleCheckout} disabled={isCheckoutLoading}>
                {isCheckoutLoading ? 'Weiterleiten...' : 'Jetzt zum Checkout'}
              </Button>
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-500 mb-2">Sicher und bequem bezahlen mit:</p>
                <div className="flex items-center gap-1 w-full justify-center">
                  <Image alt="Visa" loading="lazy" width="40" height="25" decoding="async" data-nimg="1" className="h-auto object-contain" style={{ color: 'transparent' }} src="/img/visa.svg" />
                  <Image alt="Mastercard" loading="lazy" width="40" height="25" decoding="async" data-nimg="1" className="h-auto object-contain" style={{ color: 'transparent' }} src="/img/mastercard.svg" />
                  <Image alt="PayPal" loading="lazy" width="40" height="25" decoding="async" data-nimg="1" className="h-auto object-contain" style={{ color: 'transparent' }} src="/img/paypal.svg" />
                  <Image alt="Stripe" loading="lazy" width="40" height="25" decoding="async" data-nimg="1" className="h-auto object-contain" style={{ color: 'transparent' }} src="/img/stripe.svg" />
                  <Image alt="Klarna" loading="lazy" width="40" height="25" decoding="async" data-nimg="1" className="h-auto object-contain" style={{ color: 'transparent' }} src="/img/klarna.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {children}
    </section>
  );
} 

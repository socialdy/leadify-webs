import React from 'react';
import { cn } from '@/lib/utils';

export interface Lead {
  id: string;
  companyName: string;
  address: string;
  zipCode: string;
  city: string;
  state: string;
  email?: string;
  phone?: string;
  website?: string;
  ceo?: string;
  legalForm: string;
  salutation?: string;
  title1?: string;
  firstName?: string;
  lastName?: string;
  title2?: string;
  industry?: string;
  subIndustry?: string;
}

interface LeadResultsTableProps {
  leads: Lead[];
  className?: string;
  includePhone: boolean;
  includeWebsite: boolean;
  includeEmail: boolean;
  includeCEO: boolean;
}

const LeadResultsTable: React.FC<LeadResultsTableProps> = ({ leads, className, includePhone, includeWebsite, includeEmail, includeCEO }) => {
  if (leads.length === 0) {
    return (
      <div className={cn("text-center text-muted-foreground py-8", className)}>
        Keine Leads gefunden. Bitte passen Sie Ihre Suchkriterien an.
      </div>
    );
  }

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="min-w-full divide-y divide-border rounded-md border border-border">
        <thead className="bg-muted">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Firmenname
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Branche
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Subbranche
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Adresse
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              PLZ
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Ort
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Bundesland
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Rechtsform
            </th>
            {includeEmail && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                E-Mail
              </th>
            )}
            {includePhone && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Telefon
              </th>
            )}
            {includeWebsite && (
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Webseite
              </th>
            )}
            {includeCEO && (
              <>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Geschäftsführer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Anrede
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Titel 1
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Vorname
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Nachname
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Titel 2
                </th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="bg-popover divide-y divide-border">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-accent/10">
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground text-left select-none">
                {lead.companyName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                <span>{lead.industry || 'N/A'}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                <span>{lead.subIndustry || 'N/A'}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                <span>{lead.address}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                <span>{lead.zipCode}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                <span>{lead.city}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                <span>{lead.state}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                <span>{lead.legalForm}</span>
              </td>
              {includeEmail && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                  <span>{lead.email || 'N/A'}</span>
                </td>
              )}
              {includePhone && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                  <span>{lead.phone || 'N/A'}</span>
                </td>
              )}
              {includeWebsite && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                  <span>{lead.website || 'N/A'}</span>
                </td>
              )}
              {includeCEO && (
                <>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                    <span>{lead.ceo || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                    <span>{lead.salutation || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                    <span>{lead.title1 || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                    <span>{lead.firstName || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                    <span>{lead.lastName || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground text-left select-none blur-sm">
                    <span>{lead.title2 || 'N/A'}</span>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadResultsTable; 
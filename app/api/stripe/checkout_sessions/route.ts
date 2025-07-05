import Stripe from 'stripe';
import { NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-06-30.basil',
});

interface CostItem {
  label: string;
  pricePerItem: number;
  count: number;
}

export async function POST(req: Request) {
  try {
    const { costItems, searchCriteria } = await req.json();

    if (!costItems || costItems.length === 0) {
      return NextResponse.json({ statusCode: 400, message: 'No items provided for checkout.' }, { status: 400 });
    }

    const line_items = costItems.map((item: CostItem) => {
      let description = '';
      if (item.label === 'Standard Paket' && searchCriteria) {
        const criteriaParts = [];

        // Always include Branche, explicitly state 'Alle gewählt' if not specified
        const branchValue = searchCriteria.branch && searchCriteria.branch !== 'Alle' && searchCriteria.branch !== 'Alle Branchen'
          ? searchCriteria.branch
          : 'Alle gewählt';
        criteriaParts.push(`Branche: ${branchValue}`);

        if (searchCriteria.city && searchCriteria.city !== '') {
          criteriaParts.push(`Stadt: ${searchCriteria.city}`);
        }
        if (searchCriteria.zipCode && searchCriteria.zipCode !== '') {
          criteriaParts.push(`PLZ: ${searchCriteria.zipCode}`);
        }
        if (searchCriteria.state && searchCriteria.state !== 'all' && searchCriteria.state !== 'Alle Bundesländer') {
          criteriaParts.push(`Bundesland: ${searchCriteria.state}`);
        }
        if (searchCriteria.legalForm && searchCriteria.legalForm !== 'Alle' && searchCriteria.legalForm !== 'Alle Rechtsformen') {
          criteriaParts.push(`Rechtsform: ${searchCriteria.legalForm}`);
        }

        description = criteriaParts.length > 0 ? `Suchkriterien: ${criteriaParts.join(', ')}` : 'Standard Paket';
      } else {
        description = item.label;
      }

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: item.label,
            description: description || undefined, // Add description here
          },
          unit_amount: Math.round(item.pricePerItem * 100), // Amount in cents
        },
        quantity: item.count,
      };
    });

    const origin = req.headers.get('origin');

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment',
      discounts: [{
        coupon: 'zNwgljco',
      }],
      metadata: {
        search_criteria: JSON.stringify(searchCriteria), // Store search criteria as a JSON string
      },
      custom_fields: [
        {
          key: 'company_name',
          label: { type: 'custom', custom: 'Unternehmensname' },
          type: 'text',
          optional: false,
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      billing_address_collection: 'required',
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?canceled=true`,
    });
    return NextResponse.json({ sessionId: session.id }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json({ statusCode: 500, message: err.message }, { status: 500 });
    } else {
      return NextResponse.json({ statusCode: 500, message: 'An unknown error occurred.' }, { status: 500 });
    }
  }
} 
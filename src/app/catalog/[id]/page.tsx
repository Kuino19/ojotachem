import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { CHEMICALS_DATA } from '../../../data/chemicals';
import { ProductDetailClient } from '../../../components/ProductDetailClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return CHEMICALS_DATA.map((c) => ({
    id: c.id,
  }));
}

function findChemical(id: string) {
  const decoded = decodeURIComponent(id).toLowerCase();
  return CHEMICALS_DATA.find(
    (c) =>
      c.id.toLowerCase() === decoded ||
      c.id.toLowerCase() === `cmc-${decoded}` ||
      c.id.toLowerCase().replace('cmc-', '') === decoded
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const chemical = findChemical(id);

  if (!chemical) {
    return {
      title: 'Chemical Product Not Found | HopeArms Chemicals',
      description: 'The requested chemical product could not be located in our inventory.',
    };
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const title = `${chemical.name} (${chemical.grade}) Wholesale Price & COA | HopeArms Lagos`;
  const description = `Buy pure ${chemical.name} (${chemical.packaging}) at ${formatPrice(chemical.priceNgn)}. CAS: ${chemical.casNumber}. Certified ${chemical.grade} available for same-day delivery or collection at Ojota Depot Gate 2, Lagos.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: chemical.imageUrl ? [{ url: chemical.imageUrl }] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const chemical = findChemical(id);

  if (!chemical) {
    notFound();
  }

  const relatedChemicals = CHEMICALS_DATA.filter(
    (c) => c.category === chemical.category && c.id !== chemical.id
  ).slice(0, 3);

  return (
    <ProductDetailClient 
      chemical={chemical} 
      relatedChemicals={relatedChemicals} 
    />
  );
}

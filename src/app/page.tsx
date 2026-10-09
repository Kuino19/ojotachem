import { HomeClient } from '../components/HomeClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Buy Chemicals in Lagos & Ojota Market | 100% Pure Certified Depot',
  description:
    'Lagos & Ojota’s top chemical supplier. Buy pure industrial chemicals, water treatment reagents, soap making raw materials, cosmetics ingredients, and laboratory AR chemicals. Pay online or onsite at our Ojota Chemical Market depot. Same-day Lagos dispatch.',
  alternates: {
    canonical: 'https://ojotachem.com.ng',
  },
};

export default function HomePage() {
  return <HomeClient />;
}

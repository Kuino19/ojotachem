export const SITE_CONFIG = {
  name: 'OjotaChem | Premier Lagos Chemical Depot & Wholesale Suppliers',
  shortName: 'OjotaChem Lagos',
  legalName: 'OjotaChem Industrial & Specialty Chemicals Nigeria Ltd.',
  description:
    'Lagos & Ojota’s #1 certified chemical supplier. Buy pure industrial chemicals, water treatment reagents, soap & detergent raw materials, cosmetics ingredients, food grade additives, and laboratory AR chemicals. Pay online or onsite at our Ojota Chemical Market depot. Same-day Lagos delivery & nationwide freight.',
  url: 'https://ojotachem.com.ng',
  ogImage: '/images/ojota-chemicals-depot-lagos.jpg',
  telephone: '+234 803 294 8831',
  telephoneAlt: '+234 818 736 2901',
  email: 'orders@ojotachem.com.ng',
  salesEmail: 'sales@ojotachem.com.ng',
  address: {
    streetAddress: 'Block 4, Suite 12-18, Ojota Chemical Market Complex, Off Ikorodu Road',
    addressLocality: 'Ojota, Kosofe LGA',
    addressRegion: 'Lagos State',
    postalCode: '100242',
    addressCountry: 'NG',
  },
  geo: {
    latitude: 6.5862,
    longitude: 3.3768,
  },
  openingHours: [
    'Mo-Fr 08:00-18:00',
    'Sa 08:30-16:30'
  ],
  priceRange: '₦₦ - ₦₦₦₦',
  currenciesAccepted: 'NGN',
  paymentAccepted: 'Cash, POS at Ojota Counter, Paystack Online, Nigerian Bank Transfer, USSD',
  keywords: [
    'buy chemical in lagos',
    'buy chemical in ojota',
    'chemical dealers in ojota lagos',
    'ojota chemical market dealers',
    'chemical market in lagos',
    'industrial chemicals suppliers lagos',
    'water treatment chemicals lagos',
    'caustic soda flakes lagos ojota',
    'laboratory chemicals suppliers lagos',
    'soap detergent raw materials ojota',
    'food grade chemicals lagos',
    'cosmetics chemicals ojota lagos',
    'chemical price list lagos nigeria',
    'hth chlorine granules lagos',
    'labsa 96 sulfonic acid ojota',
    'pure vegetable glycerin lagos'
  ],
};

export const LOCAL_BUSINESS_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Store', 'WholesaleStore'],
  '@id': 'https://ojotachem.com.ng/#store',
  name: SITE_CONFIG.name,
  legalName: SITE_CONFIG.legalName,
  alternateName: ['Ojota Chemical Market Wholesale Depot', 'Lagos Chemical Suppliers'],
  url: SITE_CONFIG.url,
  logo: 'https://ojotachem.com.ng/logo.png',
  image: 'https://ojotachem.com.ng/images/ojota-depot.jpg',
  description: SITE_CONFIG.description,
  telephone: SITE_CONFIG.telephone,
  email: SITE_CONFIG.email,
  priceRange: SITE_CONFIG.priceRange,
  currenciesAccepted: SITE_CONFIG.currenciesAccepted,
  paymentAccepted: SITE_CONFIG.paymentAccepted,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE_CONFIG.address.streetAddress,
    addressLocality: SITE_CONFIG.address.addressLocality,
    addressRegion: SITE_CONFIG.address.addressRegion,
    postalCode: SITE_CONFIG.address.postalCode,
    addressCountry: SITE_CONFIG.address.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE_CONFIG.geo.latitude,
    longitude: SITE_CONFIG.geo.longitude,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:30',
      closes: '16:30',
    },
  ],
  areaServed: [
    {
      '@type': 'City',
      name: 'Lagos',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Ojota',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Ikeja',
    },
    {
      '@type': 'AdministrativeArea',
      name: 'Apapa',
    },
    {
      '@type': 'Country',
      name: 'Nigeria',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Industrial, Analytical, and Specialty Chemical Supplies',
    itemListElement: [
      {
        '@type': 'OfferCatalog',
        name: 'Industrial & Manufacturing Chemicals',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Water Treatment & Purification Chemicals',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Soap & Detergent Raw Materials',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Cosmetics & Personal Care Chemicals',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Laboratory Reagents & Analytical Grade Chemicals',
      },
      {
        '@type': 'OfferCatalog',
        name: 'Food & Beverage Grade Chemicals',
      },
    ],
  },
};

export const FAQ_DATA = [
  {
    question: 'Where can I buy authentic industrial and laboratory chemicals in Lagos?',
    answer:
      'You can buy genuine, NAFDAC-compliant industrial and laboratory chemicals directly from OjotaChem at our main depot located inside the Ojota Chemical Market Complex, off Ikorodu Road, Ojota, Lagos. We offer verified Certificates of Analysis (COA) and Material Safety Data Sheets (MSDS) for all inventory.',
  },
  {
    question: 'Can I inspect the chemicals and pay onsite at your Ojota warehouse?',
    answer:
      'Yes, 100%! We provide full Onsite Counter Payment (Cash, POS Terminal, or Instant Bank Transfer) at our Ojota Depot Gate 2 office. You or your logistics representative can physically verify the batch numbers, seals, and purity grades before making payment.',
  },
  {
    question: 'Do you deliver chemicals across Lagos Mainland and Lagos Island?',
    answer:
      'Yes. We operate same-day dedicated chemical delivery trucks across all Lagos zones including Ikeja, Apapa, Oshodi, Surulere, Lekki, Victoria Island, Ikoyi, Ikorodu, Badagry, and Epe. Bulk orders (drums, metric tons) are transported with certified dangerous-goods transit compliance.',
  },
  {
    question: 'How do I pay online on the website?',
    answer:
      'You can pay securely on our website via Paystack using any Nigerian debit or credit card (Mastercard, Visa, Verve), direct Nigerian bank transfer with instant confirmation, or USSD code. You receive an automated official receipt and order gate pass immediately.',
  },
  {
    question: 'Why is Ojota the best place to buy chemicals in Lagos?',
    answer:
      'Ojota Chemical Market is West Africa’s premier chemical trading hub. Buying directly through OjotaChem gives you direct access to port-imported bulk consignments, wholesale warehouse prices without retail middlemen markups, and guaranteed fresh manufacturing batches.',
  },
  {
    question: 'What documents come with chemical purchases?',
    answer:
      'Every chemical purchase comes with a certified Certificate of Analysis (COA), Material Safety Data Sheet (MSDS), Official Tax Invoice with TIN, and where applicable, NAFDAC clearance references.',
  },
];

export const FAQ_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_DATA.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

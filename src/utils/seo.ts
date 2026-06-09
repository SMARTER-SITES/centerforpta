export const siteUrl = 'https://centerforpta.com';
export const siteName = 'Center for Psychological Treatment and Assessment';
export const defaultTitle = `${siteName} | Dr. Jelena Djurovic`;
export const defaultDescription =
  'Psychotherapy, couples therapy, psychological assessments, immigration evaluations, and pre-surgical evaluations in Schaumburg, Illinois.';
export const defaultOgImage = `${siteUrl}/images/og-default.png`;
export const logoUrl = `${siteUrl}/images/logo.png`;
export const providerLicenseNumber = '071-011433';
export const contactPhone = '+1-847-230-0045';
export const textPhone = '+1-847-929-7040';
export const contactEmail = 'info@centerforpta.com';
export const mapUrl =
  'https://www.google.com/maps/search/?api=1&query=1320%20Tower%20Rd%20Suite%20156%20Schaumburg%20IL%2060173';

export const localServiceArea = [
  { '@type': 'City', name: 'Schaumburg' },
  { '@type': 'City', name: 'Hoffman Estates' },
  { '@type': 'City', name: 'Arlington Heights' },
  { '@type': 'City', name: 'Palatine' },
  { '@type': 'City', name: 'Rolling Meadows' },
  { '@type': 'City', name: 'Elk Grove Village' },
  { '@type': 'City', name: 'Streamwood' },
  { '@type': 'City', name: 'Des Plaines' },
  { '@type': 'AdministrativeArea', name: 'Illinois' },
  { '@type': 'AdministrativeArea', name: 'Chicagoland' }
];

const coreServiceOffers = [
  {
    name: 'Therapy in Schaumburg, IL',
    serviceType: 'Psychotherapy',
    path: '/therapy/'
  },
  {
    name: 'Psychological Testing and Assessment',
    serviceType: 'Psychological Assessment',
    path: '/psychological-assessment/'
  },
  {
    name: 'Immigration Psychological Evaluations',
    serviceType: 'Immigration Psychological Evaluation',
    path: '/immigration-evaluations/'
  },
  {
    name: 'Pre-Surgical and Bariatric Psychological Evaluations',
    serviceType: 'Pre-Surgical Psychological Evaluation',
    path: '/pre-surgical-psychological-evaluations/'
  },
  {
    name: 'Pregnancy Therapy and Prenatal Counseling',
    serviceType: 'Prenatal Therapy',
    path: '/prenatal-therapy/'
  },
  {
    name: 'Postpartum Therapy',
    serviceType: 'Postpartum Therapy',
    path: '/postpartum-therapy/'
  },
  {
    name: "Women's Mental Health Therapy",
    serviceType: "Women's Mental Health Therapy",
    path: '/womens-mental-health-therapy/'
  },
  {
    name: 'Bariatric Surgery Counseling',
    serviceType: 'Bariatric Surgery Counseling',
    path: '/bariatric-surgery-counseling/'
  }
];

export interface FaqItem {
  question: string;
  answer: string;
}

interface ServiceStructuredDataInput {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function resolveMetaImage(image?: string) {
  if (!image) {
    return defaultOgImage;
  }

  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }

  return absoluteUrl(image);
}

export function getBaseStructuredData(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#professional-service`,
    name: siteName,
    alternateName: 'Center for PTA',
    description,
    url: siteUrl,
    logo: logoUrl,
    image: defaultOgImage,
    hasMap: mapUrl,
    medicalSpecialty: ['Clinical Psychology', 'Psychotherapy', 'Psychological Assessment'],
    knowsLanguage: ['English', 'Serbian', 'Spanish'],
    knowsAbout: [
      'Therapy in Schaumburg, IL',
      'Psychological testing',
      'Immigration psychological evaluations',
      'Pre-surgical psychological evaluations',
      'Pregnancy therapy',
      'Postpartum therapy',
      'Bariatric surgery counseling',
      "Women's mental health therapy"
    ],
    telephone: contactPhone,
    email: contactEmail,
    priceRange: '$$',
    founder: {
      '@type': 'Person',
      name: 'Dr. Jelena Djurovic',
      jobTitle: 'Licensed Clinical Psychologist',
      identifier: {
        '@type': 'PropertyValue',
        propertyID: 'Illinois Clinical Psychologist License',
        value: providerLicenseNumber
      }
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1320 Tower Rd, Suite 156',
      addressLocality: 'Schaumburg',
      addressRegion: 'IL',
      postalCode: '60173',
      addressCountry: 'US'
    },
    areaServed: localServiceArea,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Clinical psychology services in Schaumburg and Illinois',
      itemListElement: coreServiceOffers.map((service) => ({
        '@type': 'Offer',
        url: absoluteUrl(service.path),
        itemOffered: {
          '@type': 'Service',
          name: service.name,
          serviceType: service.serviceType,
          url: absoluteUrl(service.path),
          areaServed: localServiceArea
        }
      }))
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'appointments and patient inquiries',
        telephone: contactPhone,
        email: contactEmail,
        areaServed: 'US',
        availableLanguage: ['English', 'Serbian', 'Spanish']
      },
      {
        '@type': 'ContactPoint',
        contactType: 'text inquiries',
        telephone: textPhone,
        areaServed: 'US',
        availableLanguage: ['English', 'Serbian', 'Spanish']
      }
    ]
  };
}

export function getFaqStructuredData(faqItems: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer
      }
    }))
  };
}

export function getServiceStructuredData({
  name,
  description,
  path,
  serviceType = name
}: ServiceStructuredDataInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    category: 'Mental health service',
    provider: {
      '@id': `${siteUrl}/#professional-service`
    },
    areaServed: localServiceArea,
    availableLanguage: ['English', 'Serbian', 'Spanish'],
    offers: {
      '@type': 'Offer',
      url: absoluteUrl('/contact/'),
      availability: 'https://schema.org/InStock',
      itemOffered: {
        '@type': 'Service',
        name,
        serviceType,
        areaServed: localServiceArea
      }
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: absoluteUrl('/contact/'),
      servicePhone: contactPhone,
      availableLanguage: ['English', 'Serbian', 'Spanish']
    }
  };
}

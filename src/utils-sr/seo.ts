export const siteUrl = 'https://centerforpta.com';
export const siteName = 'Center for Psychological Treatment and Assessment';
export const defaultTitle = `${siteName} | Dr. Jelena Djurovic`;
export const defaultDescription =
  'Psihoterapija, partnerska terapija, psihološke procene, imigracione evaluacije i predoperativne psihološke evaluacije u Schaumburgu, Illinois.';
export const defaultOgImage = `${siteUrl}/images/og-default.png`;
export const logoUrl = `${siteUrl}/images/logo.png`;
export const providerLicenseNumber = '071-011433';
export const providerNpiNumber = '1306636089';
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
    name: 'Psihoterapija u Schaumburgu, IL',
    serviceType: 'Psychotherapy',
    path: '/sr/therapy/'
  },
  {
    name: 'Partnerska terapija u Schaumburgu, IL',
    serviceType: 'Couples Therapy',
    path: '/sr/couples-therapy/'
  },
  {
    name: 'Psihološko testiranje i procena',
    serviceType: 'Psychological Assessment',
    path: '/sr/psychological-assessment/'
  },
  {
    name: 'Imigracione psihološke evaluacije',
    serviceType: 'Immigration Psychological Evaluation',
    path: '/sr/immigration-evaluations/'
  },
  {
    name: 'Predoperativne i bariatrijske psihološke evaluacije',
    serviceType: 'Pre-Surgical Psychological Evaluation',
    path: '/sr/pre-surgical-psychological-evaluations/'
  },
  {
    name: 'Terapija tokom trudnoće i prenatalno savetovanje',
    serviceType: 'Prenatal Therapy',
    path: '/sr/prenatal-therapy/'
  },
  {
    name: 'Postporođajna terapija',
    serviceType: 'Postpartum Therapy',
    path: '/sr/postpartum-therapy/'
  },
  {
    name: 'Mentalno zdravlje žena',
    serviceType: "Women's Mental Health Therapy",
    path: '/sr/womens-mental-health-therapy/'
  },
  {
    name: 'Savetovanje pre i posle bariatrijske operacije',
    serviceType: 'Bariatric Surgery Counseling',
    path: '/sr/bariatric-surgery-counseling/'
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
    knowsLanguage: ['English', 'Serbian'],
    knowsAbout: [
      'Psihoterapija u Schaumburgu, IL',
      'Partnerska terapija u Schaumburgu, IL',
      'Psihološko testiranje',
      'Imigracione psihološke evaluacije',
      'Predoperativne psihološke evaluacije',
      'Terapija tokom trudnoće',
      'Postporođajna terapija',
      'Bariatrijsko savetovanje',
      'Mentalno zdravlje žena'
    ],
    telephone: contactPhone,
    email: contactEmail,
    priceRange: '$$',
    founder: {
      '@id': `${siteUrl}/dr-jelena-djurovic/#person`
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
      name: 'Usluge kliničke psihologije u Schaumburgu i Illinoisu',
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
        contactType: 'zakazivanje i upiti klijenata',
        telephone: contactPhone,
        email: contactEmail,
        areaServed: 'US',
        availableLanguage: ['engleski', 'srpski']
      },
      {
        '@type': 'ContactPoint',
        contactType: 'tekstualni upiti',
        telephone: textPhone,
        areaServed: 'US',
        availableLanguage: ['engleski', 'srpski']
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
    availableLanguage: ['engleski', 'srpski'],
    offers: {
      '@type': 'Offer',
      url: absoluteUrl('/sr/contact/'),
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
      serviceUrl: absoluteUrl('/sr/contact/'),
      servicePhone: contactPhone,
      availableLanguage: ['engleski', 'srpski']
    }
  };
}

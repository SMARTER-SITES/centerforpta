import { googleBusinessProfileFacts } from './local-practice-data.js';

export const siteUrl = 'https://centerforpta.com';
export const siteName = 'Center for PTA';
export const defaultTitle = `${siteName} | Dr. Jelena Djurovic`;
export const practiceDescription =
  "Center for PTA offers women's mental health, self-compassion, reproductive stress and couples therapy, plus psychological evaluations in Schaumburg, IL.";
export const defaultDescription = practiceDescription;
export const defaultOgImage = `${siteUrl}/images/og-default.png`;
export const logoUrl = `${siteUrl}/images/logo.png`;
export const providerLicenseNumber = '071-011433';
export const idfprClinicalPsychologyUrl = 'https://idfpr.illinois.gov/profs/psych.html';
export const idfprLicenseLookupUrl = 'https://idfpr.illinois.gov/checklicense.html';
export const providerNpiNumber = '1770377095';
export const providerNpiUrl = `https://npiregistry.cms.hhs.gov/provider-view/${providerNpiNumber}`;
export const organizationNpiNumber = '1306636089';
export const organizationNpiUrl = `https://npiregistry.cms.hhs.gov/provider-view/${organizationNpiNumber}`;
export const legalName = 'Center for Psychological Treatment and Assessment';
export const contactPhone = '+1-847-230-0045';
export const textPhone = '+1-847-929-7040';
export const faxPhone = '+1-847-874-6273';
export const contactEmail = 'info@centerforpta.com';
export const googleBusinessProfileUrl =
  'https://www.google.com/maps?cid=12782923666205133006';
export const mapUrl = googleBusinessProfileUrl;

const serviceLanguages = ['en', 'sr'];

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
    name: 'Self-Compassion Therapy in Schaumburg, IL',
    serviceType: 'Self-Compassion Therapy',
    path: '/self-compassion-therapy/'
  },
  {
    name: 'Couples Therapy in Schaumburg, IL',
    serviceType: 'Couples Therapy',
    path: '/couples-therapy/'
  },
  {
    name: 'Family Therapy in Schaumburg, IL',
    serviceType: 'Family Therapy',
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
  },
  {
    name: 'Weight Loss Counseling',
    serviceType: 'Weight Loss Counseling',
    path: '/weight-loss-counseling/'
  },
  {
    name: 'Divorce Counseling',
    serviceType: 'Divorce Counseling',
    path: '/divorce-counseling/'
  },
  {
    name: 'Consultation, Supervision and Coaching',
    serviceType: 'Professional Consultation and Supervision',
    path: '/consultation-supervision-and-coaching/'
  }
];

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface ServiceStructuredDataInput {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
}

interface WebPageStructuredDataInput {
  name: string;
  description: string;
  url: string;
  language: string;
  image?: string;
}

interface FaqStructuredDataOptions {
  pageUrl?: string;
  language?: string;
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

export function getWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: `${siteUrl}/`,
    name: siteName,
    alternateName: [legalName, 'centerforpta.com'],
    publisher: {
      '@id': `${siteUrl}/#professional-service`
    },
    inLanguage: ['en-US', 'sr']
  };
}

export function getPracticeContactPoints() {
  return [
    {
      '@type': 'ContactPoint',
      '@id': `${siteUrl}/#appointments-contact-point`,
      contactType: 'appointments and practice inquiries',
      telephone: contactPhone,
      faxNumber: faxPhone,
      email: contactEmail,
      url: absoluteUrl('/contact/'),
      availableLanguage: serviceLanguages
    },
    {
      '@type': 'ContactPoint',
      '@id': `${siteUrl}/#text-contact-point`,
      contactType: 'text messaging',
      telephone: textPhone,
      url: absoluteUrl('/contact/'),
      availableLanguage: serviceLanguages
    }
  ];
}

export function getBaseStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': ['MedicalBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#professional-service`,
    name: siteName,
    legalName,
    alternateName: legalName,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'National Provider Identifier (NPI-2)',
      value: organizationNpiNumber
    },
    description: practiceDescription,
    url: siteUrl,
    sameAs: [organizationNpiUrl, googleBusinessProfileUrl],
    employee: {
      '@type': 'Person',
      '@id': `${siteUrl}/dr-jelena-djurovic/#person`,
      name: 'Dr. Jelena Djurovic',
      jobTitle: 'Illinois Licensed Clinical Psychologist'
    },
    logo: logoUrl,
    image: defaultOgImage,
    hasMap: mapUrl,
    medicalSpecialty: ['Clinical Psychology', 'Psychotherapy', 'Psychological Assessment'],
    knowsLanguage: serviceLanguages,
    knowsAbout: [
      'Therapy in Schaumburg, IL',
      "Women's mental health therapy",
      'Self-compassion therapy',
      'Reproductive stress and infertility counseling',
      'Fertility-treatment stress',
      'Reproductive loss support',
      'Couples therapy in Schaumburg, IL',
      'Family therapy in Schaumburg, IL',
      'Immigration psychological evaluations',
      'Pre-surgical psychological evaluations',
      'Pregnancy therapy',
      'Postpartum therapy',
      'Bariatric surgery counseling',
      'Weight loss counseling',
      'Psychological testing'
    ],
    telephone: contactPhone,
    faxNumber: faxPhone,
    email: contactEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1320 Tower Rd, Suite 156',
      addressLocality: 'Schaumburg',
      addressRegion: 'IL',
      postalCode: '60173',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.057142,
      longitude: -88.0468025
    },
    amenityFeature: googleBusinessProfileFacts.locationFeatures.map((feature) => ({
      '@type': 'LocationFeatureSpecification',
      name: feature.name,
      value: feature.value
    })),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '20:00'
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
    contactPoint: getPracticeContactPoints()
  };
}

export function getWebPageStructuredData({
  name,
  description,
  url,
  language,
  image
}: WebPageStructuredDataInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: language,
    isPartOf: {
      '@id': `${siteUrl}/#website`
    },
    about: {
      '@id': `${siteUrl}/#professional-service`
    },
    publisher: {
      '@id': `${siteUrl}/#professional-service`
    },
    ...(image
      ? {
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: image
          }
        }
      : {})
  };
}

export function getFaqStructuredData(
  faqItems: FaqItem[],
  { pageUrl, language }: FaqStructuredDataOptions = {}
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(pageUrl
      ? {
          '@id': `${pageUrl}#faq`,
          url: pageUrl,
          isPartOf: {
            '@id': `${pageUrl}#webpage`
          },
          about: {
            '@id': `${siteUrl}/#professional-service`
          }
        }
      : {}),
    ...(language ? { inLanguage: language } : {}),
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

export function getBreadcrumbStructuredData(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function getServiceStructuredData({
  name,
  description,
  path,
  serviceType = name
}: ServiceStructuredDataInput) {
  const serviceUrl = absoluteUrl(path);

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${serviceUrl}#service`,
    name,
    serviceType,
    description,
    url: serviceUrl,
    mainEntityOfPage: {
      '@id': `${serviceUrl}#webpage`
    },
    category: 'Mental health service',
    provider: {
      '@id': `${siteUrl}/#professional-service`
    },
    areaServed: localServiceArea,
    offers: {
      '@type': 'Offer',
      url: absoluteUrl('/contact/'),
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
      serviceLocation: {
        '@id': `${siteUrl}/#professional-service`
      },
      servicePhone: {
        '@type': 'ContactPoint',
        telephone: contactPhone,
        contactType: 'appointments and patient inquiries',
        availableLanguage: serviceLanguages
      },
      serviceSmsNumber: {
        '@type': 'ContactPoint',
        telephone: textPhone,
        contactType: 'text inquiries',
        availableLanguage: serviceLanguages
      },
      availableLanguage: serviceLanguages
    }
  };
}

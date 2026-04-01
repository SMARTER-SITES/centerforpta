export const siteUrl = 'https://centerforpta.com';
export const siteName = 'Center for Psychological Treatment and Assessment';
export const defaultTitle = `${siteName} | Dr. Jelena Djurovic`;
export const defaultDescription =
  'Psychotherapy, couples therapy, psychological assessments, immigration evaluations, and pre-surgical evaluations in Schaumburg, Illinois.';
export const defaultOgImage = `${siteUrl}/images/og-default.png`;
export const logoUrl = `${siteUrl}/images/logo.png`;
export const providerLicenseNumber = '071-011433';

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
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#professional-service`,
    name: siteName,
    description,
    url: siteUrl,
    logo: logoUrl,
    image: defaultOgImage,
    telephone: '+1-847-230-0045',
    email: 'info@centerforpta.com',
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
    areaServed: [
      {
        '@type': 'City',
        name: 'Schaumburg'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Illinois'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Chicagoland'
      }
    ],
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        telephone: '+1-847-230-0045',
        email: 'info@centerforpta.com',
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
    provider: {
      '@id': `${siteUrl}/#professional-service`
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Schaumburg'
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Illinois'
      }
    ],
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: absoluteUrl('/contact'),
      servicePhone: '+1-847-230-0045',
      availableLanguage: ['English', 'Serbian', 'Spanish']
    }
  };
}

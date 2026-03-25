export const siteUrl = 'https://centerforpta.com';
export const siteName = 'Center for Psychological Treatment and Assessment';
export const defaultTitle = `${siteName} | Dr. Jelena Djurovic`;
export const defaultDescription =
  'Psychotherapy, couples therapy, psychological assessments, immigration evaluations, and pre-surgical evaluations in Schaumburg, Illinois.';
export const defaultOgImage = `${siteUrl}/images/og-default.png`;
export const logoUrl = `${siteUrl}/images/logo.png`;

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
      jobTitle: 'Licensed Clinical Psychologist'
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

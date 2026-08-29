import {
  googleBusinessProfileFacts,
  nearbyCommunities,
  serbianLocalFaqItems
} from '../utils/local-practice-data.js';

export const siteBaseUrl = 'https://centerforpta.com';
export const siteName = 'Center for PTA';
export const contentSignal = 'ai-train=no, search=yes, ai-input=yes, use=reference';
export const homepageLinkHeader =
  '</.well-known/api-catalog>; rel="api-catalog", </api/openapi.json>; rel="service-desc"; type="application/openapi+json", </api/docs.md>; rel="service-doc"; type="text/markdown", </.well-known/agent-skills/index.json>; rel="describedby"; type="application/json", </llms.txt>; rel="describedby"; type="text/markdown"';

export const practiceProfile = {
  name: siteName,
  homepage: `${siteBaseUrl}/sr/`,
  description:
    'Psihoterapija usmerena na mentalno zdravlje žena, samosaosećanje, reproduktivni stres i podršku parovima, uz psihološke i imigracione evaluacije u Schaumburgu, Illinois.',
  organization: {
    publicName: siteName,
    legalName: 'Center for Psychological Treatment and Assessment',
    npi: '1306636089',
    npiType: 'NPI-2',
    registryUrl: 'https://npiregistry.cms.hhs.gov/provider-view/1306636089'
  },
  googleBusinessProfile: googleBusinessProfileFacts,
  provider: {
    name: 'Dr. Jelena Djurovic, Psy.D.',
    title: 'Licencirani klinički psiholog',
    license: '071-011433',
    npi: '1770377095',
    npiType: 'NPI-1',
    registryUrl: 'https://npiregistry.cms.hhs.gov/provider-view/1770377095',
    profileUrl: `${siteBaseUrl}/sr/dr-jelena-djurovic/`,
    psychologyTodayUrl:
      'https://www.psychologytoday.com/us/therapists/jelena-djurovic-schaumburg-il/1611370',
    mediaAppearances: [
      {
        type: 'NewsArticle',
        title:
          'Srpkinja psiholog u Čikagu: Od čega najviše pate naši ljudi u Americi i kako im psiholog može pomoći da dobiju "papire" (VIDEO)',
        publisher: 'Serbian Times',
        datePublished: '2025-07-07',
        url:
          'https://serbiantimes.info/srpkinja-psiholog-u-cikagu-od-cega-najvise-pate-nasi-ljudi-u-americi-i-kako-im-psiholog-moze-pomoci-da-dobiju-papire-video/'
      },
      {
        type: 'VideoObject',
        title: 'Nije Bitno Gde Sam Već Ko Sam S2: EP1 Jelena Djurović Psiholog',
        publisher: 'SBN Chicago News',
        url: 'https://www.youtube.com/watch?v=4xS8Sm2lOh4'
      }
    ]
  },
  location: {
    pageUrl: `${siteBaseUrl}/schaumburg-office/`,
    serbianPageUrl: `${siteBaseUrl}/sr/schaumburg-office/`,
    addressLine1: '1320 Tower Rd, Suite 156',
    city: 'Schaumburg',
    region: 'IL',
    postalCode: '60173',
    country: 'US',
    mapUrl: 'https://www.google.com/maps?cid=12782923666205133006',
    geo: {
      latitude: 42.057142,
      longitude: -88.0468025
    },
    timeZone: 'America/Chicago',
    openingHours: [
      {
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '20:00'
      }
    ],
    closedDays: ['Saturday', 'Sunday']
  },
  languages: ['engleski', 'srpski'],
  languageNote: 'Dr Djurovic govori konverzacijski španski. Kontaktirajte ordinaciju radi dogovora o jezičkim potrebama.',
  serviceFormats: [
    'Seanse uživo u Schaumburgu, Illinois',
    'Online seanse kada se svi klijenti fizički nalaze u Ilinoisu u trenutku seanse'
  ],
  availability: {
    status: 'contact_required',
    note: 'Kontaktirajte Center for PTA da potvrdite trenutnu dostupnost tražene usluge.'
  },
  insurance: {
    listedPlans: ['BCBS PPO', 'Aetna', 'UnitedHealthcare'],
    verificationRequired: true,
    note:
      'Status u mreži, pokrivene usluge, deductible, copay i obaveze pacijenta zavise od konkretnog plana. Pre početka usluge proverite aktuelne benefite sa osiguranjem i Center for PTA.'
  },
  serviceArea: ['Schaumburg', ...nearbyCommunities, 'Illinois'],
  locationFaq: serbianLocalFaqItems,
  contact: {
    email: 'info@centerforpta.com',
    phone: '+1-847-230-0045',
    text: '+1-847-929-7040',
    fax: '+1-847-874-6273',
    contactPage: `${siteBaseUrl}/sr/contact/`
  },
  cta: {
    consultation: 'Pitajte za uklapanje i trenutnu dostupnost',
    services: 'Pogledajte usluge'
  }
};

export const serviceDirectory = [
  {
    slug: 'therapy',
    name: 'Terapija',
    path: '/sr/therapy/',
    description:
      'Terapijska podrška za anksioznost, depresiju, traumu, tugu, životne promene i druge teme kojima prija stabilan, saosećajan prostor.',
    keywords: ['terapija', 'anksioznost', 'depresija', 'trauma', 'tuga', 'stres', 'oporavak', 'životna promena']
  },
  {
    slug: 'couples-therapy',
    name: 'Partnerska terapija',
    path: '/sr/couples-therapy/',
    description:
      'Partnerska terapija u Schaumburgu za teškoće u komunikaciji, ponavljajuće konflikte, probleme sa poverenjem, emocionalnu udaljenost i velike životne promene.',
    keywords: ['partnerska terapija', 'odnos', 'komunikacija', 'konflikt', 'poverenje', 'parovi']
  },
  {
    slug: 'family-therapy',
    name: 'Porodična terapija',
    path: '/sr/therapy/',
    description:
      'Porodična terapija u Schaumburgu za rad na konfliktima i porodičnoj dinamici kroz vođen, konstruktivan dijalog.',
    keywords: ['porodična terapija', 'porodično savetovanje', 'porodični konflikt', 'porodična dinamika']
  },
  {
    slug: 'psychological-assessment',
    name: 'Psihološka procena',
    path: '/sr/psychological-assessment/',
    description:
      'Procena pažnje, dijagnostičko razjašnjenje i razumevanje obrazaca koji utiču na svakodnevno funkcionisanje.',
    keywords: ['psihološka procena', 'psihološko testiranje', 'procena', 'testiranje', 'dijagnostičko razjašnjenje', 'pažnja', 'adhd']
  },
  {
    slug: 'immigration-evaluations',
    name: 'Imigracione evaluacije',
    path: '/sr/immigration-evaluations/',
    description:
      'Psihološke evaluacije za imigracione slučajeve kod klijenata koji se suočavaju sa stresnim pravnim i životnim okolnostima u SAD.',
    keywords: ['imigraciona evaluacija', 'imigracione evaluacije', 'imigracija', 'azil', 'viza', 'hardship']
  },
  {
    slug: 'consultation-supervision-and-coaching',
    name: 'Konsultacije, supervizija i koučing',
    path: '/sr/consultation-supervision-and-coaching/',
    description:
      'Profesionalne konsultacije, klinička supervizija, EPPP priprema i karijerni koučing kroz Center for PTA u Schaumburgu, Illinois. Da li se supervizija računa za licencu zavisi od zahteva nadležnog odbora i programa i mora se potvrditi pre početka.',
    keywords: ['konsultacije', 'supervizija', 'koučing', 'kliničar', 'klinički sati', 'karijera', 'eppp']
  },
  {
    slug: 'pre-surgical-psychological-evaluations',
    name: 'Predoperativne psihološke evaluacije',
    path: '/sr/pre-surgical-psychological-evaluations/',
    description:
      'Predoperativne evaluacije koje pomažu pacijentima i timovima da procene spremnost i potrebe za podrškom pre procedure.',
    keywords: ['predoperativna procena', 'predoperativna evaluacija', 'barijatrijska evaluacija', 'operacija', 'spremnost']
  },
  {
    slug: 'womens-mental-health-therapy',
    name: "Mentalno zdravlje žena",
    path: '/sr/womens-mental-health-therapy/',
    description:
      'Usmerena terapijska podrška kod neplodnosti, stresa tokom tretmana fertiliteta, reproduktivnog gubitka, prenatalnih i postpartalnih promena, slike tela i samosaosećanja.',
    keywords: [
      'mentalno zdravlje žena',
      'reproduktivni stres',
      'neplodnost',
      'neplodnosti',
      'tretman fertiliteta',
      'reproduktivni gubitak',
      'prenatalno',
      'postpartalno',
      'slika tela',
      'samosaosećanje'
    ]
  },
  {
    slug: 'self-compassion-therapy',
    name: 'Terapija samosaosećanja',
    path: '/sr/self-compassion-therapy/',
    description:
      'Podrška za oštru samokritiku, stid, perfekcionizam, burnout i građenje zdravijeg unutrašnjeg odnosa.',
    keywords: ['samosaosećanje', 'samokritika', 'stid', 'perfekcionizam', 'burnout']
  },
  {
    slug: 'prenatal-therapy',
    name: 'Prenatalna terapija',
    path: '/sr/prenatal-therapy/',
    description:
      'Terapijska podrška tokom trudnoće za anksioznost, prilagođavanje, emocionalnu preplavljenost i pripremu za roditeljstvo.',
    keywords: ['prenatalna terapija', 'trudnoća', 'roditeljstvo', 'anksioznost u trudnoći', 'prilagođavanje']
  },
  {
    slug: 'postpartum-therapy',
    name: 'Postpartalna terapija',
    path: '/sr/postpartum-therapy/',
    description:
      'Postpartalna terapija u Schaumburgu za postpartalnu depresiju, anksioznost, promene raspoloženja, identiteta i odnosa, kao i prilagođavanje posle porođaja.',
    keywords: [
      'postpartalna terapija',
      'postporođajna terapija',
      'postpartalna depresija',
      'postpartalna anksioznost',
      'postnatalna podrška',
      'posle porođaja',
      'novi roditelj',
      'raspoloženje'
    ]
  },
  {
    slug: 'divorce-counseling',
    name: 'Savetovanje tokom razvoda',
    path: '/sr/divorce-counseling/',
    description:
      'Savetodavna podrška pre, tokom i posle razvoda za tugu, stres oko zajedničkog roditeljstva i obnovu stabilnosti.',
    keywords: ['razvod', 'razdvajanje', 'zajedničko roditeljstvo', 'tuga', 'životna promena']
  },
  {
    slug: 'bariatric-surgery-counseling',
    name: 'Barijatrijsko savetovanje',
    path: '/sr/bariatric-surgery-counseling/',
    description:
      'Savetodavna podrška oko barijatrijske operacije za spremnost, prilagođavanje, sliku tela i dugoročnu promenu.',
    keywords: ['barijatrijsko savetovanje', 'barijatrijska operacija', 'slika tela', 'prilagođavanje', 'spremnost']
  },
  {
    slug: 'weight-loss-counseling',
    name: 'Savetovanje za mršavljenje',
    path: '/sr/weight-loss-counseling/',
    description:
      'Savetodavna podrška za održivu promenu ponašanja, emocionalne obrasce i mentalnu stranu ciljeva povezanih sa težinom.',
    keywords: ['mršavljenje', 'gubitak težine', 'promena ponašanja', 'savetovanje', 'odnos prema hrani']
  }
];

export const aiSearchCrawlerUserAgents = [
  'OAI-SearchBot',
  'ChatGPT-User',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Meta-ExternalFetcher'
];

export const aiTrainingCrawlerUserAgents = [
  'GPTBot',
  'ClaudeBot',
  'CCBot',
  'Applebot-Extended'
];

// Ovi tokeni kombinuju vise namena ili nemaju javno razdvojene namene.
// Ostaju dostupni za AI otkrivanje, dok Content-Signal zadrzava pravo na trening.
export const aiMixedPurposeCrawlerUserAgents = [
  'Google-Extended',
  'anthropic-ai',
  'Bytespider',
  'Meta-ExternalAgent',
];

export const aiCrawlerUserAgents = [
  ...aiSearchCrawlerUserAgents,
  ...aiTrainingCrawlerUserAgents,
  ...aiMixedPurposeCrawlerUserAgents
];

export function buildRobotsTxt() {
  const lines = [
    'User-agent: *',
    `Content-Signal: ${contentSignal}`,
    'Allow: /',
    'Disallow: /admin/',
    ''
  ];

  for (const userAgent of [
    ...aiSearchCrawlerUserAgents,
    ...aiMixedPurposeCrawlerUserAgents
  ]) {
    lines.push(`User-agent: ${userAgent}`);
    lines.push(`Content-Signal: ${contentSignal}`);
    lines.push('Allow: /');
    lines.push('Disallow: /admin/');
    lines.push('');
  }

  for (const userAgent of aiTrainingCrawlerUserAgents) {
    lines.push(`User-agent: ${userAgent}`);
    lines.push(`Content-Signal: ${contentSignal}`);
    lines.push('Disallow: /');
    lines.push('');
  }

  lines.push(`Sitemap: ${siteBaseUrl}/sitemap.xml`);
  lines.push('');

  return lines.join('\n');
}

export function createHomepageMarkdown() {
  const featuredServiceSlugs = [
    'therapy',
    'womens-mental-health-therapy',
    'self-compassion-therapy',
    'couples-therapy',
    'bariatric-surgery-counseling',
    'immigration-evaluations'
  ];
  const serviceList = featuredServiceSlugs
    .map((slug) => serviceDirectory.find((service) => service.slug === slug))
    .filter(Boolean)
    .map((service) => `- [${service.name}](${siteBaseUrl}${service.path}) - ${service.description}`)
    .join('\n');
  const locationFaq = practiceProfile.locationFaq
    .map((item) => `### ${item.question}\n\n${item.answer}`)
    .join('\n\n');
  const mediaAppearances = practiceProfile.provider.mediaAppearances
    .map((item) => `[${item.publisher}](${item.url})`)
    .join('; ');

  return `---
title: ${siteName}
url: ${practiceProfile.homepage}
provider: ${practiceProfile.provider.name}
license: ${practiceProfile.provider.license}
provider_npi: ${practiceProfile.provider.npi}
legal_name: ${practiceProfile.organization.legalName}
organization_npi: ${practiceProfile.organization.npi}
location: ${practiceProfile.location.city}, ${practiceProfile.location.region}
languages:
  - ${practiceProfile.languages.join('\n  - ')}
formats:
  - ${practiceProfile.serviceFormats.join('\n  - ')}
contact:
  email: ${practiceProfile.contact.email}
  phone: ${practiceProfile.contact.phone}
  text: ${practiceProfile.contact.text}
  fax: ${practiceProfile.contact.fax}
---

# ${siteName}

${practiceProfile.description}

## Sažetak prakse

- Javni naziv: ${practiceProfile.organization.publicName}
- Pravni naziv: ${practiceProfile.organization.legalName}
- NPI organizacije (NPI-2): [${practiceProfile.organization.npi}](${practiceProfile.organization.registryUrl})
- Terapeut: ${practiceProfile.provider.name}, ${practiceProfile.provider.title}
- Licenca u Ilinoisu: ${practiceProfile.provider.license}
- NPI terapeuta (NPI-1): [${practiceProfile.provider.npi}](${practiceProfile.provider.registryUrl})
- Profil doktorke: [Dr Jelena Djurovic](${practiceProfile.provider.profileUrl})
- Psychology Today profil: [Dr Jelena Djurovic u Schaumburgu](${practiceProfile.provider.psychologyTodayUrl})
- Nezavisna medijska gostovanja: ${mediaAppearances}
- Lokacija: ${practiceProfile.location.addressLine1}, ${practiceProfile.location.city}, ${practiceProfile.location.region} ${practiceProfile.location.postalCode}
- Google Maps: [Center for PTA u Schaumburgu](${practiceProfile.location.mapUrl})
- Radno vreme: ponedeljak-petak, 9:00-20:00 (${practiceProfile.location.timeZone}); subotom i nedeljom zatvoreno
- Jezici: ${practiceProfile.languages.join(', ')}
- Formati: ${practiceProfile.serviceFormats.join('; ')}
- Trenutna dostupnost: ${practiceProfile.availability.note}
- Navedeni planovi osiguranja: ${practiceProfile.insurance.listedPlans.join(', ')}. ${practiceProfile.insurance.note}

## Glavne usluge

${serviceList}

## Ordinacija u Schaumburgu i pitanja o lokaciji

${locationFaq}

## Kontakt

- Email: ${practiceProfile.contact.email}
- Telefon: ${practiceProfile.contact.phone}
- SMS: ${practiceProfile.contact.text}
- Fax: ${practiceProfile.contact.fax}
- Kontakt stranica: ${practiceProfile.contact.contactPage}

## Najbolji sledeći korak

Koristite kontakt stranicu ili se javite telefonom, SMS-om ili emailom da pitate za uklapanje, termine i sledeće korake.
`;
}

export function estimateMarkdownTokens(markdown) {
  return Math.max(1, Math.ceil(markdown.length / 4));
}

export function requestPrefersMarkdown(request) {
  const accept = request.headers.get('accept') || '';
  return accept.toLowerCase().includes('text/markdown');
}

export function createPracticePayload() {
  return {
    ...practiceProfile,
    api: {
      services: `${siteBaseUrl}/api/services.json`,
      contact: `${siteBaseUrl}/api/contact.json`,
      status: `${siteBaseUrl}/api/status.json`,
      openapi: `${siteBaseUrl}/api/openapi.json`,
      docs: `${siteBaseUrl}/api/docs.md`,
      llms: `${siteBaseUrl}/llms.txt`
    }
  };
}

export function createServicesPayload() {
  return {
    count: serviceDirectory.length,
    services: serviceDirectory.map((service) => ({
      name: service.name,
      slug: service.slug,
      url: `${siteBaseUrl}${service.path}`,
      description: service.description
    }))
  };
}

export function createContactPayload() {
  return {
    ...practiceProfile.contact,
    contactPage: `${siteBaseUrl}/sr/contact/`,
    preferredUse:
      'Koristite kontakt stranicu, telefon, SMS ili email da pitate za uklapanje, termine i sledeće korake.'
  };
}

export function createStatusPayload() {
  return {
    status: 'ok',
    publicReadOnly: true,
    homepage: `${siteBaseUrl}/sr/`,
    service: 'centerforpta-public-site-api',
    serviceDoc: `${siteBaseUrl}/api/docs.md`,
    serviceDesc: `${siteBaseUrl}/api/openapi.json`
  };
}

export function createOpenApiSpec() {
  return {
    openapi: '3.1.0',
    info: {
      title: 'Center for PTA javni API sajta',
      version: '1.0.0',
      description:
        'Javni API samo za čitanje koji opisuje praksu, usluge i kontakt opcije Center for PTA.'
    },
    servers: [
      {
        url: `${siteBaseUrl}/api`
      }
    ],
    paths: {
      '/practice.json': {
        get: {
          summary: 'Preuzmite pregled prakse',
          operationId: 'getPracticeOverview',
          responses: {
            '200': {
              description: 'Pregled prakse'
            }
          }
        }
      },
      '/services.json': {
        get: {
          summary: 'Prikažite javne usluge',
          operationId: 'listServices',
          responses: {
            '200': {
              description: 'Direktorijum usluga'
            }
          }
        }
      },
      '/contact.json': {
        get: {
          summary: 'Preuzmite kontakt opcije',
          operationId: 'getContactOptions',
          responses: {
            '200': {
              description: 'Kontakt opcije'
            }
          }
        }
      },
      '/status.json': {
        get: {
          summary: 'Preuzmite status API-ja',
          operationId: 'getStatus',
          responses: {
            '200': {
              description: 'Status API-ja'
            }
          }
        }
      }
    }
  };
}

export function createApiDocsMarkdown() {
  return `# Center for PTA javni API

Base URL: ${siteBaseUrl}/api

## Endpointi

- \`GET /api/practice.json\` - pregled prakse, terapeut, lokacija, jezici i povezani resursi
- \`GET /api/services.json\` - javni direktorijum usluga na sajtu
- \`GET /api/contact.json\` - email, telefon, SMS i kontakt stranica
- \`GET /api/status.json\` - jednostavan status za sisteme za otkrivanje
- \`GET /api/openapi.json\` - OpenAPI 3.1 opis javnog API-ja

## Napomene

- Ovaj API je samo za čitanje.
- Odražava informacije koje su već objavljene na ${siteBaseUrl}.
- Za pitanja o zakazivanju ili uklapanju, uputite korisnike na ${practiceProfile.contact.contactPage}.
`;
}

function normalizeText(value) {
  return value
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase('sr-Latn')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

function matchesKeyword(normalizedTopic, topicTokens, keyword) {
  const normalizedKeyword = normalizeText(keyword);
  if (!normalizedKeyword) return false;

  const keywordTokens = normalizedKeyword.split(' ').filter(Boolean);
  return keywordTokens.length === 1
    ? topicTokens.includes(keywordTokens[0])
    : ` ${normalizedTopic} `.includes(` ${normalizedKeyword} `);
}

export function matchServices(topic) {
  const normalizedTopic = normalizeText(topic || '');
  const topicTokens = normalizedTopic.split(' ').filter(Boolean);

  if (topicTokens.length === 0) {
    return [];
  }

  return serviceDirectory
    .map((service) => {
      const keywordHits = service.keywords.filter((keyword) =>
        matchesKeyword(normalizedTopic, topicTokens, keyword)
      );

      return {
        service,
        score: keywordHits.length,
        keywordHits
      };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.service.name.localeCompare(right.service.name))
    .slice(0, 3)
    .map((entry) => ({
      name: entry.service.name,
      url: `${siteBaseUrl}${entry.service.path}`,
      description: entry.service.description,
      matchedKeywords: entry.keywordHits
    }));
}

export const webMcpToolSpecs = [
  {
    name: 'get-practice-overview',
    description:
      'Vratite kratak pregled prakse, terapeuta, jezika, lokacije i javnih kontakt podataka, samo za čitanje.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false
    }
  },
  {
    name: 'list-services',
    description: 'Prikažite javne stranice usluga na sajtu i njihove kratke opise.',
    inputSchema: {
      type: 'object',
      properties: {
        includeDescriptions: {
          type: 'boolean',
          description: 'Postavite na false da vratite samo nazive i URL-ove.'
        }
      },
      additionalProperties: false
    }
  },
  {
    name: 'match-service-needs',
    description:
      'Predložite najbliže javne usluge na osnovu kratkog opisa potreba posetioca jednostavnim jezikom.',
    inputSchema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'Opis potrebe ili teme posetioca jednostavnim jezikom.'
        }
      },
      required: ['topic'],
      additionalProperties: false
    }
  },
  {
    name: 'get-contact-options',
    description: 'Vratite javni email, telefon, SMS i kontakt stranicu prakse.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false
    }
  }
];

export const agentSkills = [
  {
    name: 'site-overview',
    description:
      'Koristite kada vam treba činjeničan pregled prakse, terapeuta, lokacije, jezika i javnih usluga na centerforpta.com.',
    path: '/.well-known/agent-skills/site-overview/SKILL.md',
    content: `---
name: site-overview
description: Koristite kada vam treba činjeničan pregled prakse, terapeuta, lokacije, jezika i javnih usluga na centerforpta.com.
---

# Pregled sajta

Pre sažimanja prakse pročitajte javni API:

- Practice overview: ${siteBaseUrl}/api/practice.json
- Direktorijum usluga: ${siteBaseUrl}/api/services.json
- API docs: ${siteBaseUrl}/api/docs.md

Sažetke držite činjeničnim i zasnovanim na objavljenom sajtu. Kada korisnik pita za sledeći korak, uputite ga na javne kontakt opcije umesto da izmišljate tokove zakazivanja.
`
  },
  {
    name: 'contact-paths',
    description:
      'Koristite kada vam trebaju kontakt kanali odobreni na sajtu za Center for PTA.',
    path: '/.well-known/agent-skills/contact-paths/SKILL.md',
    content: `---
name: contact-paths
description: Koristite kada vam trebaju kontakt kanali odobreni na sajtu za Center for PTA.
---

# Kontakt putanje

Koristite objavljene kontakt podatke iz ${siteBaseUrl}/api/contact.json.

Odobreni javni kanali:

- Kontakt stranica: ${practiceProfile.contact.contactPage}
- Email: ${practiceProfile.contact.email}
- Telefon: ${practiceProfile.contact.phone}
- SMS: ${practiceProfile.contact.text}

Savet za usmeravanje neka bude jednostavan: uputite posetioce da kroz jedan od tih kanala pitaju za uklapanje, termine i sledeće korake.
`
  }
];

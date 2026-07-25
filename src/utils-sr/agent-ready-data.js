export const siteBaseUrl = 'https://centerforpta.com';
export const siteName = 'Center for Psychological Treatment and Assessment';
export const contentSignal = 'ai-train=no, search=yes, ai-input=yes';
export const homepageLinkHeader =
  '</.well-known/api-catalog>; rel="api-catalog", </api/openapi.json>; rel="service-desc"; type="application/openapi+json", </api/docs.md>; rel="service-doc"; type="text/markdown", </.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"';

export const practiceProfile = {
  name: siteName,
  homepage: `${siteBaseUrl}/sr/`,
  description:
    'Psihoterapija, partnerska terapija, psihološke procene, imigracione evaluacije i predoperativne psihološke evaluacije u Schaumburgu, Illinois.',
  provider: {
    name: 'Dr. Jelena Djurovic, Psy.D.',
    title: 'Licencirani klinički psiholog',
    license: '071-011433'
  },
  location: {
    addressLine1: '1320 Tower Rd, Suite 156',
    city: 'Schaumburg',
    region: 'IL',
    postalCode: '60173',
    country: 'US'
  },
  languages: ['engleski', 'srpski'],
  languageNote: 'Dr Djurovic govori konverzacijski španski. Kontaktirajte ordinaciju radi dogovora o jezičkim potrebama.',
  serviceFormats: [
    'Seanse uživo u Schaumburgu, Illinois',
    'Online seanse širom Illinoisa'
  ],
  contact: {
    email: 'info@centerforpta.com',
    phone: '+1-847-230-0045',
    text: '+1-847-929-7040',
    contactPage: `${siteBaseUrl}/sr/contact`
  },
  cta: {
    consultation: 'Zakažite besplatnu konsultaciju',
    services: 'Pogledajte usluge'
  }
};

export const serviceDirectory = [
  {
    slug: 'therapy',
    name: 'Terapija',
    path: '/sr/therapy',
    description:
      'Terapijska podrška za anksioznost, depresiju, traumu, tugu, životne promene i druge teme kojima prija stabilan, saosećajan prostor.',
    keywords: ['therapy', 'anxiety', 'depression', 'trauma', 'grief', 'stress', 'healing', 'life transition']
  },
  {
    slug: 'psychological-assessment',
    name: 'Psihološka procena',
    path: '/sr/psychological-assessment',
    description:
      'Procena pažnje, dijagnostičko razjašnjenje i razumevanje obrazaca koji utiču na svakodnevno funkcionisanje.',
    keywords: ['assessment', 'adhd', 'attention', 'diagnosis', 'clarity', 'evaluation', 'focus']
  },
  {
    slug: 'immigration-evaluations',
    name: 'Imigracione evaluacije',
    path: '/sr/immigration-evaluations',
    description:
      'Psihološke evaluacije za imigracione slučajeve kod klijenata koji se suočavaju sa stresnim pravnim i životnim okolnostima u SAD.',
    keywords: ['immigration', 'legal', 'evaluation', 'hardship', 'visa', 'asylum']
  },
  {
    slug: 'consultation-supervision-and-coaching',
    name: 'Konsultacije, supervizija i koučing',
    path: '/sr/consultation-supervision-and-coaching',
    description:
      'Profesionalne konsultacije, supervizija i koučing za kliničare koji grade veštine, sate i sigurnost u praksi.',
    keywords: ['consultation', 'supervision', 'coaching', 'clinician', 'clinical hours', 'career']
  },
  {
    slug: 'pre-surgical-psychological-evaluations',
    name: 'Predoperativne psihološke evaluacije',
    path: '/sr/pre-surgical-psychological-evaluations',
    description:
      'Predoperativne evaluacije koje pomažu pacijentima i timovima da procene spremnost i potrebe za podrškom pre procedure.',
    keywords: ['pre surgical', 'surgery', 'evaluation', 'readiness', 'clearance']
  },
  {
    slug: 'womens-mental-health-therapy',
    name: "Mentalno zdravlje žena",
    path: '/sr/womens-mental-health-therapy',
    description:
      "Usmerena terapijska podrška za reproduktivne izazove, brige oko slike tela, upotrebu supstanci i emocionalno zahtevne životne faze.",
    keywords: ['womens health', 'women', 'reproductive', 'body image', 'fertility', 'substance use']
  },
  {
    slug: 'self-compassion-therapy',
    name: 'Terapija samosaosećanja',
    path: '/sr/self-compassion-therapy',
    description:
      'Podrška za oštru samokritiku, stid, perfekcionizam, burnout i građenje zdravijeg unutrašnjeg odnosa.',
    keywords: ['self compassion', 'shame', 'perfectionism', 'burnout', 'self criticism']
  },
  {
    slug: 'prenatal-therapy',
    name: 'Prenatalna terapija',
    path: '/sr/prenatal-therapy',
    description:
      'Terapijska podrška tokom trudnoće za anksioznost, prilagođavanje, emocionalnu preplavljenost i pripremu za roditeljstvo.',
    keywords: ['prenatal', 'pregnancy', 'parenthood', 'anxiety', 'adjustment']
  },
  {
    slug: 'postpartum-therapy',
    name: 'Postpartalna terapija',
    path: '/sr/postpartum-therapy',
    description:
      'Postpartalna podrška za promene raspoloženja, stres, promene identiteta i zahteve ranog roditeljstva.',
    keywords: ['postpartum', 'new parent', 'parenthood', 'mood', 'stress']
  },
  {
    slug: 'divorce-counseling',
    name: 'Savetovanje tokom razvoda',
    path: '/sr/divorce-counseling',
    description:
      'Savetodavna podrška pre, tokom i posle razvoda za tugu, stres oko zajedničkog roditeljstva i obnovu stabilnosti.',
    keywords: ['divorce', 'separation', 'co parenting', 'grief', 'transition']
  },
  {
    slug: 'bariatric-surgery-counseling',
    name: 'Barijatrijsko savetovanje',
    path: '/sr/bariatric-surgery-counseling',
    description:
      'Savetodavna podrška oko barijatrijske operacije za spremnost, prilagođavanje, sliku tela i dugoročnu promenu.',
    keywords: ['bariatric', 'surgery', 'body image', 'adjustment', 'readiness']
  },
  {
    slug: 'weight-loss-counseling',
    name: 'Savetovanje za mršavljenje',
    path: '/sr/weight-loss-counseling',
    description:
      'Savetodavna podrška za održivu promenu ponašanja, emocionalne obrasce i mentalnu stranu ciljeva povezanih sa težinom.',
    keywords: ['weight loss', 'behavior change', 'counseling', 'nutrition mindset']
  }
];

export const aiCrawlerUserAgents = [
  'GPTBot',
  'ChatGPT-User',
  'Google-Extended',
  'anthropic-ai',
  'ClaudeBot',
  'CCBot',
  'PerplexityBot',
  'Bytespider',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'Applebot-Extended'
];

export function buildRobotsTxt() {
  const lines = ['User-agent: *', 'Allow: /', ''];

  for (const userAgent of aiCrawlerUserAgents) {
    lines.push(`User-agent: ${userAgent}`);
    lines.push('Allow: /');
    lines.push('');
  }

  lines.push(`Content-Signal: ${contentSignal}`);
  lines.push('');
  lines.push(`Sitemap: ${siteBaseUrl}/sitemap.xml`);
  lines.push('');

  return lines.join('\n');
}

export function createHomepageMarkdown() {
  const serviceList = serviceDirectory
    .slice(0, 6)
    .map((service) => `- [${service.name}](${siteBaseUrl}${service.path}) - ${service.description}`)
    .join('\n');

  return `---
title: ${siteName}
url: ${siteBaseUrl}/
provider: ${practiceProfile.provider.name}
license: ${practiceProfile.provider.license}
location: ${practiceProfile.location.city}, ${practiceProfile.location.region}
languages:
  - ${practiceProfile.languages.join('\n  - ')}
formats:
  - ${practiceProfile.serviceFormats.join('\n  - ')}
contact:
  email: ${practiceProfile.contact.email}
  phone: ${practiceProfile.contact.phone}
  text: ${practiceProfile.contact.text}
---

# ${siteName}

${practiceProfile.description}

## Sažetak prakse

- Terapeut: ${practiceProfile.provider.name}, ${practiceProfile.provider.title}
- Licenca u Illinoisu: ${practiceProfile.provider.license}
- Lokacija: ${practiceProfile.location.addressLine1}, ${practiceProfile.location.city}, ${practiceProfile.location.region} ${practiceProfile.location.postalCode}
- Jezici: ${practiceProfile.languages.join(', ')}
- Formati: ${practiceProfile.serviceFormats.join('; ')}

## Glavne usluge

${serviceList}

## Kontakt

- Email: ${practiceProfile.contact.email}
- Telefon: ${practiceProfile.contact.phone}
- SMS: ${practiceProfile.contact.text}
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
      docs: `${siteBaseUrl}/api/docs.md`
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
    contactPage: `${siteBaseUrl}/sr/contact`,
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
        'Javni API samo za čitanje koji opisuje praksu, usluge i kontakt opcije Center for Psychological Treatment and Assessment.'
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
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
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
        normalizedTopic.includes(normalizeText(keyword))
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
    path: '/sr/.well-known/agent-skills/site-overview/SKILL.md',
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
      'Koristite kada vam trebaju kontakt kanali odobreni na sajtu za Center for Psychological Treatment and Assessment.',
    path: '/sr/.well-known/agent-skills/contact-paths/SKILL.md',
    content: `---
name: contact-paths
description: Koristite kada vam trebaju kontakt kanali odobreni na sajtu za Center for Psychological Treatment and Assessment.
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

import {
  englishLocalFaqItems,
  googleBusinessProfileFacts,
  nearbyCommunities
} from './local-practice-data.js';

export const siteBaseUrl = 'https://centerforpta.com';
export const siteName = 'Center for PTA';
export const contentSignal = 'ai-train=no, search=yes, ai-input=yes, use=reference';
export const homepageLinkHeader =
  '</.well-known/api-catalog>; rel="api-catalog", </api/openapi.json>; rel="service-desc"; type="application/openapi+json", </api/docs.md>; rel="service-doc"; type="text/markdown", </.well-known/agent-skills/index.json>; rel="describedby"; type="application/json", </llms.txt>; rel="describedby"; type="text/markdown"';

export const practiceProfile = {
  name: siteName,
  homepage: `${siteBaseUrl}/`,
  description:
    "Psychotherapy centered on women's mental health, self-compassion, reproductive stress, and couples support, plus psychological and immigration evaluations in Schaumburg, Illinois.",
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
    title: 'Licensed Clinical Psychologist',
    license: '071-011433',
    npi: '1770377095',
    npiType: 'NPI-1',
    registryUrl: 'https://npiregistry.cms.hhs.gov/provider-view/1770377095',
    profileUrl: `${siteBaseUrl}/dr-jelena-djurovic/`,
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
  languages: ['English', 'Serbian'],
  languageNote: 'Dr. Djurovic speaks conversational Spanish. Contact the practice to discuss language needs.',
  serviceFormats: [
    'In-person sessions in Schaumburg, Illinois',
    'Telehealth sessions when all participating clients are physically located in Illinois'
  ],
  availability: {
    status: 'contact_required',
    note: 'Contact Center for PTA to confirm current availability for the requested service.'
  },
  insurance: {
    listedPlans: ['BCBS PPO', 'Aetna', 'UnitedHealthcare'],
    verificationRequired: true,
    note:
      'Network status, covered services, deductibles, copays, and patient responsibility depend on the specific plan. Verify current benefits with the insurer and Center for PTA before beginning services.'
  },
  serviceArea: ['Schaumburg', ...nearbyCommunities, 'Illinois'],
  locationFaq: englishLocalFaqItems,
  contact: {
    email: 'info@centerforpta.com',
    phone: '+1-847-230-0045',
    text: '+1-847-929-7040',
    fax: '+1-847-874-6273',
    contactPage: `${siteBaseUrl}/contact/`
  },
  cta: {
    consultation: 'Ask about fit and current availability',
    services: 'Explore our services'
  }
};

export const serviceDirectory = [
  {
    slug: 'therapy',
    name: 'Therapy',
    path: '/therapy/',
    description:
      'Therapy support for anxiety, depression, trauma, grief, life transitions, and other concerns that benefit from a steady, compassionate space.',
    keywords: ['therapy', 'anxiety', 'depression', 'trauma', 'grief', 'stress', 'healing', 'life transition']
  },
  {
    slug: 'couples-therapy',
    name: 'Couples Therapy',
    path: '/couples-therapy/',
    description:
      'Couples therapy in Schaumburg for communication difficulties, recurring conflict, trust concerns, emotional distance, and major life transitions.',
    keywords: [
      'couples therapy',
      'marriage counseling',
      'relationship counseling',
      'communication',
      'conflict',
      'trust',
      'relationship'
    ]
  },
  {
    slug: 'family-therapy',
    name: 'Family Therapy',
    path: '/therapy/',
    description:
      'Family therapy in Schaumburg for resolving conflicts and improving family dynamics through guided, constructive dialogue.',
    keywords: ['family therapy', 'family counseling', 'family conflict', 'family dynamics']
  },
  {
    slug: 'psychological-assessment',
    name: 'Psychological Assessment',
    path: '/psychological-assessment/',
    description:
      'Assessment support for attention, diagnostic clarification, and understanding patterns that are affecting daily life.',
    keywords: ['assessment', 'adhd', 'attention', 'diagnosis', 'clarity', 'evaluation', 'focus']
  },
  {
    slug: 'immigration-evaluations',
    name: 'Immigration Evaluations',
    path: '/immigration-evaluations/',
    description:
      'Immigration-focused psychological evaluations for clients dealing with stressful legal and life circumstances in the United States.',
    keywords: ['immigration', 'legal', 'evaluation', 'hardship', 'visa', 'asylum']
  },
  {
    slug: 'consultation-supervision-and-coaching',
    name: 'Consultation, Supervision and Coaching',
    path: '/consultation-supervision-and-coaching/',
    description:
      'Professional consultation, clinical supervision, EPPP preparation, and career coaching through Center for PTA in Schaumburg, Illinois. Whether supervision counts toward licensure depends on the applicable board and program requirements and must be confirmed before starting.',
    keywords: ['consultation', 'supervision', 'coaching', 'clinician', 'clinical hours', 'career']
  },
  {
    slug: 'pre-surgical-psychological-evaluations',
    name: 'Pre-Surgical Psychological Evaluations',
    path: '/pre-surgical-psychological-evaluations/',
    description:
      'Pre-surgical evaluations that help patients and care teams assess readiness and support needs before a procedure.',
    keywords: ['pre surgical', 'surgery', 'evaluation', 'readiness', 'clearance']
  },
  {
    slug: 'womens-mental-health-therapy',
    name: "Women's Mental Health",
    path: '/womens-mental-health-therapy/',
    description:
      'Focused therapy support for infertility, fertility-treatment stress, reproductive loss, prenatal and postpartum transitions, body image, and self-compassion.',
    keywords: [
      'womens health',
      'women',
      'reproductive stress',
      'infertility',
      'fertility treatment',
      'reproductive loss',
      'prenatal',
      'postpartum',
      'body image',
      'self compassion'
    ]
  },
  {
    slug: 'self-compassion-therapy',
    name: 'Self-Compassion Therapy',
    path: '/self-compassion-therapy/',
    description:
      'Support for harsh self-criticism, shame, perfectionism, burnout, and building a healthier inner relationship.',
    keywords: ['self compassion', 'shame', 'perfectionism', 'burnout', 'self criticism']
  },
  {
    slug: 'prenatal-therapy',
    name: 'Prenatal Therapy',
    path: '/prenatal-therapy/',
    description:
      'Therapy support during pregnancy for anxiety, adjustment, emotional overwhelm, and preparation for parenthood.',
    keywords: ['prenatal', 'pregnancy', 'parenthood', 'anxiety', 'adjustment']
  },
  {
    slug: 'postpartum-therapy',
    name: 'Postpartum Therapy',
    path: '/postpartum-therapy/',
    description:
      'Postpartum therapy in Schaumburg for postpartum depression, anxiety, mood changes, identity shifts, relationship stress, and adjustment after birth.',
    keywords: [
      'postpartum',
      'postpartum therapy',
      'postpartum depression',
      'postpartum anxiety',
      'postpartum counseling',
      'postnatal',
      'new parent',
      'parenthood',
      'mood',
      'stress'
    ]
  },
  {
    slug: 'divorce-counseling',
    name: 'Divorce Counseling',
    path: '/divorce-counseling/',
    description:
      'Counseling support before, during, and after divorce for grief, co-parenting stress, and rebuilding stability.',
    keywords: ['divorce', 'separation', 'co parenting', 'grief', 'transition']
  },
  {
    slug: 'bariatric-surgery-counseling',
    name: 'Bariatric Surgery Counseling',
    path: '/bariatric-surgery-counseling/',
    description:
      'Counseling support around bariatric surgery for readiness, adjustment, body image, and long-term change.',
    keywords: ['bariatric', 'surgery', 'body image', 'adjustment', 'readiness']
  },
  {
    slug: 'weight-loss-counseling',
    name: 'Weight Loss Counseling',
    path: '/weight-loss-counseling/',
    description:
      'Counseling support for sustainable behavior change, emotional patterns, and the mental side of weight-related goals.',
    keywords: ['weight loss', 'behavior change', 'counseling', 'nutrition mindset']
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

// These tokens combine multiple uses or do not publish a current purpose split.
// Keep them available for AI discovery while the Content-Signal reserves training use.
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
url: ${siteBaseUrl}/
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

## Practice summary

- Public brand: ${practiceProfile.organization.publicName}
- Legal entity: ${practiceProfile.organization.legalName}
- Organization NPI (NPI-2): [${practiceProfile.organization.npi}](${practiceProfile.organization.registryUrl})
- Provider: ${practiceProfile.provider.name}, ${practiceProfile.provider.title}
- Illinois license: ${practiceProfile.provider.license}
- Provider NPI (NPI-1): [${practiceProfile.provider.npi}](${practiceProfile.provider.registryUrl})
- Provider profile: [Dr. Jelena Djurovic](${practiceProfile.provider.profileUrl})
- Psychology Today profile: [Dr. Jelena Djurovic in Schaumburg](${practiceProfile.provider.psychologyTodayUrl})
- Independent media appearances: ${mediaAppearances}
- Location: ${practiceProfile.location.addressLine1}, ${practiceProfile.location.city}, ${practiceProfile.location.region} ${practiceProfile.location.postalCode}
- Google Maps: [Center for PTA in Schaumburg](${practiceProfile.location.mapUrl})
- Office hours: Monday-Friday, 9:00 AM-8:00 PM (${practiceProfile.location.timeZone}); closed Saturday and Sunday
- Languages: ${practiceProfile.languages.join(', ')}
- Formats: ${practiceProfile.serviceFormats.join('; ')}
- Current availability: ${practiceProfile.availability.note}
- Listed insurance plans: ${practiceProfile.insurance.listedPlans.join(', ')}. ${practiceProfile.insurance.note}

## Core services

${serviceList}

## Schaumburg office and location questions

${locationFaq}

## Contact

- Email: ${practiceProfile.contact.email}
- Phone: ${practiceProfile.contact.phone}
- Text: ${practiceProfile.contact.text}
- Fax: ${practiceProfile.contact.fax}
- Contact page: ${practiceProfile.contact.contactPage}

## Best next step

Use the contact page or reach out by phone, text, or email to ask about fit, scheduling, and next steps.
`;
}

export function createLlmsTxt() {
  const serviceLinks = serviceDirectory
    .map(
      (service) =>
        `- [${service.name}](${siteBaseUrl}${service.path}): ${service.description}`
    )
    .join('\n');

  return `# ${siteName}

> ${siteName} is a psychology practice in Schaumburg, Illinois, led by ${practiceProfile.provider.name}

Public brand: ${practiceProfile.organization.publicName}. Registered legal name: ${practiceProfile.organization.legalName}. Organization NPI (NPI-2): ${practiceProfile.organization.npi}. Provider NPI (NPI-1): ${practiceProfile.provider.npi}. Illinois psychology license: ${practiceProfile.provider.license}.

Office: ${practiceProfile.location.addressLine1}, ${practiceProfile.location.city}, ${practiceProfile.location.region} ${practiceProfile.location.postalCode}. Hours: Monday through Friday, 9:00 AM to 8:00 PM; closed Saturday and Sunday. Services are available in English and Serbian.

Telehealth is available only when all participating clients are physically located in Illinois. People who live outside Illinois may travel to the Schaumburg office for an in-person psychological evaluation when appropriate.

Contact Center for PTA to confirm current availability for the requested service. Listed insurance plans are ${practiceProfile.insurance.listedPlans.join(', ')}. ${practiceProfile.insurance.note}

## Practice and provider

- [Practice overview](${siteBaseUrl}/api/practice.json): Structured public brand, legal entity, provider, location, hours, languages, service area, and local FAQ data.
- [Dr. Jelena Djurovic](${siteBaseUrl}/dr-jelena-djurovic/): Provider biography, credentials, approach, and professional identifiers.
- [Psychology Today provider profile](${practiceProfile.provider.psychologyTodayUrl}): Independent professional directory profile for Dr. Jelena Djurovic in Schaumburg.
- [Serbian Times interview](${practiceProfile.provider.mediaAppearances[0].url}): Independent interview featuring Dr. Jelena Djurovic on immigrant mental health and psychological evaluations.
- [SBN Chicago News interview](${practiceProfile.provider.mediaAppearances[1].url}): Video interview featuring Dr. Jelena Djurovic.
- [Schaumburg office and contact](${siteBaseUrl}/contact/): Public phone, text, email, office address, and inquiry form.
- [Schaumburg office and location FAQ](${practiceProfile.location.pageUrl}): Address, hours, verified parking and restroom details, appointment guidance, nearby communities, telehealth boundaries, languages, insurance verification, and travel-to-Illinois answers.
- [Rates and insurance](${siteBaseUrl}/rates-and-insurance/): Current payment and insurance guidance, including the requirement to verify benefits for the specific plan and service.
- [Google Maps](${practiceProfile.location.mapUrl}): Exact Center for PTA office listing and map location.

## Core services

${serviceLinks}

## Clinical insights

- [Insights hub](${siteBaseUrl}/blog/): Published Center for PTA articles and pagination.
- [Reproductive Stress and Infertility](${siteBaseUrl}/blog/reproductive-stress-and-infertility/): Emotional effects of infertility and fertility treatment, coping, and when therapy may help.
- [Why Am I So Hard on Myself?](${siteBaseUrl}/blog/why-am-i-so-hard-on-myself/): Self-criticism, perfectionism, shame, and self-compassion.
- [What to Expect During an Immigration Psychological Evaluation](${siteBaseUrl}/blog/what-to-expect-during-an-immigration-psychological-evaluation/): Purpose, process, and preparation for an immigration psychological evaluation.

## Serbian

- [Serbian homepage](${siteBaseUrl}/sr/): Practice, services, and Schaumburg office information in Serbian.
- [Serbian office and location FAQ](${practiceProfile.location.serbianPageUrl}): Address, hours, verified parking and restroom details, appointment guidance, nearby communities, telehealth boundaries, languages, insurance verification, and travel-to-Illinois answers in Serbian.
- [Serbian provider profile](${siteBaseUrl}/sr/dr-jelena-djurovic/): Provider biography and professional details in Serbian.
- [Serbian rates and insurance](${siteBaseUrl}/sr/rates-and-insurance/): Informacije o plaćanju, navedenim planovima i proveri konkretnog pokrića na srpskom.
- [Serbian insights](${siteBaseUrl}/sr/blog/): Published articles in Serbian.
- [Reproduktivni stres i infertilitet](${siteBaseUrl}/sr/blog/reproductive-stress-and-infertility/): Emocionalni uticaj infertiliteta i tretmana fertiliteta, suočavanje i terapijska podrška.
- [Zašto sam toliko stroga prema sebi?](${siteBaseUrl}/sr/blog/why-am-i-so-hard-on-myself/): Samokritika, perfekcionizam, stid i samosaosećanje.
- [Šta očekivati tokom imigracione psihološke evaluacije](${siteBaseUrl}/sr/blog/what-to-expect-during-an-immigration-psychological-evaluation/): Svrha, proces i priprema za imigracionu psihološku evaluaciju.
- [Serbian contact page](${siteBaseUrl}/sr/contact/): Public contact details and inquiry form in Serbian.

## Machine-readable resources

- [Practice JSON](${siteBaseUrl}/api/practice.json): Canonical practice and local office facts.
- [Services JSON](${siteBaseUrl}/api/services.json): Current public service directory.
- [OpenAPI description](${siteBaseUrl}/api/openapi.json): Read-only API description.
- [API documentation](${siteBaseUrl}/api/docs.md): Human-readable API guide.
- [Agent skills index](${siteBaseUrl}/.well-known/agent-skills/index.json): Discovery index for the site's read-only agent guidance.
- [XML sitemap](${siteBaseUrl}/sitemap.xml): Indexable public URLs.
- [Robots policy](${siteBaseUrl}/robots.txt): Search, AI input, and training-use directives.
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
    contactPage: `${siteBaseUrl}/contact/`,
    preferredUse:
      'Use the contact page, phone, text, or email to ask about fit, scheduling, and next steps.'
  };
}

export function createStatusPayload() {
  return {
    status: 'ok',
    publicReadOnly: true,
    homepage: `${siteBaseUrl}/`,
    service: 'centerforpta-public-site-api',
    serviceDoc: `${siteBaseUrl}/api/docs.md`,
    serviceDesc: `${siteBaseUrl}/api/openapi.json`
  };
}

export function createOpenApiSpec() {
  return {
    openapi: '3.1.0',
    info: {
      title: 'Center for PTA Public Site API',
      version: '1.0.0',
      description:
        'A read-only public API describing Center for PTA practice, services, and contact options.'
    },
    servers: [
      {
        url: `${siteBaseUrl}/api`
      }
    ],
    paths: {
      '/practice.json': {
        get: {
          summary: 'Get practice overview',
          operationId: 'getPracticeOverview',
          responses: {
            '200': {
              description: 'Practice overview'
            }
          }
        }
      },
      '/services.json': {
        get: {
          summary: 'List public services',
          operationId: 'listServices',
          responses: {
            '200': {
              description: 'Service directory'
            }
          }
        }
      },
      '/contact.json': {
        get: {
          summary: 'Get contact options',
          operationId: 'getContactOptions',
          responses: {
            '200': {
              description: 'Contact options'
            }
          }
        }
      },
      '/status.json': {
        get: {
          summary: 'Get API status',
          operationId: 'getStatus',
          responses: {
            '200': {
              description: 'API status'
            }
          }
        }
      }
    }
  };
}

export function createApiDocsMarkdown() {
  return `# Center for PTA Public API

Base URL: ${siteBaseUrl}/api

## Endpoints

- \`GET /api/practice.json\` - practice overview, provider details, location, languages, and linked resources
- \`GET /api/services.json\` - public service directory for the site
- \`GET /api/contact.json\` - email, phone, text, and contact page details
- \`GET /api/status.json\` - simple status payload for discovery systems
- \`GET /api/openapi.json\` - OpenAPI 3.1 description of the public API

## Notes

- This API is read-only.
- It mirrors information already published on ${siteBaseUrl}.
- For scheduling or fit questions, direct users to ${practiceProfile.contact.contactPage}.
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
      'Return a concise read-only overview of the practice, provider, languages, location, and public contact details.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false
    }
  },
  {
    name: 'list-services',
    description: 'List the public service pages on the site and their short descriptions.',
    inputSchema: {
      type: 'object',
      properties: {
        includeDescriptions: {
          type: 'boolean',
          description: 'Set to false to return just names and URLs.'
        }
      },
      additionalProperties: false
    }
  },
  {
    name: 'match-service-needs',
    description:
      'Suggest the closest matching public services based on a short plain-language description of what the visitor needs.',
    inputSchema: {
      type: 'object',
      properties: {
        topic: {
          type: 'string',
          description: 'Plain-language description of the visitor need or topic.'
        }
      },
      required: ['topic'],
      additionalProperties: false
    }
  },
  {
    name: 'get-contact-options',
    description: 'Return the public email, phone, text, and contact page options for the practice.',
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
      'Use when you need a factual overview of the practice, provider, location, languages, and public services on centerforpta.com.',
    path: '/.well-known/agent-skills/site-overview/SKILL.md',
    content: `---
name: site-overview
description: Use when you need a factual overview of the practice, provider, location, languages, and public services on centerforpta.com.
---

# Site Overview

Read the public API before summarizing the practice:

- Practice overview: ${siteBaseUrl}/api/practice.json
- Services directory: ${siteBaseUrl}/api/services.json
- API docs: ${siteBaseUrl}/api/docs.md

Keep summaries factual and grounded in the published site. When a user asks for a next step, point them to the public contact options rather than inventing booking flows.
`
  },
  {
    name: 'contact-paths',
    description:
      'Use when you need the site-approved contact channels for Center for PTA.',
    path: '/.well-known/agent-skills/contact-paths/SKILL.md',
    content: `---
name: contact-paths
description: Use when you need the site-approved contact channels for Center for PTA.
---

# Contact Paths

Use the published contact details from ${siteBaseUrl}/api/contact.json.

Approved public channels:

- Contact page: ${practiceProfile.contact.contactPage}
- Email: ${practiceProfile.contact.email}
- Phone: ${practiceProfile.contact.phone}
- Text: ${practiceProfile.contact.text}

Keep routing advice simple: direct visitors to ask about fit, scheduling, and next steps through one of those channels.
`
  }
];

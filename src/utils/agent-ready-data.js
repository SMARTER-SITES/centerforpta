export const siteBaseUrl = 'https://centerforpta.com';
export const siteName = 'Center for Psychological Treatment and Assessment';
export const contentSignal = 'ai-train=no, search=yes, ai-input=yes';
export const homepageLinkHeader =
  '</.well-known/api-catalog>; rel="api-catalog", </api/openapi.json>; rel="service-desc"; type="application/openapi+json", </api/docs.md>; rel="service-doc"; type="text/markdown", </.well-known/agent-skills/index.json>; rel="describedby"; type="application/json"';

export const practiceProfile = {
  name: siteName,
  homepage: `${siteBaseUrl}/`,
  description:
    'Psychotherapy, couples therapy, psychological assessments, immigration evaluations, and pre-surgical evaluations in Schaumburg, Illinois.',
  provider: {
    name: 'Dr. Jelena Djurovic, Psy.D.',
    title: 'Licensed Clinical Psychologist',
    license: '071-011433'
  },
  location: {
    addressLine1: '1320 Tower Rd, Suite 156',
    city: 'Schaumburg',
    region: 'IL',
    postalCode: '60173',
    country: 'US'
  },
  languages: ['English', 'Serbian', 'Spanish'],
  serviceFormats: [
    'In-person sessions in Schaumburg, Illinois',
    'Telehealth sessions across Illinois'
  ],
  contact: {
    email: 'info@centerforpta.com',
    phone: '+1-847-230-0045',
    text: '+1-847-929-7040',
    contactPage: `${siteBaseUrl}/contact`
  },
  cta: {
    consultation: 'Schedule a free consultation',
    services: 'Explore our services'
  }
};

export const serviceDirectory = [
  {
    slug: 'therapy',
    name: 'Therapy',
    path: '/therapy',
    description:
      'Therapy support for anxiety, depression, trauma, grief, life transitions, and other concerns that benefit from a steady, compassionate space.',
    keywords: ['therapy', 'anxiety', 'depression', 'trauma', 'grief', 'stress', 'healing', 'life transition']
  },
  {
    slug: 'psychological-assessment',
    name: 'Psychological Assessment',
    path: '/psychological-assessment',
    description:
      'Assessment support for attention, diagnostic clarification, and understanding patterns that are affecting daily life.',
    keywords: ['assessment', 'adhd', 'attention', 'diagnosis', 'clarity', 'evaluation', 'focus']
  },
  {
    slug: 'immigration-evaluations',
    name: 'Immigration Evaluations',
    path: '/immigration-evaluations',
    description:
      'Immigration-focused psychological evaluations for clients dealing with stressful legal and life circumstances in the United States.',
    keywords: ['immigration', 'legal', 'evaluation', 'hardship', 'visa', 'asylum']
  },
  {
    slug: 'consultation-supervision-and-coaching',
    name: 'Consultation, Supervision and Coaching',
    path: '/consultation-supervision-and-coaching',
    description:
      'Professional consultation, supervision, and coaching for clinicians building skills, hours, and confidence in practice.',
    keywords: ['consultation', 'supervision', 'coaching', 'clinician', 'clinical hours', 'career']
  },
  {
    slug: 'pre-surgical-psychological-evaluations',
    name: 'Pre-Surgical Psychological Evaluations',
    path: '/pre-surgical-psychological-evaluations',
    description:
      'Pre-surgical evaluations that help patients and care teams assess readiness and support needs before a procedure.',
    keywords: ['pre surgical', 'surgery', 'evaluation', 'readiness', 'clearance']
  },
  {
    slug: 'womens-mental-health-therapy',
    name: "Women's Mental Health",
    path: '/womens-mental-health-therapy',
    description:
      "Focused therapy support for reproductive challenges, body image concerns, substance use concerns, and emotionally demanding life stages.",
    keywords: ['womens health', 'women', 'reproductive', 'body image', 'fertility', 'substance use']
  },
  {
    slug: 'self-compassion-therapy',
    name: 'Self-Compassion Therapy',
    path: '/self-compassion-therapy',
    description:
      'Support for harsh self-criticism, shame, perfectionism, burnout, and building a healthier inner relationship.',
    keywords: ['self compassion', 'shame', 'perfectionism', 'burnout', 'self criticism']
  },
  {
    slug: 'prenatal-therapy',
    name: 'Prenatal Therapy',
    path: '/prenatal-therapy',
    description:
      'Therapy support during pregnancy for anxiety, adjustment, emotional overwhelm, and preparation for parenthood.',
    keywords: ['prenatal', 'pregnancy', 'parenthood', 'anxiety', 'adjustment']
  },
  {
    slug: 'postpartum-therapy',
    name: 'Postpartum Therapy',
    path: '/postpartum-therapy',
    description:
      'Postpartum support for mood changes, stress, identity shifts, and the demands of early parenthood.',
    keywords: ['postpartum', 'new parent', 'parenthood', 'mood', 'stress']
  },
  {
    slug: 'divorce-counseling',
    name: 'Divorce Counseling',
    path: '/divorce-counseling',
    description:
      'Counseling support before, during, and after divorce for grief, co-parenting stress, and rebuilding stability.',
    keywords: ['divorce', 'separation', 'co parenting', 'grief', 'transition']
  },
  {
    slug: 'bariatric-surgery-counseling',
    name: 'Bariatric Surgery Counseling',
    path: '/bariatric-surgery-counseling',
    description:
      'Counseling support around bariatric surgery for readiness, adjustment, body image, and long-term change.',
    keywords: ['bariatric', 'surgery', 'body image', 'adjustment', 'readiness']
  },
  {
    slug: 'weight-loss-counseling',
    name: 'Weight Loss Counseling',
    path: '/weight-loss-counseling',
    description:
      'Counseling support for sustainable behavior change, emotional patterns, and the mental side of weight-related goals.',
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

## Practice summary

- Provider: ${practiceProfile.provider.name}, ${practiceProfile.provider.title}
- Illinois license: ${practiceProfile.provider.license}
- Location: ${practiceProfile.location.addressLine1}, ${practiceProfile.location.city}, ${practiceProfile.location.region} ${practiceProfile.location.postalCode}
- Languages: ${practiceProfile.languages.join(', ')}
- Formats: ${practiceProfile.serviceFormats.join('; ')}

## Core services

${serviceList}

## Contact

- Email: ${practiceProfile.contact.email}
- Phone: ${practiceProfile.contact.phone}
- Text: ${practiceProfile.contact.text}
- Contact page: ${practiceProfile.contact.contactPage}

## Best next step

Use the contact page or reach out by phone, text, or email to ask about fit, scheduling, and next steps.
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
    contactPage: `${siteBaseUrl}/contact`,
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
        'A read-only public API describing Center for Psychological Treatment and Assessment practice, services, and contact options.'
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
      'Use when you need the site-approved contact channels for Center for Psychological Treatment and Assessment.',
    path: '/.well-known/agent-skills/contact-paths/SKILL.md',
    content: `---
name: contact-paths
description: Use when you need the site-approved contact channels for Center for Psychological Treatment and Assessment.
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

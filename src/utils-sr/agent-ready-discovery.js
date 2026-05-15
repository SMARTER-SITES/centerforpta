import { createHash } from 'node:crypto';
import {
  agentSkills,
  siteBaseUrl
} from './agent-ready-data.js';

export function sha256Hex(content) {
  return createHash('sha256').update(content, 'utf8').digest('hex');
}

export function createAgentSkillsIndex() {
  return {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: agentSkills.map((skill) => ({
      name: skill.name,
      type: 'skill-md',
      description: skill.description,
      url: skill.path,
      digest: `sha256:${sha256Hex(skill.content)}`
    }))
  };
}

export function createApiCatalog() {
  return {
    linkset: [
      {
        anchor: `${siteBaseUrl}/api/`,
        'service-desc': [
          {
            href: `${siteBaseUrl}/api/openapi.json`,
            type: 'application/openapi+json'
          }
        ],
        'service-doc': [
          {
            href: `${siteBaseUrl}/api/docs.md`,
            type: 'text/markdown'
          }
        ],
        status: [
          {
            href: `${siteBaseUrl}/api/status.json`,
            type: 'application/json'
          }
        ]
      }
    ]
  };
}

import { agentSkills } from '../../../../utils/agent-ready-data.js';

const skill = agentSkills.find((entry) => entry.name === 'site-overview');

export function GET() {
  return new Response(skill?.content ?? '', {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
}

import { createAgentSkillsIndex } from '../../../utils/agent-ready-discovery.js';

export function GET() {
  return new Response(JSON.stringify(createAgentSkillsIndex(), null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

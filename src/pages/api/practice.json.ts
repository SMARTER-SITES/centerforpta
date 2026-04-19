import { createPracticePayload } from '../../utils/agent-ready-data.js';

export function GET() {
  return new Response(JSON.stringify(createPracticePayload(), null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

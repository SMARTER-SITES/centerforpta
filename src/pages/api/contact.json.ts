import { createContactPayload } from '../../utils/agent-ready-data.js';

export function GET() {
  return new Response(JSON.stringify(createContactPayload(), null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

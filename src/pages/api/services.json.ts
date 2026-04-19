import { createServicesPayload } from '../../utils/agent-ready-data.js';

export function GET() {
  return new Response(JSON.stringify(createServicesPayload(), null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

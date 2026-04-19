import { createOpenApiSpec } from '../../utils/agent-ready-data.js';

export function GET() {
  return new Response(JSON.stringify(createOpenApiSpec(), null, 2), {
    headers: {
      'Content-Type': 'application/openapi+json; charset=utf-8'
    }
  });
}

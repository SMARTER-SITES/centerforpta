import { createApiCatalog } from '../../utils/agent-ready-discovery.js';

export function GET() {
  return new Response(JSON.stringify(createApiCatalog(), null, 2), {
    headers: {
      'Content-Type':
        'application/linkset+json; profile="https://www.rfc-editor.org/info/rfc9727"; charset=utf-8'
    }
  });
}

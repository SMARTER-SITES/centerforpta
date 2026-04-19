import { createApiDocsMarkdown } from '../../utils/agent-ready-data.js';

export function GET() {
  return new Response(createApiDocsMarkdown(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8'
    }
  });
}

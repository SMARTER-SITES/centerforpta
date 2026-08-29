import {
  contentSignal,
  createLlmsTxt
} from '../utils/agent-ready-data.js';

export function GET() {
  return new Response(createLlmsTxt(), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Content-Signal': contentSignal
    }
  });
}

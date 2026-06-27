import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '../server/.env');

try {
  const envFile = readFileSync(envPath, 'utf8');
  for (const line of envFile.split(/\r?\n/)) {
    const match = line.match(/^\s*([^#][^=]*)=(.*)$/);
    if (match && !process.env[match[1].trim()]) {
      process.env[match[1].trim()] = match[2].trim();
    }
  }
} catch {
  // Netlify and CI should provide environment variables directly.
}

process.env.NETLIFY ||= 'true';

const { handler } = await import('../netlify/functions/api.mjs');

const event = {
  version: '2.0',
  routeKey: 'GET /api/health',
  rawPath: '/api/health',
  path: '/api/health',
  rawQueryString: '',
  headers: { host: 'localhost:8888' },
  requestContext: {
    http: {
      method: 'GET',
      path: '/api/health',
      sourceIp: '127.0.0.1',
      userAgent: 'node',
    },
  },
  httpMethod: 'GET',
  queryStringParameters: null,
  body: null,
  isBase64Encoded: false,
};

const response = await handler(event, { callbackWaitsForEmptyEventLoop: false });
console.log(response.statusCode);
console.log(response.body);

process.exit(response.statusCode === 200 ? 0 : 1);

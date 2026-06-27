import serverless from 'serverless-http';
import app from '../../server/app.js';
import { connectDB } from '../../server/db.js';

const serverlessHandler = serverless(app);

export const handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    await connectDB();
  } catch (err) {
    console.error('Netlify function failed to connect to MongoDB:', err?.message || err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message:
          'Backend unavailable: missing or invalid MONGODB_URI. Set environment variables in Netlify site settings.'
      })
    };
  }

  if (event.path && !event.path.startsWith('/api')) {
    const suffix = event.path.replace(/^\/\.netlify\/functions\/api/, '') || '';
    event.path = `/api${suffix.startsWith('/') ? suffix : `/${suffix}`}`;
  }

  return serverlessHandler(event, context);
};

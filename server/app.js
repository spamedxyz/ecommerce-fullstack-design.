import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:8888',
  process.env.CLIENT_URL,
  process.env.URL,
  process.env.DEPLOY_PRIME_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.some((allowed) => origin === allowed || origin.endsWith('.netlify.app'))) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    credentials: true,
  })
);
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'eCommerce API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

if (process.env.NODE_ENV === 'production' && !process.env.NETLIFY) {
  const clientDist = path.join(process.cwd(), 'client/dist');
  app.use(express.static(clientDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(clientDist, 'index.html'));
  });
}

export default app;

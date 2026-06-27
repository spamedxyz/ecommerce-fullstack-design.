# ShopVerse — Full-Stack eCommerce Application

A fully functional eCommerce web application built for the Full-Stack Development Internship task. Includes responsive frontend, Express REST API, MongoDB database, JWT authentication, cart management, and an admin panel.

**Repository:** `ecommerce-fullstack-design`

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, TailwindCSS, React Router |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose ODM) |
| Auth | JWT (JSON Web Tokens) |
| Cart | localStorage persistence |

---

## Features

### Week 1 — Static Frontend
- Responsive Home, Product Listing, Product Details, and Cart pages
- Mobile-first design with TailwindCSS (Flexbox + Grid)
- Modern eCommerce UI inspired by professional Figma templates

### Week 2 — Backend Integration
- MongoDB product collection with: `id`, `name`, `price`, `image`, `description`, `category`, `stock`
- Full CRUD REST API for products
- Dynamic data fetching on all pages
- Search bar to filter products by name or category

### Week 3 — Advanced Features
- JWT user authentication (login / signup)
- Protected admin routes
- Admin panel for product CRUD
- Cart add/remove with localStorage persistence
- Deployment-ready configuration

---

## Project Structure

```
ecommerce-fullstack-design/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── api/            # API client
│   │   ├── components/     # Reusable UI components
│   │   ├── context/        # Auth & Cart context providers
│   │   └── pages/          # Route pages
│   └── package.json
├── server/                 # Express backend
│   ├── models/             # Mongoose schemas
│   ├── routes/             # API routes
│   ├── middleware/         # JWT auth middleware
│   ├── seed.js             # Sample data seeder
│   └── package.json
├── package.json            # Root scripts
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [MongoDB](https://www.mongodb.com/try/download/community) running locally, **or** a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ecommerce-fullstack-design.git
cd ecommerce-fullstack-design
```

### 2. Install dependencies

```bash
npm run install:all
```

### 3. Configure environment

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce-fullstack
JWT_SECRET=your_super_secret_jwt_key_change_in_production
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

### 4. Seed the database

Make sure MongoDB is running, then:

```bash
npm run seed
```

This creates 12 sample products and an admin account:
- **Email:** `admin@shop.com`
- **Password:** `admin123`

### 5. Run the application

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

### Access from another device on the same Wi-Fi

The dev servers are configured to listen on your network. Find your computer's IPv4 address:

```powershell
ipconfig
```

Look for the active Wi-Fi or Ethernet adapter's `IPv4 Address`, then open this URL on your phone or another laptop:

```text
http://YOUR_IPV4_ADDRESS:5173
```

Example:

```text
http://192.168.1.25:5173
```

Keep `npm run dev` running on your computer while testing. If the page does not open, allow Node.js through Windows Defender Firewall for private networks.

---

## API Endpoints

### Products

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/products` | No | List all products (`?search=&category=&featured=`) |
| GET | `/api/products/:id` | No | Get single product |
| GET | `/api/products/categories/list` | No | List categories |
| POST | `/api/products` | Admin | Create product |
| PUT | `/api/products/:id` | Admin | Update product |
| DELETE | `/api/products/:id` | Admin | Delete product |

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/me` | Get current user (requires token) |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, categories, featured products |
| `/products` | Product listing with search & category filters |
| `/products/:id` | Product details with add-to-cart |
| `/cart` | Shopping cart with quantity controls |
| `/login` | User login |
| `/register` | User registration |
| `/admin` | Admin panel (protected, admin only) |

---

## Deployment

### Option A: Render (Recommended)

1. Push code to GitHub repository `ecommerce-fullstack-design`
2. Create a MongoDB Atlas cluster and get connection string
3. On Render, create a **Web Service**:
   - Build command: `npm run install:all && npm run build`
   - Start command: `npm start`
   - Environment variables: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, `CLIENT_URL=https://your-app.onrender.com`
4. Run seed script once via Render shell: `npm run seed`

### Option B: Vercel (Frontend) + Render (Backend)

Deploy `client/` to Vercel and `server/` to Render. Set `VITE_API_URL=https://your-api.onrender.com/api` in Vercel env vars.

### Option C: Netlify (Static + Functions)

Deploy the root repository to Netlify with `netlify.toml` in place. Use:
- Build command: `npm run install:all && npm run build`
- Publish directory: `client/dist`
- Functions directory: `netlify/functions`
- Environment variables: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`, `CLIENT_URL=https://your-app.netlify.app`

Local preflight:

```bash
npm run install:all
npm run check:netlify
```

Production CLI deploy:

```bash
npm run deploy:netlify
```

If deploying non-interactively, set `NETLIFY_AUTH_TOKEN` and link or pass the Netlify site ID before running the deploy command.

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@shop.com | admin123 |

---

## Submission Checklist

- [x] Responsive frontend (desktop + mobile)
- [x] Home, Products, Product Details, Cart pages
- [x] Express backend with MongoDB
- [x] Product CRUD API
- [x] Dynamic data integration
- [x] Search & category filter
- [x] JWT authentication
- [x] Cart with localStorage
- [x] Admin panel with protected routes
- [x] Push to GitHub repository `ecommerce-fullstack-design`
- [x] Deploy and share live URL

---

## License
Internship Project 2026

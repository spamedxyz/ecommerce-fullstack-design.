import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getProducts({ featured: 'true' })
      .then(setFeatured)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    { name: 'Clothing', icon: '👔', color: 'bg-blue-50 text-blue-600' },
    { name: 'Electronics', icon: '🎧', color: 'bg-purple-50 text-purple-600' },
    { name: 'Footwear', icon: '👟', color: 'bg-orange-50 text-orange-600' },
    { name: 'Accessories', icon: '👜', color: 'bg-pink-50 text-pink-600' },
    { name: 'Home', icon: '🏠', color: 'bg-green-50 text-green-600' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
                New Collection 2026
              </span>
              <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Discover Products You&apos;ll Love
              </h1>
              <p className="mt-6 max-w-lg text-lg text-brand-100">
                Curated selection of premium clothing, electronics, and lifestyle essentials.
                Free shipping on orders over $100.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary !bg-white !text-brand-700 hover:!bg-brand-50">
                  Shop Now
                </Link>
                <Link to="/products?featured=true" className="btn-secondary !border-white/30 !text-white hover:!bg-white/10">
                  Featured Items
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop"
                  alt="Shopping experience"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 rounded-xl bg-white p-4 shadow-xl">
                  <p className="text-sm text-gray-500">Happy Customers</p>
                  <p className="text-2xl font-bold text-surface-900">10,000+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="section-title text-center">Shop by Category</h2>
        <p className="mt-2 text-center text-gray-500">Browse our curated collections</p>
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.name}`}
              className={`card flex flex-col items-center p-6 transition hover:-translate-y-1 hover:shadow-md ${cat.color}`}
            >
              <span className="text-3xl">{cat.icon}</span>
              <span className="mt-3 font-semibold">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-surface-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="mt-2 text-gray-500">Hand-picked favorites just for you</p>
            </div>
            <Link to="/products" className="hidden text-sm font-semibold text-brand-600 hover:text-brand-700 sm:block">
              View All →
            </Link>
          </div>

          {loading ? (
            <div className="mt-10 flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="mt-8 text-center sm:hidden">
            <Link to="/products" className="btn-primary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="card overflow-hidden bg-gradient-to-r from-surface-900 to-surface-800 p-8 text-white sm:p-12">
          <div className="max-w-xl">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">Summer Sale — Up to 40% Off</h2>
            <p className="mt-3 text-gray-300">
              Limited time offer on selected items. Don&apos;t miss out on incredible deals.
            </p>
            <Link to="/products" className="btn-primary mt-6 !bg-brand-500 hover:!bg-brand-600">
              Shop the Sale
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

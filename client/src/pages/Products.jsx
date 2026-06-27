import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const search = searchParams.get('search') || '';
  const category = searchParams.get('category') || 'all';

  useEffect(() => {
    api.getCategories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    setError('');
    const params = {};
    if (search) params.search = search;
    if (category !== 'all') params.category = category;

    api
      .getProducts(params)
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [search, category]);

  const handleSearchChange = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set('search', value);
    else params.delete('search');
    setSearchParams(params);
  };

  const handleCategoryChange = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'all') params.delete('category');
    else params.set('category', cat);
    setSearchParams(params);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="section-title">All Products</h1>
        <p className="mt-2 text-gray-500">
          {products.length} product{products.length !== 1 ? 's' : ''} found
          {search && ` for "${search}"`}
          {category !== 'all' && ` in ${category}`}
        </p>
      </div>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-md flex-1">
          <input
            type="search"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="input-field pl-10"
          />
          <svg
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              category === 'all'
                ? 'bg-brand-600 text-white'
                : 'bg-surface-100 text-surface-800 hover:bg-surface-200'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                category.toLowerCase() === cat.toLowerCase()
                  ? 'bg-brand-600 text-white'
                  : 'bg-surface-100 text-surface-800 hover:bg-surface-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
      ) : error ? (
        <div className="card p-8 text-center text-red-600">
          <p>{error}</p>
          <p className="mt-2 text-sm text-gray-500">Make sure the backend server and MongoDB are running.</p>
        </div>
      ) : products.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg font-medium text-gray-600">No products found</p>
          <p className="mt-2 text-sm text-gray-400">Try adjusting your search or filter criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
